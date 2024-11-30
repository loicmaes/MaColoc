import type { FetchError } from "ofetch";
import type { InternalizationTool } from "~/types/generics/frontSpecific";
import type { ICreateRichFlatSharing, IFlatSharing, IFlatSharingInvitation } from "~/types/flatSharing";
import { useToast } from "~/components/ui/toast";

export const useFlatSharing = () => useState<IFlatSharing | null>("flatSharing", () => null);

export async function requestFlatSharing() {
  try {
    const { data } = await useFetch("/api/flatSharing/recover", {
      headers: useRequestHeaders(["cookie"]),
    });
    if (!data.value)
      return;
    useFlatSharing().value = data.value;
  }
  catch (e) {
    console.error(e);
  }
}

export async function requestCreateFlatSharing(t: InternalizationTool, payload: ICreateRichFlatSharing): Promise<boolean> {
  const { toast } = useToast();

  try {
    const flatSharing = await $fetch<IFlatSharing>("/api/flatSharing/create", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: payload,
    });
    if (!flatSharing) return false;
    useFlatSharing().value = flatSharing;
    return true;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      default:
        toast({
          title: t("toast.internalError.title"),
          description: t("toast.internalError.description"),
          variant: "destructive",
        });
        break;
    }

    return false;
  }
}

export async function sendJoinRequest(t: InternalizationTool, email: string) {
  const { toast } = useToast();

  try {
    const invitation = await $fetch<IFlatSharingInvitation>("/api/flatSharing/invite/create", {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
      body: {
        email,
      },
    });

    const flatSharing = useFlatSharing();
    if (flatSharing.value)
      flatSharing.value = {
        ...flatSharing.value,
        invitations: [
          ...(flatSharing.value.invitations ?? []),
          invitation,
        ],
      };

    toast({
      title: t("flatSharing.members.addMember.toast.title"),
      description: t("flatSharing.members.addMember.toast.description", {
        email,
      }),
    });
  }
  catch (e) {
    console.error(e);
  }
}
