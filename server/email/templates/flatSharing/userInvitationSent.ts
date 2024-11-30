import { render } from "@vue-email/render";
import type { IMailTemplate } from "~/types/generics/mail";
import UserInvitationSent from "~/server/email/components/UserInvitationSent.vue";
import { bindRoute } from "~/lib/constants";

const useUserInvitationSent = async (firstName: string): Promise<IMailTemplate> => {
  const subject = `${firstName} t'invite 📩`;
  const link = bindRoute("/app");
  return {
    subject,
    text: `${link}`,
    html: await render(UserInvitationSent, { subject, firstName, link }),
  };
};
export default useUserInvitationSent;
