import type { IMailTemplate } from "~/types/generics/mail";
import { bindRoute } from "~/lib/constants";

const useUserAccountVerifiedTemplate = (): IMailTemplate => ({
  subject: "Youpi 🎉 Ton compte a été vérifié",
  text: `Merci de nous faire confiance ! Ton compte a été vérifié avec succès. Tu peux maintenant te faire plaisir sur notre interface ${bindRoute("/app")}`,
  html: "",
});
export default useUserAccountVerifiedTemplate;
