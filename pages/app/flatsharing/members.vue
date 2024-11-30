<script setup lang="ts">
const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("flatSharing.members.tabLabel")}`,
});
</script>

<template>
  <div data-page="flatsharing-members">
    <h1>members</h1>
  </div>
</template>
