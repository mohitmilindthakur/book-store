<template>
  <section class="cart-section">
    <table class="cart-table" v-if="cartStore.cart.length">

      <thead>
        <tr>
          <th>Image</th>
          <th>Title</th>
          <th>Quantity</th>
          <th>Price</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="cartItem in cartStore.cart" :key="cartItem.key">

          <!-- IMAGE -->
          <td>
            <div class="cart-item-img-container">
              <picture>
                <source v-if="cartItem.cover_i"
                  :srcset="`https://covers.openlibrary.org/b/id/${cartItem.cover_i}-L.jpg?default=false`"
                  type="image/jpg">
                <img src="https://openlibrary.org/images/icons/avatar_book-sm.png" class="cart-item-image">
              </picture>
            </div>
          </td>

          <!-- TITLE -->
          <td>
            {{ cartItem.title }}
          </td>

          <!-- QUANTITY -->
          <td>
            <div class="cart-quantity">
              <button class="decrease-quantity" @click="cartStore.decreaseQuantity(cartItem.key)">-</button>
              <span class="cart-quantity-text label-bold">{{ cartItem.cartQuantity }}</span>
              <button class="increase-quantity" @click="cartStore.increaseQuantity(cartItem.key)">+</button>
            </div>

            <div class="cart-quantity-modifier">
            </div>
          </td>

          <!-- PRICE -->
          <td class="book-price">
            $ {{ parseFloat(cartItem.price) * cartItem.cartQuantity }}
          </td>
        </tr>

        <tr class="total-row">
          <td colspan="3" class="label-bold">Total</td>
          <td class="total-price label-bold">$ {{ parseFloat(cartStore.cartTotal).toFixed(2) }}</td>
        </tr>
      </tbody>
    </table>

    <div v-else class="cart-empty">
      <h1>No Books in your cart</h1>
      <img src="@/assets/images/cart-empty.png" alt="">
    </div>
  </section>
</template>
<script>
import { useCartStore } from '@/stores/cart';
export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  }
}
</script>
<style lang="scss" scoped>

.cart-section {
  padding: 0 1.2rem;
  overflow: auto;
}
.cart-table {
  border-collapse: collapse;
  margin: 5rem auto 5rem auto;
  max-width: 70rem;

  th {
    text-align: left;
  }
  
  tr td:not(:last-child){
    padding-right: 5rem;
    padding-top: 2rem;
    padding-bottom: 2rem;

  }

  .total-row td {
    border-top: 1px solid #515151;
    border-bottom: 1px solid #515151;
  }

  .cart-quantity {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    button {
      // padding: .5rem;
      // font-size: 2rem;
      height: 2.5rem;
      width: 2.5rem;
      border-radius: .4rem;
      border: none;
      color: white;
      font-size: 2rem;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }

    .decrease-quantity {
      background-color: red;
    }

    .increase-quantity {
      background-color: green;
    }

  }

  .total-price,
  .book-price {
    white-space: nowrap;
  }
}
.cart-item-image {
  width: 10rem;
}

.cart-empty {
  text-align: center;
  max-width: 144rem;
  margin: 0 auto;
  margin-top: 5rem;
  img {
    margin-top: 2rem;
    width: 50%;
    min-width: 25rem;
  }
}

</style>