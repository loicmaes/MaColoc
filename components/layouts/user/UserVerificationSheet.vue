<script setup lang="ts">
import { SystemRestart } from "@iconoir/vue";
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";

const { t } = useI18n();

defineProps<{
  open: boolean;
}>();
const emit = defineEmits<{
  "update:open": [boolean];
}>();

const schema = toTypedSchema(z.object({
  code: z.string().length(6),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const loading = ref<boolean>(false);
const onSubmit = handleSubmit(async ({ code }) => {
  loading.value = true;
  const value = await sendVerificationRequest(t, code);
  loading.value = false;

  if (!value) return;
  emit("update:open", false);
});
</script>

<template>
  <Sheet
    :open="open"
    @update:open="$emit('update:open', $event)"
  >
    <SheetContent>
      <SheetHeader class="mb-6">
        <SheetTitle>{{ $t("settings.verification.form.title") }}</SheetTitle>
        <SheetDescription>{{ $t("settings.verification.form.description") }}</SheetDescription>
      </SheetHeader>

      <form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="code"
        >
          <FormItem>
            <FormLabel>{{ $t("settings.verification.form.label") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                placeholder="○○○○○○"
                maxlength="6"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <Button
          type="submit"
          class="self-end"
          :disabled="loading"
        >
          <template v-if="loading">
            <SystemRestart class="animate-spin" />
            <span>{{ $t("settings.verification.form.actionLoading") }}</span>
          </template>
          <template v-else>
            <span>{{ $t("settings.verification.action") }}</span>
          </template>
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>
