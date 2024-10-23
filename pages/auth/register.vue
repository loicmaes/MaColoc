<script setup lang="ts">
import * as z from "zod";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import { PasswordRegex } from "~/lib/constants";

definePageMeta({
  layout: "authentication",
});
const { t } = useI18n();
useHead({
  title: `Ma Coloc' · ${t("auth.register.title")}`,
});

const conditions = ref<boolean>(false);
const loading = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().min(1).email(),
  password: z.string().min(1).regex(PasswordRegex),
  promotions: z.boolean().optional().default(true),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const submit = handleSubmit(async (values) => {
  loading.value = true;
  console.table(values);
  await sendRegisterRequest();
  loading.value = false;
});
</script>

<template>
  <div class="flex flex-col gap-8 w-[min(100%,22rem)]">
    <h1 class="text-4xl font-black">
      {{ $t("auth.register.title") }}
    </h1>

    <form
      class="flex flex-col gap-2"
      @submit="submit"
    >
      <FormField
        v-slot="{ componentField }"
        name="lastName"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.register.fields.lastName") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input placeholder="DOE" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="firstName"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.register.fields.firstName") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input placeholder="John" />
          </FormControl>
        </FormItem>
      </FormField>
      <FormField
        v-slot="{ componentField }"
        name="email"
      >
        <FormItem>
          <FormLabel>{{ $t("auth.register.fields.email") }}</FormLabel>
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
          <FormLabel>{{ $t("auth.register.fields.password") }}</FormLabel>
          <FormControl v-bind="componentField">
            <Input
              type="password"
              placeholder="············"
            />
          </FormControl>
        </FormItem>
      </FormField>

      <div class="flex flex-col gap-2 mt-6 mb-3">
        <FormField
          v-slot="{ componentField }"
          name="promotions"
        >
          <FormItem class="flex items-start gap-2">
            <FormControl v-bind="componentField">
              <Checkbox />
            </FormControl>
            <FormLabel class="!mt-0 cursor-pointer">
              {{ $t("auth.register.fields.promotions") }}
            </FormLabel>
          </FormItem>
        </FormField>
        <div class="flex items-center gap-2">
          <Checkbox
            id="conditions"
            :checked="conditions"
            @update:checked="conditions = $event"
          />
          <Label
            for="conditions"
            class="cursor-pointer"
          >{{ $t("auth.register.fields.conditions") }}</Label>
        </div>
      </div>

      <Button
        type="submit"
        :disabled="!conditions || loading"
      >
        <template v-if="loading">
          {{ $t("auth.register.actionLoading") }}...
        </template>
        <template v-else>
          {{ $t("auth.register.action") }}
        </template>
      </Button>
      <Button
        size="sm"
        variant="link"
        type="button"
        as-child
      >
        <NuxtLinkLocale to="/auth/login">
          {{ $t("auth.register.link") }}
        </NuxtLinkLocale>
      </Button>
    </form>
  </div>
</template>

<style scoped>

</style>
