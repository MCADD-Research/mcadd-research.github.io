// https://nuxt.com/docs/api/configuration/nuxt-config
const baseURL = process.env.NUXT_APP_BASE_URL || '/'

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',

  app: {
    baseURL,
    head: {
      htmlAttrs: { lang: 'en' },
      title: 'MCADD — medium-chain acyl-CoA dehydrogenase deficiency, explained',
      meta: [
        { charset: 'utf-8' },
        { name: 'viewport', content: 'width=device-width, initial-scale=1' },
        {
          name: 'description',
          content:
            'An evidence-based guide to medium-chain acyl-CoA dehydrogenase deficiency (MCADD): understanding the disease, diagnosis, daily management, emergencies, and the latest research.',
        },
        { name: 'theme-color', content: '#0f766e' },
        { name: 'google-site-verification', content: 'eKKVOix-9e7mlubFa8RyXHe3v3MPgWvSjqEir9_8tYo' },
      ],
      link: [{ rel: 'icon', type: 'image/svg+xml', href: `${baseURL}favicon.svg` }],
    },
  },

  modules: ['@nuxtjs/sitemap'],

  css: [
    '@fontsource-variable/inter/index.css',
    '@fontsource-variable/fraunces/index.css',
    '~/assets/css/main.css',
  ],

  typescript: {
    strict: true,
    typeCheck: false,
  },

  site: {
    url: process.env.NUXT_SITE_URL || 'https://mcadd-research.github.io',
    trailingSlash: true,
  },

  sitemap: {
    enabled: true,
  },

  nitro: {
    prerender: {
      crawlLinks: true,
      routes: ['/'],
    },
  },

  devtools: { enabled: false },
})
