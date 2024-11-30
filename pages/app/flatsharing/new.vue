<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";

const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("flatSharing.new.tabLabel")}`,
});

const canLeave = ref<boolean>(false);

const schema = toTypedSchema(z.object({
  name: z.string().min(1).optional(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async (values) => {
  console.table(values);
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

    <form @submit="onSubmit" />
  </div>
</template>
