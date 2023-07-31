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
              Cart {{ cartStore.cart.length }}
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
}
</style>