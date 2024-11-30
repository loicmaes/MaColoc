<script setup lang="ts">
import { Tailwind, Html, Head, Text, Container } from "@vue-email/components";
import tailwindConfig from "../tailwind.config";

defineProps<{
  subject: string;
  firstName: string;
  link: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Head>
      <title>{{ subject }}</title>
    </Head>

    <Tailwind :config="tailwindConfig">
      <Container>
        <Text>
          {{ firstName }} t'as invité à rejoindre son espace colocatif ! Accepte l'invitation pour accéder à <Link :href="link">
            ton espace.
          </Link>
        </Text>
      </Container>
    </Tailwind>
  </Html>
</template>

<style scoped>

</style>
