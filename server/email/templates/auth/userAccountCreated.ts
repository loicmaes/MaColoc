import { render } from "@vue-email/render";
import type { IMailTemplate } from "~/types/generics/mail";
import UserAccountCreated from "~/server/email/components/UserAccountCreated.vue";

const subject = "Féliciation 🎉 Bienvenue parmi nous !";
const useUserAccountCreatedTemplate = async (code: string): Promise<IMailTemplate> => ({
  subject,
  text: await render(UserAccountCreated, { subject, code }, { plainText: true }),
  html: await render(UserAccountCreated, { subject, code }),
});
export default useUserAccountCreatedTemplate;
