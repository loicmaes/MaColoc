<script setup lang="ts">
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
