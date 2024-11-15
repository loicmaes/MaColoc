import type { FetchError } from "ofetch";
import type { ICreateRentalProfile } from "~/types/rentalProfile";
import type { InternalizationTool } from "~/types/generics/frontSpecific";
import { useToast } from "~/components/ui/toast";
import { HttpCode } from "~/types/generics/http";
import type { IUser } from "~/types/user";

export async function sendNewRentalProfileRequest(t: InternalizationTool, payload: ICreateRentalProfile) {
  const { toast } = useToast();
  try {
    useUser().value = await $fetch<IUser>("/api/rentalProfile/create", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: payload,
    });
    toast({
      title: t("rentalProfile.toast.created.title"),
      description: t("rentalProfile.toast.created.description"),
    });
    return true;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.NotFound:
        toast({
          title: t("toast.userNotFound.title"),
          description: t("toast.userNotFound.description"),
          variant: "destructive",
        });
        return false;
      default:
        toast({
          title: t("toast.internalError.title"),
          description: t("toast.internalError.description"),
          variant: "destructive",
        });
        return false;
    }
  }
}
