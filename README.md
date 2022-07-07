# Nuxt Pinia Persist

[pinia-nuxt-persist](https://github.com/516310460/pinia-nuxt-persist)

It supports customer service sessionstorage, localstorage and service cookies, and can permanently store nuxtjs Pinia status data in customized storage

## Features

1. Support `client` and `server` storage
2. The default key is the ID of the above store. You can customize the `key`
3. `storage` Default cookie
4. `paths` You can select one or more specified

## Installation

1. `npm i pinia-nuxt-persist @pinia/nuxt` or `yarn add pinia-nuxt-persist @pinia/nuxt`

2. add `pinia-nuxt-persist` to modules, **nuxt.config.ts**:
```javascript
import { defineNuxtConfig } from 'nuxt3'
export default defineNuxtConfig({
  modules: [
    'pinia-nuxt-persist',
    '@pinia/nuxt',
  ]
})
```

## Usage

`app.vue`
```html
<div>
  {{ store.cookieCounter }}
  {{ store.doubleCookieCounter }}
</div>
<button @click="store.addCookieCounter()">Cookie Add++</button>
<ClientOnly>
  <div>
    {{ store.localStorageCounter }}
    {{ store.doubleLocalStorageCounter }}
  </div>
  <button @click="store.addLocalStorageCounter()">LocalStorage Add++</button>
  <div>
    {{ store.sessionStorageCounter }}
    {{ store.doubleSessionStorageCounter }}
  </div>
  <button @click="store.addSessionStorageCounter()">SessionStorage Add++</button>
</ClientOnly>
```

`stores/counter.ts`
```ts
import { defineStore } from 'pinia'

export const useCounterStore = defineStore({
  id: 'counter',
  // Extended configuration
  persist: {
    // Enable cache
    enabled: true,
    strategies: [
      {
        key: 'cookieCounter', // The default key is the ID of the above store. You can customize the key
        storage: 'cookie', // Default cookie
        paths: ['cookieCounter'], // You can select multiple
      },
      {
        key: 'localStorageCounter', // The default key is the ID of the above store. You can customize the key
        storage: 'localStorage', // Default cookie
        paths: ['localStorageCounter'], // You can select multiple
      },
      {
        key: 'sessionStorageCounter', // The default key is the ID of the above store. You can customize the key
        storage: 'sessionStorage', // Default cookie
        paths: ['sessionStorageCounter'], // You can select multiple
      }
    ]
  },
  state: () => ({
    cookieCounter: 0,
    localStorageCounter: 0,
    sessionStorageCounter: 0,
  }),
  getters: {
    doubleCookieCounter: (state) => state.cookieCounter * 2,
    doubleLocalStorageCounter: (state) => state.localStorageCounter * 2,
    doubleSessionStorageCounter: (state) => state.sessionStorageCounter * 2,
  },
  actions: {
    addCookieCounter() {
      this.cookieCounter++
    },
    addLocalStorageCounter() {
      this.localStorageCounter++
    },
    addSessionStorageCounter() {
      this.sessionStorageCounter++
    }
  }
})

```

## Development

- Run `npm run dev:prepare` to generate type stubs.
- Use `npm run dev` to start [playground](./playground) in development mode.
