import { auth } from "@/lib/firebase";
import { FirebaseError } from "firebase/app";
import { signInWithEmailAndPassword } from "firebase/auth";
import { UseFormSetError } from "react-hook-form";

export const submit = async (
  formData: IForm,
  setError: UseFormSetError<IForm>
) => {
  try {
    await signInWithEmailAndPassword(auth, formData.email, formData.password);
    return true;
  } catch (error) {
    if (error instanceof FirebaseError) {
      switch (error.code) {
        case "auth/invalid-login-credentials":
          setError("root", {
            message: "User with this email doesn't exist",
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
