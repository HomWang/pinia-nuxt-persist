import { defineNuxtConfig } from 'nuxt'
import piniaNuxtPersist from '..'

export default defineNuxtConfig({
  modules: [
    piniaNuxtPersist,
    '@pinia/nuxt'
  ],
  piniaNuxtPersist: {
    addPlugin: true
  }
})
