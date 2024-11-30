<script setup lang="ts">
import { Tailwind, Html, Head, Text, Link, Container } from "@vue-email/components";
import tailwindConfig from "../tailwind.config";

defineProps<{
  subject: string;
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
          Merci de nous faire confiance ! Ton compte a été vérifié avec succès. Tu peux maintenant te faire plaisir sur <Link :href="link">
            notre interface
          </Link>
        </Text>
      </Container>
    </Tailwind>
  </Html>
</template>
