import { defineStore } from 'pinia'


export const useSearchStore = defineStore('search', {
  state: () => { 
    return {
      search: ''
    }
  },
  actions: {
    setSearch(search) {
      this.search = search;
    }
  }
})
