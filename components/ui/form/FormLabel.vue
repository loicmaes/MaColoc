<script lang="ts" setup>
import type { LabelProps } from "radix-vue";
import type { HTMLAttributes } from "vue";
import { useFormField } from "./useFormField";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

const props = defineProps<LabelProps & { class?: HTMLAttributes["class"] }>();

const { error, formItemId } = useFormField();
</script>

<template>
  <Label
    :class="cn(
      error && 'text-destructive-light',
      props.class,
    )"
    :for="formItemId"
  >
    <slot />
  </Label>
</template>
