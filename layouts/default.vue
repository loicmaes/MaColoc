<script setup lang="ts">
import { User } from "@iconoir/vue";
import UserMenu from "~/components/layouts/user/UserMenu.vue";

const { t } = useI18n();

type NavigationCategory = {
  label?: string;
  children: NavigationTab[];
};
type NavigationTab = {
  path: string;
  key: string;
};
const tabs: NavigationCategory[] = [
  {
    children: [
      {
        key: "overview",
        path: "",
      },
    ],
  },
  {
    label: "social",
    children: [
      {
        key: "rentalProfile",
        path: "rentalProfile",
      },
    ],
  },
];
</script>

<template>
  <div
    data-layout="default"
    class="w-full min-h-dvh flex"
  >
    <aside class="sticky top-0 h-dvh overflow-y-auto basis-1/5 border-r border-border">
      <header class="h-16 px-6 flex items-center">
        <NuxtLinkLocale
          to="/app"
          class="text-sm font-bold"
        >
          Ma Coloc'
        </NuxtLinkLocale>
      </header>

      <nav class="px-1 py-4 flex flex-col">
        <div
          v-for="(tab, i) in tabs"
          :key="tab.label ?? `tab-${i}`"
          class="flex flex-col"
        >
          <span
            v-if="tab.label"
            class="ml-3 mb-1 mt-4 font-medium text-sm text-muted-foreground"
          >{{ t(`nav.sections.${tab.label}`) }}</span>
          <Button
            v-for="entry in tab.children"
            :key="entry.key"
            variant="ghost"
            class="justify-start"
            as-child
          >
            <NuxtLinkLocale
              :to="`/app/${entry.path}/`"
              active-class="bg-secondary"
              exact-active-class="bg-secondary"
            >
              <User />
              <span>{{ t(`${entry.key}.navigationLabel`) }}</span>
            </NuxtLinkLocale>
          </Button>
        </div>
      </nav>
    </aside>

    <main class="basis-4/5 flex flex-col">
      <header class="sticky z-10 top-0 bg-background h-16 flex items-center justify-end px-4 border-b border-border">
        <UserMenu />
      </header>

      <div class="p-4">
        <slot />
      </div>
    </main>
  </div>
</template>
