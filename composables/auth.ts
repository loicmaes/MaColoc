import type { FetchError } from "ofetch";
import type { ICreateUserBody, IUser } from "~/types/user";
import { useToast } from "~/components/ui/toast";
import type { InternalizationTool } from "~/types/generics/frontSpecific";
import type { IAuthLoginBody } from "~/types/auth";
import { k_token } from "~/server/services/cookies";
import { HttpCode } from "~/types/generics/http";

export const useUser = () => useState<IUser | null>("user", () => null);
const useAuthCookie = () => useCookie(k_token);

export async function useAuth(t: InternalizationTool, access: boolean) {
  const user = useUser();
  const { toast } = useToast();
  const localePath = useLocalePath();

  if (access && !user.value) {
    await navigateTo(localePath("/auth/login"));
    return toast({
      title: t("toast.loggedOut.title"),
      description: t("toast.loggedOut.description"),
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
    const user = await $fetch<IUser>("/api/user/register", {
      method: "POST",
      body: payload,
    });
    useUser().value = user;
    await navigateTo(useLocalePath()("/app"));
    toast({
      title: t("auth.register.toast.title", { firstName: user.data?.firstName }),
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
    await navigateTo(useLocalePath()("/app"));
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
export async function sendVerificationRequest(t: InternalizationTool, code: string) {
  const { toast } = useToast();

  try {
    const user = await $fetch<IUser>(`/api/user/validate/${code}`, {
      method: "PUT",
      headers: useRequestHeaders(["cookie"]),
    });
    console.table(user);
    if (!user) return;
    useUser().value = user;
    toast({
      title: t("settings.verification.form.toast.verified.title"),
      description: t("settings.verification.form.toast.verified.description"),
    });
    return user;
  }
  catch (e) {
    switch ((e as FetchError).statusCode) {
      case HttpCode.Unauthorized:
        return toast({
          title: t("settings.verification.form.toast.unauthorized.title"),
          description: t("settings.verification.form.toast.unauthorized.description"),
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
