<script setup lang="ts">
const user = useUser();
</script>

<template>
  <div
    data-layout="default"
    class="w-full min-h-dvh"
  >
    <header class="sticky top-0 flex items-center justify-between px-6 lg:px-20 py-4">
      <NuxtLinkLocale
        class="font-bold"
        to="/"
      >
        Ma Coloc'
      </NuxtLinkLocale>

      <Button
        as-child
      >
        <NuxtLinkLocale
          v-if="user"
          to="/"
        >
          {{ $t("auth.btn.goToDashboard") }}
        </NuxtLinkLocale>
        <NuxtLinkLocale
          v-else
          to="/auth/login"
        >
          {{ $t("auth.btn.login") }}
        </NuxtLinkLocale>
      </Button>
    </header>
    <slot />
  </div>
</template>
