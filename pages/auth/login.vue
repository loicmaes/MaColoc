<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";
import { PasswordRegex } from "~/lib/constants";

definePageMeta({
  layout: "authentication",
});
const { t } = useI18n();
useHead({
  title: `Ma Coloc' · ${t("auth.login.title")}`,
});

const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1).regex(PasswordRegex),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const submit = handleSubmit(async (values) => {
  loading.value = true;
  console.table(values);
  await sendLogInRequest();
  loading.value = false;
});
</script>

<template>
  <div class="flex flex-col gap-8 w-[min(100%,22rem)]">
    <h1 class="text-4xl font-black">
      {{ $t("auth.login.title") }}
    </h1>

    <form
      class="flex flex-col gap-2"
      @submit.prevent="submit"
    >
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.login.fields.email") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              type="email"
              placeholder="john.doe@example.xyz"
            />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="password"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.login.fields.password") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              type="password"
              placeholder="············"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <Button
        type="submit"
        class="mt-3"
        :disabled="loading"
      >
        <template v-if="loading">
          {{ $t("auth.login.actionLoading") }}...
        </template>
        <template v-else>
          {{ $t("auth.login.action") }}
        </template>
      </Button>
      <Button
        size="sm"
        variant="link"
        type="button"
        as-child
      >
        <NuxtLinkLocale to="/auth/register">
          {{ $t("auth.login.link") }}
        </NuxtLinkLocale>
      </Button>
    </form>
  </div>
</template>

<style scoped>

</style>
