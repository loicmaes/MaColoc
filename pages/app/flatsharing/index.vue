<script setup lang="ts">
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
    <!-- TODO -->
    todo: display flat sharing space
  </div>
</template>
