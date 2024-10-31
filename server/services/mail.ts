import { useMailer } from "#mailer";
import type { IMailBody } from "~/types/generics/mail";

const transporter = () => {
  const config = useRuntimeConfig();

  return useMailer().customTransporter({
    auth: {
      user: config.mailerUser,
      pass: config.mailerPass,
    },
    host: config.mailerHost,
    port: parseInt(config.mailerPort as string),
    secure: true,
  });
};

export async function send(body: IMailBody) {
  const config = useRuntimeConfig();

  return useMailer().sendMail({
    transporter: transporter(),
    requestId: "test-id",
    options: {
      fromEmail: config.mailerFromAddress,
      fromName: config.mailerFromName,
      to: body.to,
      subject: body.subject ?? body.template.subject ?? "Sujet",
      html: body.template.html,
      text: body.template.text,
      attachments: body.attachements ?? body.template.attachements ?? [],
    },
  });
}
