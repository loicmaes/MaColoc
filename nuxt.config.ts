// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
  ],
  devtools: { enabled: true },
  compatibilityDate: "2024-04-03",
  eslint: {
    checker: true,
    config: {
      stylistic: {
        indent: 2,
        semi: true,
        quotes: "double",
      },
    },
  },
  googleFonts: {
    download: false,
    useStyleSheet: true,
    families: {
      Montserrat: {
        wght: "100..900",
        ital: "100..900",
      },
    },
  },
  i18n: {
    vueI18n: "i18n.config.ts",
    locales: ["fr", "en"],
    defaultLocale: "fr",
  },
  tailwindcss: {
    cssPath: ["~/assets/css/tailwind.sass", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: true,
  },
});
