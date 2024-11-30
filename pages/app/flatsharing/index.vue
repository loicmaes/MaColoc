<script setup lang="ts">
import { Plus } from "@iconoir/vue";

const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("flatSharing.home.tabLabel")}`,
});

const user = useUser();
</script>

<template>
  <div
    v-if="user"
    data-page="flatsharing-home"
    class="flex flex-col"
  >
    <template v-if="false">
      <!-- TODO -->
      todo: display flat sharing space
    </template>
    <template v-else>
      <div class="py-12 flex flex-col items-center gap-2 max-w-[35ch] mx-auto">
        <h1 class="text-2xl text-center font-bold text-pretty">
          {{ t("flatSharing.home.emptyStatus.title") }}
        </h1>
        <p class="text-center text-muted-foreground">
          {{ t("flatSharing.home.emptyStatus.caption") }}
        </p>
        <Button class="mt-6">
          <Plus />
          <span>{{ t("flatSharing.home.emptyStatus.action") }}</span>
        </Button>
      </div>
    </template>
  </div>
</template>
