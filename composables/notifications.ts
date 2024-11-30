import { FetchError } from "ofetch";
import { useToast } from "~/components/ui/toast";
import type { InternalizationTool } from "~/types/generics/frontSpecific";
import type { IFrontNotification } from "~/types/notification";

export async function readNotification(t: InternalizationTool, id: number) {
  const { toast } = useToast();

  const user = useUser();
  if (!user.value) return;

  try {
    const notification = await $fetch<IFrontNotification>(`/api/notifications/read/${id}`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    });
    user.value = {
      ...user.value,
      notifications: user.value.notifications?.map(n => n.id === id ? notification : n) ?? [],
    };
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return;
    toast({
      title: t("toast.internalError.title"),
      description: t("toast.internalError.description"),
      variant: "destructive",
    });
  }
}
export async function readAllNotifications(t: InternalizationTool) {
  const { toast } = useToast();

  const user = useUser();
  if (!user.value) return;

  try {
    const notifications = await $fetch<IFrontNotification[]>(`/api/notifications/read/all`, {
      method: "POST",
      headers: useRequestHeaders(["cookie"]),
    });
    user.value = {
      ...user.value,
      notifications,
    };
  }
  catch (e) {
    if (!(e instanceof FetchError))
      return;
    toast({
      title: t("toast.internalError.title"),
      description: t("toast.internalError.description"),
      variant: "destructive",
    });
  }
}
