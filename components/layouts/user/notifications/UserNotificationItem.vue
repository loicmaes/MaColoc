<script setup lang="ts">
import { Bell } from "@iconoir/vue";
import type { IFrontNotification } from "~/types/notification";

defineProps<{
  notification: IFrontNotification;
}>();
</script>

<template>
  <DropdownMenuItem class="flex items-start gap-3">
    <div class="shrink-0 grid place-items-center aspect-square w-10 bg-secondary rounded-sm">
      <NuxtImg
        v-if="notification.thumbnail"
        :src="notification.thumbnail"
        class="w-full h-full object-cover rounded-sm"
      />
      <Bell
        v-else
        height="1.25rem"
        width="1.25rem"
        class="text-muted-foreground"
      />
    </div>
    <div class="flex flex-col">
      <p
        class="flex items-center gap-3 line-clamp-1"
        :class="{ 'font-bold': !notification.readAt }"
      >
        <span>{{ notification.title }}</span>
        <span
          v-if="!notification.readAt"
          class="aspect-square w-1.5 rounded-full bg-primary"
        />
      </p>
      <span class="text-sm text-muted-foreground">{{ notification.caption }}</span>
    </div>
  </DropdownMenuItem>
</template>
