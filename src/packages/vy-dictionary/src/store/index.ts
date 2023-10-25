import { ref } from 'vue'
import { defineStore } from 'pinia'

import dictionaryApi from "../api"

export const useDictionaryStore = defineStore(
  'dictionaryStore',
  () => {
    const dictionaryList = ref<any[]>([])

    function loadByNames(names: string[]): Promise<any[]> {
      console.log('字典名', names)
      return dictionaryApi.getByNames(names)
    }

    return {
      dictionaryList,
      loadByNames
    }
  }
)
