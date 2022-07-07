<template>
  <div>
    <p>pinia-nuxt-persist</p>
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
  </div>
</template>

<script setup>
import { useCounterStore } from "~~/stores/counter";
const store = useCounterStore();
</script>
