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
