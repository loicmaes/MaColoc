<script setup lang="ts">
import { Bell, BellNotification } from "@iconoir/vue";
import UserNotificationItem from "~/components/layouts/user/notifications/UserNotificationItem.vue";
import type { IFrontNotification } from "~/types/notification";

const user = useUser();
const unreadNotifications = computed((): IFrontNotification[] => {
  if (!user.value || !user.value.notifications || !user.value.notifications.length)
    return [];
  return user.value.notifications.filter(e => e.type !== "email" && !(e as IFrontNotification).readAt) as IFrontNotification[];
});

const { t } = useI18n();

const open = ref<boolean>(false);
async function readOne(id: number) {
  await readNotification(t, id);
}
async function readAll() {
  await readAllNotifications(t);
  open.value = false;
}
</script>

<template>
  <DropdownMenu
    :open="open"
    @update:open="open = $event"
  >
    <DropdownMenuTrigger>
      <Button
        variant="ghost"
        size="icon"
        class="relative"
      >
        <template v-if="unreadNotifications.length">
          <BellNotification />
          <Badge
            v-if="unreadNotifications.length"
            size="sm"
            class="absolute top-0 right-0 translate-x-1/4 -translate-y-1/4"
          >
            {{ unreadNotifications.length }}
          </Badge>
        </template>
        <Bell v-else />
      </Button>
    </DropdownMenuTrigger>

    <DropdownMenuContent
      align="end"
      class="relative isolate w-[350px] max-h-96 overflow-y-auto"
    >
      <template v-if="unreadNotifications.length">
        <UserNotificationItem
          v-for="item in unreadNotifications"
          :key="item.id"
          :notification="item"
          @click.prevent="readOne(item.id)"
        />
        <Button
          v-if="unreadNotifications.length"
          variant="link"
          size="sm"
          class="sticky bottom-0 z-10 w-full hover:bg-secondary"
          @click="readAll"
        >
          {{ t("notifications.readAll") }}
        </Button>
      </template>
      <template v-else>
        <div class="px-3 py-2">
          <p class="text-muted-foreground">
            {{ t("notifications.noStatement") }}
          </p>
        </div>
      </template>
    </DropdownMenuContent>
  </DropdownMenu>
</template>
