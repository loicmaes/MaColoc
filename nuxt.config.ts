// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    "@nuxtjs/tailwindcss",
    "@nuxtjs/color-mode",
    "@nuxtjs/i18n",
    "@nuxt/eslint",
    "shadcn-nuxt",
    "@nuxtjs/google-fonts",
    "nuxt-mailer",
    "nuxt-scheduler",
  ],
  devtools: { enabled: true },
  colorMode: {
    classSuffix: "",
  },
  runtimeConfig: {
    mailerHost: "",
    mailerPort: "",
    mailerUser: "",
    mailerPass: "",
    mailerFromAddress: "",
    mailerFromName: "",
    public: {
      appUrl: "",
    },
  },
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
    cssPath: ["~/assets/css/tailwind.css", { injectPosition: "first" }],
    configPath: "tailwind.config",
    exposeConfig: false,
    viewer: true,
  },
});
