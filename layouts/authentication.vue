<script setup lang="ts">
import { Xmark } from "@iconoir/vue";
import { useSwitchLocalePath } from "#i18n";

const switchLocale = useSwitchLocalePath();
</script>

<template>
  <div
    data-layout="authentication"
    class="min-h-dvh flex flex-col lg:flex-row"
  >
    <section class="hidden lg:block flex-1 bg-primary">
      <header class="px-8 py-4">
        <NuxtLinkLocale
          to="/"
          class="font-bold text-primary-foreground"
        >
          Ma Coloc'
        </NuxtLinkLocale>
      </header>
    </section>

    <main class="flex-1 grid place-items-center p-6">
      <Button
        variant="ghost"
        size="icon"
        class="absolute top-4 right-4"
        as-child
      >
        <NuxtLinkLocale to="/">
          <Xmark />
        </NuxtLinkLocale>
      </Button>
      <slot />
    </main>

    <div class="flex items-center gap-1 absolute bottom-4 right-4">
      <Button
        size="icon"
        variant="ghost"
        as-child
      >
        <NuxtLink :to="switchLocale('fr')">
          FR
        </NuxtLink>
      </Button>
      <span class="block aspect-square w-1 rounded-full bg-foreground" />
      <Button
        size="icon"
        variant="ghost"
        as-child
      >
        <NuxtLink :to="switchLocale('en')">
          EN
        </NuxtLink>
      </Button>
    </div>
  </div>
</template>
