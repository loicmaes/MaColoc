import { render } from "@vue-email/render";
import type { IMailTemplate } from "~/types/generics/mail";
import { bindRoute } from "~/lib/constants";
import UserAccountVerified from "~/server/email/components/UserAccountVerified.vue";

const useUserAccountVerifiedTemplate = async (): Promise<IMailTemplate> => {
  const subject = "Youpi 🎉 Ton compte a été vérifié";
  const link = bindRoute("/app");
  return {
    subject,
    text: "",
    html: await render(UserAccountVerified, { subject, link }),
  };
};
export default useUserAccountVerifiedTemplate;
