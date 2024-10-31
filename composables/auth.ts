import type { FetchError } from "ofetch";
import type { ICreateUserBody, IUser } from "~/types/user";
import { useToast } from "~/components/ui/toast";
import type { InternalizationTool } from "~/types/frontSpecific";
import type { IAuthLoginBody } from "~/types/auth";
import { k_token } from "~/server/services/cookies";
import { HttpCode } from "~/types/http";

export const useUser = () => useState<IUser | null>("user", () => null);
const useAuthCookie = () => useCookie(k_token);

export async function useAuth(t: InternalizationTool, access: boolean) {
  const user = useUser();
  const { toast } = useToast();
  const localePath = useLocalePath();

  if (access && !user.value) {
    await navigateTo(localePath("/auth/login"));
    return toast({
      title: t(""),
      description: t(""),
      variant: "destructive",
    });
  }
  if (!access && user.value) return await navigateTo(localePath("/")); // todo: migrate to portal url
}
export async function useAuthSession() {
  const token = useAuthCookie();
  const user = useUser();

  if (!token || user.value) return;

  const { data } = await useFetch<IUser>("/api/user/whoami", {
    headers: useRequestHeaders(["cookie"]),
  });
  if (!data.value) return;
  user.value = data.value;
}

export async function sendRegisterRequest(t: InternalizationTool, payload: ICreateUserBody) {
  const { toast } = useToast();

  try {
    await $fetch("/api/user/register", {
      method: "POST",
      body: payload,
    });
    await navigateTo(useLocalePath()("/"));
    toast({
      title: t("auth.register.toast.title", { firstName: payload.data.firstName }),
      description: t("auth.register.toast.description"),
    });
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Conflict:
        return toast({
          title: t("auth.toast.conflict.title"),
          description: t("auth.toast.conflict.description", { email: payload.email }),
          variant: "destructive",
        });
      default:
        return toast({
          title: t("toast.internalError.title"),
          description: t("toast.internalError.description"),
          variant: "destructive",
        });
    }
  }
}
export async function sendLogInRequest(t: InternalizationTool, payload: IAuthLoginBody) {
  const { toast } = useToast();

  try {
    const user = await $fetch<IUser>("/api/user/login", {
      method: "POST",
      body: payload,
    });
    useUser().value = user;
    await navigateTo(useLocalePath()("/")); // todo: update to redirect to panel
    toast({
      title: t("auth.login.toast.title"),
      description: t("auth.login.toast.description", { firstName: user.data?.firstName }),
    });
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case 401: case 404:
        return toast({
          title: t("auth.toast.notFound.title"),
          description: t("auth.toast.notFound.description"),
          variant: "destructive",
        });
      default:
        return toast({
          title: t("toast.internalError.title"),
          description: t("toast.internalError.description"),
          variant: "destructive",
        });
    }
  }
}
