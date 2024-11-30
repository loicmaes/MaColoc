<script setup lang="ts">
import { Plus, SystemRestart } from "@iconoir/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("flatSharing.new.tabLabel")}`,
});

const loading = ref<boolean>(false);
const canLeave = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  name: z.string().min(1),
  // address
  addressStreet: z.string().min(1),
  addressComplement: z.string().min(1).optional(),
  addressZipCode: z.string().regex(/^\d{5}$/),
  addressCity: z.string().min(1),
  addressCountry: z.string().min(1).default("France"),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
  initialValues: {
    addressCountry: "France",
  },
});
const onSubmit = handleSubmit(async (values) => {
  loading.value = true;

  const payload = {
    name: values.name,
    address: {
      street: values.addressStreet,
      additional: values.addressComplement,
      zipCode: values.addressZipCode,
      city: values.addressCity,
      country: values.addressCountry,
    },
  };
  canLeave.value = await requestCreateFlatSharing(t, payload);

  if (canLeave.value)
    await navigateTo(useLocalePath()("/app/flatSharing/"));

  loading.value = false;
});

onBeforeRouteLeave(() => {
  if (canLeave.value) return;
  if (confirm("Êtes-vous sûr de vouloir quitter ?")) return;
  abortNavigation();
});
</script>

<template>
  <div
    data-page="flatsharing-new"
    class="w-[min(100%,60rem)] mx-auto"
  >
    <header class="flex flex-col gap-2 px-6 pt-4 mb-6">
      <h1 class="text-2xl font-bold">
        {{ t("flatSharing.new.title") }}
      </h1>

      <p class="text-muted-foreground leading-relaxed max-w-[60ch]">
        {{ t("flatSharing.new.description") }}
      </p>
    </header>

    <form
      class="p-6 flex flex-col gap-6"
      @submit="onSubmit"
    >
      <FormField
        v-slot="{ componentField }"
        name="name"
      >
        <FormItem class="col-span-5">
          <FormLabel>
            {{ t("flatSharing.new.form.name.label") }}
          </FormLabel>
          <FormControl v-bind="componentField">
            <Input :placeholder="t('flatSharing.new.form.name.placeholder')" />
          </FormControl>
        </FormItem>
      </FormField>

      <Separator
        class="mt-6"
        :label="t('flatSharing.new.form.address.label')"
      />
      <div class="grid grid-cols-5 gap-4">
        <FormField
          v-slot="{ componentField }"
          name="addressStreet"
        >
          <FormItem class="col-span-3">
            <FormLabel>
              {{ t("flatSharing.new.form.address.street.label") }}
            </FormLabel>
            <FormControl v-bind="componentField">
              <Input :placeholder="t('flatSharing.new.form.address.street.placeholder')" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="addressComplement"
        >
          <FormItem class="col-span-2">
            <FormLabel>
              {{ t("flatSharing.new.form.address.additional.label") }}
            </FormLabel>
            <FormControl v-bind="componentField">
              <Input :placeholder="t('flatSharing.new.form.address.additional.placeholder')" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="addressZipCode"
        >
          <FormItem>
            <FormLabel>
              {{ t("flatSharing.new.form.address.zipCode.label") }}
            </FormLabel>
            <FormControl v-bind="componentField">
              <Input :placeholder="t('flatSharing.new.form.address.zipCode.placeholder')" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="addressCity"
        >
          <FormItem class="col-span-2">
            <FormLabel>
              {{ t("flatSharing.new.form.address.city.label") }}
            </FormLabel>
            <FormControl v-bind="componentField">
              <Input :placeholder="t('flatSharing.new.form.address.city.placeholder')" />
            </FormControl>
          </FormItem>
        </FormField>
        <FormField
          v-slot="{ componentField }"
          name="addressCountry"
        >
          <FormItem class="col-span-2">
            <FormLabel>
              {{ t("flatSharing.new.form.address.country.label") }}
            </FormLabel>
            <FormControl v-bind="componentField">
              <Input :placeholder="t('flatSharing.new.form.address.country.placeholder')" />
            </FormControl>
          </FormItem>
        </FormField>
      </div>
      <Separator
        class="mb-6"
        :label="t('flatSharing.new.form.address.label')"
      />

      <Button
        class="self-end"
        :disabled="loading"
      >
        <template v-if="loading">
          <SystemRestart class="animate-spin" />
          <span>{{ t("flatSharing.new.form.actionLoading") }}</span>
        </template>
        <template v-else>
          <Plus />
          <span>{{ t("flatSharing.new.form.action") }}</span>
        </template>
      </Button>
    </form>
  </div>
</template>
