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
        info to display later
      </p>
    </template>
    <template v-else>
      <div class="py-12 flex flex-col items-center gap-2 max-w-[35ch] mx-auto">
        <h1 class="text-2xl text-center font-bold">
          Vous n'avez pas de profil locataire!
        </h1>
        <p class="text-center text-muted-foreground">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis dolores eos eum itaque praesentium quis quos, saepe similique. Blanditiis consequatur culpa esse fugit impedit, incidunt maiores molestiae saepe sit? Dignissimos eveniet id nulla quibusdam unde.
        </p>
        <Button
          class="mt-6"
          as-child
        >
          <NuxtLinkLocale to="/app/rentalProfile/create">
            Créer mon profil
          </NuxtLinkLocale>
        </Button>
      </div>
    </template>
  </div>
</template>
