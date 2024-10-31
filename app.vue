<script setup lang="ts">
import { IconoirProvider } from "@iconoir/vue";
import { Toaster } from "~/components/ui/toast";

const iconProps = {
  "width": "1rem",
  "height": "1rem",
  "stroke-width": "2",
};

await useAuthSession();
</script>

<template>
  <div>
    <NuxtRouteAnnouncer />
    <Toaster />
    <IconoirProvider :icon-props="iconProps">
      <NuxtLayout>
        <NuxtPage />
      </NuxtLayout>
    </IconoirProvider>
  </div>
</template>
