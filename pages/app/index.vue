<script setup lang="ts">
const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc' · ${t("overview.tabLabel")}`,
});

const user = useUser();
</script>

<template>
  <div
    data-page="app_home"
    class="h-[200dvh]"
  >
    <p>hello world! {{ user?.data?.firstName }}</p>
  </div>
</template>
