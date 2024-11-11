<script setup lang="ts">
import { toTypedSchema } from "@vee-validate/zod";
import { useForm } from "vee-validate";
import * as z from "zod";
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from "~/components/ui/sheet";

defineProps<{
  open: boolean;
}>();
defineEmits<{
  "update:open": [boolean];
}>();

const schema = toTypedSchema(z.object({
  code: z.string().length(6),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async values => console.table(values));
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
        >
          {{ $t("settings.verification.action") }}
        </Button>
      </form>
    </SheetContent>
  </Sheet>
</template>

<style scoped>

</style>
