import type { InternalizationTool } from "~/types/generics/frontSpecific";
import type { ICreateRichFlatSharing, IFlatSharing } from "~/types/flatSharing";
import { useToast } from "~/components/ui/toast";

export const useFlatSharing = () => useState<IFlatSharing>("flatSharing", () => null);

export async function requestFlatSharing(): Promise<boolean> {
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
