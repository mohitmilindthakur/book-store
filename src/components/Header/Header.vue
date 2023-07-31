<template>
  <header class="header">
    <div class="header-wrapper">
      <nav class="nav">
        <ul class="nav-list">
            <li class="nav-item nav-item--logo">
              <RouterLink :to="{ name: 'home' }">
                Home
              </RouterLink>
            </li>
          <li class="nav-item nav-item--cart">
            <RouterLink :to="{ name: 'cart-page' }">
              <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M6.29977 5H21L19 12H7.37671M20 16H8L6 3H3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
              </svg>
              Cart ({{ cartStore.cart.length }})
            </RouterLink>
          </li>
          <!-- <li class="nav-item nav-item--user">User</li> -->
        </ul>
      </nav>
    </div>
  </header>
</template>
<script>
import { useCartStore } from '../../stores/cart'

export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  }
}
</script>
<style lang="scss" scoped>
header {
  position: sticky;
  top: 0;
  z-index: 5;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}
.header-wrapper {
  padding: 24px 16px;
  background-color: #19376D;
  color: white;
  box-shadow: rgba(0, 0, 0, 0.25) 0px 25px 50px -12px;
}

.nav-list {
  list-style: none;
  display: flex;
}

.nav-item--cart {
  margin-left: auto;

  a {
    display: flex;
    align-items: center;
    gap: 1.2rem;
  }
  svg {
    width: 2.4rem;
    height: 2.4rem;
  }
}
</style>