import { FirebaseError } from "firebase/app";
import { UseFormSetError } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { TForm } from "./@types";
import { add } from "date-fns";

export const submit = async (
  formData: TForm,
  setError: UseFormSetError<TForm>,
  callback: () => void
) => {
  if (formData.confirmPassword !== formData.password) {
    setError("confirmPassword", { message: "Missmatch passwords" });
    setError("root", { message: "Missmatch passwords" });
    return false;
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      formData.password
    );
    const userData = {
      email: formData.email,
    };

    await setDoc(doc(db, "users", userCredential.user.uid), {
      ...userData,
      feed: [],
      views_remain: 5000,
      update_views_limit: Timestamp.fromDate(add(new Date(), { months: 1 })),
    });

    await signInWithEmailAndPassword(auth, formData.email, formData.password);

    callback();

    await sendEmailVerification(userCredential.user, {
      url: process.env.NEXT_PUBLIC_EMAIL_REDIRECT!,
    });

    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      const errorCode = error.code;
      switch (errorCode) {
        case "auth/invalid-email":
          setError("root", { message: "Invalid email" });
          return false;
        case "auth/weak-password":
          setError("root", { message: "Weak password" });
          return false;
        case "auth/email-already-in-use":
          setError("root", { message: "This email already exist" });
          return false;
        default:
          setError("root", { message: errorCode });
          return false;
      }
    } else {
      setError("root", { message: "Server error." });
      return false;
    }
  }
};
