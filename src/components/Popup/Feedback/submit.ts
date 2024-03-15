import { TForm } from ".";
import emailjs from "@emailjs/browser";

export const submit = async (formData: TForm) => {
  emailjs.send("service_ijpvhta", "template_5qdycm7", {
    email: formData.email,
    message: formData.message,
  });
};
