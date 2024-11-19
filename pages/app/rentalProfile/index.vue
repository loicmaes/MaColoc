<script setup lang="ts">
const { t } = useI18n();
await useAuth(t, true);

const user = useUser();
</script>

<template>
  <div
    v-if="user"
    data-page="app_rentalProfile_home"
    class="flex flex-col"
  >
    <template v-if="user.rentalProfile">
      <p class="italic">
        <!-- TODO -->
        info to display later
      </p>
    </template>
    <template v-else>
      <div class="py-12 flex flex-col items-center gap-2 max-w-[35ch] mx-auto">
        <h1 class="text-2xl text-center font-bold text-pretty">
          {{ t("rentalProfile.default.noProfile.title") }}
        </h1>
        <p class="text-center text-muted-foreground">
          {{ t("rentalProfile.default.noProfile.caption") }}
        </p>
        <Button
          class="mt-6"
          as-child
        >
          <NuxtLinkLocale to="/app/rentalProfile/create">
            {{ t("rentalProfile.default.noProfile.action") }}
          </NuxtLinkLocale>
        </Button>
      </div>
    </template>
  </div>
</template>
