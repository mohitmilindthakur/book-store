import { defineStore } from 'pinia'


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
    },
    cartTotal() {
      console.log(this.cartTotal);
      return this.cart.reduce((total, item) => {
        return total + item.price * item.cartQuantity;
      }, 0);
    }
  },
  actions: {
    addItem(item) {
      console.log(this.cartTotal);
      item.cartQuantity = 1;
      this.cart.push(item);
    },
    removeItem(key) {
      let index = this.cart.findIndex(item => item.key === key);
      index > -1 && (this.cart.splice(index, 1));
    },
    increaseQuantity(key) {
      let index = this.cart.findIndex(item => item.key === key);
      if (index < 0) return;
      this.cart[index].cartQuantity++;
    },
    decreaseQuantity(key) {
      let index = this.cart.findIndex(item => item.key === key);
      if (index < 0) return;
      if (this.cart[index].cartQuantity === 1) {
        this.removeItem(key);
        return;
      }
      this.cart[index].cartQuantity--;
    }
  }
})
