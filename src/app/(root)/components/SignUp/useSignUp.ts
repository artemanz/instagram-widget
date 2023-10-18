import { FirebaseError } from "firebase/app";
import { UseFormSetError } from "react-hook-form";
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
} from "firebase/auth";
import { auth } from "@/lib/firebase";

export const submit = async (
  formData: IForm,
  setError: UseFormSetError<IForm>,
  setGreetings: () => void
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
    setGreetings();
    await sendEmailVerification(userCredential.user, {
      url: process.env.NEXT_PUBLIC_HOST || "",
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
      console.error(error);
      return false;
    }
  }
};
