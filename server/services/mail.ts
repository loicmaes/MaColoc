import { useMailer } from "#mailer";
import type { IMailBody, IMailConfig } from "~/types/generics/mail";
import { registerNotification } from "~/server/services/notification";

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

export async function send(body: IMailBody, options?: IMailConfig) {
  const config = useRuntimeConfig();

  if (options?.notify) await registerNotification({
    type: "email",
    subject: body.subject ?? body.template.subject ?? "Sujet",
    template: body.template.text,
  });

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
