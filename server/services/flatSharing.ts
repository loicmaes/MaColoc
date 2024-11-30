import type { H3Event } from "h3";
import { PrismaClientKnownRequestError } from "@prisma/client/runtime/binary";
import type { ICreateRichFlatSharing } from "~/types/flatSharing";
import { error, HttpCode } from "~/types/generics/http";
import { connectPostalAddress } from "~/server/services/postalAddress";
import * as flatSharingRepository from "~/server/database/repositories/flatSharing";
import * as userRepository from "~/server/database/repositories/user";
import * as notificationService from "~/server/services/notification";
import * as mailService from "~/server/services/mail";
import { NotFoundError } from "~/types/generics/errors";
import type { IUser } from "~/types/user";
import useUserInvitationSent from "~/server/email/templates/flatSharing/userInvitationSent";

export async function createFlatSharing(event: H3Event<Request>, userUid: string, payload: ICreateRichFlatSharing) {
  try {
    const address = await connectPostalAddress(payload.address);
    return await flatSharingRepository.create(userUid, {
      name: payload.name,
      addressId: address.id,
    });
  }
  catch (e) {
    return error(event, {
      code: HttpCode.ServerError,
      message: JSON.stringify(e),
    });
  }
}

export async function recoverFlatSharing(event: H3Event<Request>, uid: string) {
  try {
    return await flatSharingRepository.get(uid);
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: "The target flat sharing couldn't be found!",
      });
    return error(event, {
      message: JSON.stringify(e),
    });
  }
}

export async function sendInvite(event: H3Event<Request>, sourceUid: string, targetEmail: string) {
  try {
    const targetUser = await userRepository.getUserByEmail<IUser>(targetEmail);
    const sourceUser = await userRepository.getUser(sourceUid);
    const flatSharing = await flatSharingRepository.get(sourceUid);

    if (await flatSharingRepository.isIn(targetUser.uid, flatSharing.uid))
      return error(event, {
        code: HttpCode.Conflict,
        message: `"${targetEmail}" is already in this flat sharing.`,
      });

    const invite = await flatSharingRepository.createInvite({
      userUid: targetUser.uid,
      flatSharingUid: flatSharing.uid,
      sourceUid,
    });

    const mailTemplate = useUserInvitationSent(sourceUser.data?.firstName ?? "unknown");
    mailService.send({
      to: targetUser.email,
      template: mailTemplate,
    }).then(async () => {
      await notificationService.registerNotification({
        type: "both",
        template: mailTemplate.text,
        subject: mailTemplate.subject ?? "Nouvelle invitation !",
        title: "Nouvelle invitation 🎉",
        caption: `${sourceUser.data?.firstName} t'invite à rejoindre son espace colocatif.`,
      }, targetUser.uid);
    });

    return invite;
  }
  catch (e) {
    if (e instanceof NotFoundError)
      return error(event, {
        code: HttpCode.NotFound,
        message: `"${targetEmail}" does not belong to any user!`,
      });
    if (e instanceof PrismaClientKnownRequestError) {
      switch ((e as PrismaClientKnownRequestError).code) {
        case "P2002":
          return error(event, {
            code: HttpCode.Conflict,
            message: `"${targetEmail}" has already an valid invitation.`,
          });
      }
    }
    return error(event, {
      message: JSON.stringify(e),
    });
  }
}
