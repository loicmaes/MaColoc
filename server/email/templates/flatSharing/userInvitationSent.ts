import type { IMailTemplate } from "~/types/generics/mail";

const useUserInvitationSent = (firstName: string): IMailTemplate => ({
  subject: `📩 ${firstName} t'invite !`,
  text: `${firstName} t'as invité à rejoindre son espace colocatif ! Accepte l'invitation pour accéder à ton espace.`,
  html: "",
});
export default useUserInvitationSent;
