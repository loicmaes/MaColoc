<script setup lang="ts">
import { Plus, Send, SystemRestart } from "@iconoir/vue";
import { toTypedSchema } from "@vee-validate/zod";
import * as z from "zod";
import { useForm } from "vee-validate";

const { t } = useI18n();
const loading = ref<boolean>(false);
const open = ref<boolean>(false);
const addMore = ref<boolean>(false);
const emailRef = ref("");

const schema = toTypedSchema(z.object({
  email: z.string().email(),
}));
const { handleSubmit } = useForm({
  validationSchema: schema,
});
const onSubmit = handleSubmit(async ({ email }) => {
  loading.value = true;

  await sendJoinRequest(t, email);
  emailRef.value = "";

  loading.value = false;
  if (!addMore.value)
    open.value = false;
});
</script>

<template>
  <Dialog
    :open="open"
    @update:open="open = $event"
  >
    <DialogTrigger>
      <Button>
        <Plus />
        <span>{{ t("flatSharing.members.addMember.trigger") }}</span>
      </Button>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>{{ t("flatSharing.members.addMember.dialog.title") }}</DialogTitle>
        <DialogDescription>{{ t("flatSharing.members.addMember.dialog.description") }}</DialogDescription>
      </DialogHeader>

      <form
        class="flex flex-col gap-4"
        @submit="onSubmit"
      >
        <FormField
          v-slot="{ componentField }"
          name="email"
        >
          <FormItem>
            <FormLabel>{{ t("flatSharing.members.addMember.dialog.input") }}</FormLabel>
            <FormControl v-bind="componentField">
              <Input
                v-model="emailRef"
                placeholder="john.doe@example.xyz"
              />
            </FormControl>
          </FormItem>
        </FormField>

        <div class="flex items-start gap-2">
          <Checkbox
            id="add-more"
            :checked="addMore"
            @update:checked="addMore = $event"
          />
          <Label for="add-more">{{ t("flatSharing.members.addMember.dialog.addMore") }}</Label>
        </div>

        <DialogFooter>
          <Button
            :disabled="!emailRef.length || loading"
            type="submit"
          >
            <template v-if="loading">
              <SystemRestart class="animate-spin" />
              <span>{{ t("flatSharing.members.addMember.dialog.action.loading") }}</span>
            </template>
            <template v-else>
              <Send />
              <span>{{ t("flatSharing.members.addMember.dialog.action.embed") }}</span>
            </template>
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  </Dialog>
</template>
