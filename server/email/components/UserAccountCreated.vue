<script setup lang="ts">
import { Html, Preview, Tailwind } from "@vue-email/components";
import tailwindConfig from "../tailwind.config";

defineProps<{
  subject: string;
  code: string;
}>();
</script>

<template>
  <Html lang="fr">
    <Head>
      <title>{{ subject }}</title>
    </Head>

    <Tailwind :config="tailwindConfig">
      <Preview>{{ code }}</Preview>
    </Tailwind>
  </Html>
</template>
