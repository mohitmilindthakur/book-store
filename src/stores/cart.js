import { ref, computed } from 'vue'
import { defineStore } from 'pinia'


console.log('defineStore');
export const useCartStore = defineStore('cart', {
  state: () => { 
    return {
      cart: [],
      name: 'testing'
    }
  },
  getters: {
    idsObject() {
      let obj = {};
      this.cart.forEach(item => {
        console.log(item, this.cart);
        obj[item.key] = item;
      })
      return obj;
    }
  },
  actions: {
    addItem(item) {
      console.log(item);
      this.cart.push(item);
    },
    removeItem(key) {
      let index = this.cart.findIndex(item => item.key === key);
      index > -1 && (this.cart.splice(index, 1));
    }
  }
})
