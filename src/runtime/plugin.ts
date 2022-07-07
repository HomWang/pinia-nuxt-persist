import { defineNuxtPlugin, useCookie } from '#app'
import Cookies from 'js-cookie';
import { PiniaPluginContext } from 'pinia'

export interface PersistStrategy {
    key?: string;
    storage?: string;
    paths?: string[];
}
  
export interface PersistOptions {
    enabled: true;
    strategies?: PersistStrategy[];
}

type Store = PiniaPluginContext['store'];
type PartialState = Partial<Store['$state']>;

declare module 'pinia' {
    export interface DefineStoreOptionsBase<S, Store> {
      persist?: PersistOptions;
    }
}

// Default storage method
const defaultStorage = 'cookie'

export const updateStorage = (strategy: PersistStrategy, store: Store) => {
    const storage = strategy.storage || defaultStorage
    const storeKey = strategy.key || store.$id

    if (strategy.paths) {
      const partialState = strategy.paths.reduce((finalObj, key) => {
        finalObj[key] = store.$state[key]
        return finalObj
      }, {} as PartialState)
      setItem(storage, storeKey, JSON.stringify(partialState))
    } else {
      setItem(storage, storeKey, JSON.stringify(store.$state))
    }
}

export const setItem = (strategy: string, key: string, value: any) => {
    if(strategy == 'cookie'){
        return Cookies.set(key, value)
    }else if(strategy == 'localStorage'){
        return localStorage.setItem(key, value)
    }else if(strategy == 'sessionStorage'){
        return sessionStorage.setItem(key, value)
    }
}

export const getItem = (strategy: string, key: string) => {
    if(process.server){
        if(strategy == 'cookie'){
            const cookie = useCookie(key)
            return JSON.stringify(cookie.value)
        }
    }else{
        if(strategy == 'localStorage'){
            return localStorage.getItem(key)
        }else if(strategy == 'sessionStorage'){
            return sessionStorage.getItem(key)
        }
    }
    return undefined
}

export default defineNuxtPlugin(nuxtApp => {
    // @ts-ignore
    nuxtApp.pinia?.use(({ options, store }) => {
        // Turn on storage
        if (options.persist?.enabled) {
            const defaultStrat: PersistStrategy[] = [{
                key: store.$id,
                storage: defaultStorage,
            }]
        
            const strategies = options.persist?.strategies?.length ? options.persist?.strategies : defaultStrat

            strategies.forEach((strategy: PersistStrategy) => {
                const storage = strategy.storage || defaultStorage
                const storeKey = strategy.key || store.$id
                const storageResult = getItem(storage, storeKey)

                if (storageResult) {
                    store.$patch(JSON.parse(storageResult))
                    updateStorage(strategy, store)
                    store.$state = JSON.parse(storageResult)
                }
            })

            // Triggered before clicking
            // store.$onAction(() => {
            //     // react to store changes
            // })
            // Triggered after clicking
            store.$subscribe(() => {
                // react to store changes
                strategies.forEach((strategy: PersistStrategy) => {
                    updateStorage(strategy, store)
                })
            })
        }
    })
})