<script setup lang="ts">
const { t } = useI18n();
await useAuth(t, true);

const user = useUser();
</script>

<template>
  <div
    data-page="app_home"
    class="h-[200dvh]"
  >
    hello world! {{ user?.data?.firstName }}
  </div>
</template>
