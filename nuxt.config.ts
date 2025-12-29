// https://nuxt.com/docs/api/configuration/nuxt-config

import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
  compatibilityDate: "2024-11-01",
  devtools: { enabled: false },

  vite: {
    plugins: [tailwindcss()],
  },

  css: ["~/assets/app.css", "~/assets/fonts.css"],
  ssr: true,

  nitro: {
    experimental: {
      wasm: true,
    },
  },

  build: {
    transpile: ["gsap"],
  },

  modules: ["@nuxt/content", "@nuxtjs/i18n"],
  content: {
    build: {
      markdown: {
        toc: {
          depth: 3, // include h3 headings
          searchDepth: 3,
        },
      },
    },
  },
  i18n: {
    locales: [
      { code: "en", language: "en-US" },
      { code: "zh", language: "zh-TW" },
    ],
    defaultLocale: "en",
    strategy: "prefix_except_default",
  },
});
