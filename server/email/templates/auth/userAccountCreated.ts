import type { IMailTemplate } from "~/types/generics/mail";

const useUserAccountCreatedTemplate = (code: string): IMailTemplate => ({
  subject: "Féliciation 🎉 Bienvenue parmi nous !",
  text: `Ton compte a été créé ! Pense à le vérifier en cliquant sur le lien : http://localhost:3000/auth/verify/${code}`,
  html: "",
});
export default useUserAccountCreatedTemplate;
