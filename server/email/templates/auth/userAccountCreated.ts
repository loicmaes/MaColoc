import type { IMailTemplate } from "~/types/generics/mail";

const useUserAccountCreatedTemplate = (code: string): IMailTemplate => ({
  subject: "Féliciation 🎉 Bienvenue parmi nous !",
  text: `Ton compte a été créé ! Pense à le vérifier en allant dans tes paramètres et en entrant le code : ${code}`,
  html: "",
});
export default useUserAccountCreatedTemplate;
