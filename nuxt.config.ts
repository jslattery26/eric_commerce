import vuetify from "vite-plugin-vuetify";

export default defineNuxtConfig({
  modules: [
    "@pinia/nuxt",
    "@nuxtjs/color-mode",
    "@nuxtjs/robots",
    "nuxt-icon",
    async (options, nuxt) => {
      // @ts-ignore
      nuxt.hooks.hook("vite:extendConfig", (config) => config.plugins.push(vuetify()));
    },
  ],
  runtimeConfig: {
    NUXT_ENV_CHEC_PUBLIC_API_KEY: process.env.NUXT_ENV_CHEC_PUBLIC_API_KEY,
    public: {
      apiBase: '/api'
    }
  },
  pinia: {
    storesDirs: ['./stores/**'],
  },

  colorMode: {
    preference: "dark",
    fallback: "light",
    hid: "nuxt-color-mode-script",
    globalName: "__NUXT_COLOR_MODE__",
    componentName: "ColorScheme",
    classPrefix: "",
    classSuffix: "-mode",
    storageKey: "nuxt-color-mode",
  },

  build: {
    transpile: ["vuetify"],
  },

  vite: {
    ssr: {
      noExternal: ["vuetify"],
    },
    define: {
      "process.env.DEBUG": false,
    },
  },

  robots: {
    /* module options */
  },

  css: [
    "~/assets/style/variables.scss",
    "vuetify/lib/styles/main.sass",
    "~/assets/fonts/jae_fonts.css",
  ],

  components: true,

  plugins: [
    "~/plugins/particles.js",
    "~/plugins/cart.js",
    "~/plugins/commerce.js",

    { src: "~/plugins/vueMq.js", ssr: false },
  ],

  app: {
    head: {
      title: "YOOANDEYE",
      link: [
        {
          rel: "stylesheet",
          href: "/jae_fonts.css",
        },
        { rel: "icon", type: "image/x-icon", href: "/favicon.svg" },
        {
          rel: "canonical",
        },
      ],
      meta: [
        { charset: "utf-8" },
        { name: "viewport", content: "width=device-width, initial-scale=1" },
        {
          hid: "description",
          name: "description",
          content: "I'm eric. Chiggen.",
        },
      ],
    },
  },

  devtools: {
    timeline: {
      enabled: true,
    },
  },
});