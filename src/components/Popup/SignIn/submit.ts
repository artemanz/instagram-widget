import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";
import { TForm } from "./@types";

export const submit = async (
  formData: TForm,
  setError: UseFormSetError<TForm>,
  callback: () => void
) => {
  try {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    callback();
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setError("root", {
            message: "Invalid credentials",
          });
          break;
        default:
          setError("root", { message: error.code });
          break;
      }
    } else setError("root", { message: "Server error" });
    return false;
  }
};
