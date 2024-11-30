<script setup lang="ts">
definePageMeta({
  layout: "showcase",
});

const { t } = useI18n();
await useAuth(t, true);

useHead({
  title: `Ma Coloc', ${t("showcase.home.tabLabel")}`,
});

const switchLocale = useSwitchLocalePath();
</script>

<template>
  <div data-page="home">
    <p>{{ $t("helloWorld") }}</p>
    <NuxtLink :to="switchLocale('fr')">
      Français
    </NuxtLink>
    <NuxtLink :to="switchLocale('en')">
      English
    </NuxtLink>
  </div>
</template>
