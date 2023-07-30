<template>
  <header class="header">
    <div class="header-wrapper">
      <nav class="nav">
        <ul class="nav-list">
            <li class="nav-item nav-item--logo">
              <RouterLink :to="{ name: 'home' }">
                Logo
              </RouterLink>
            </li>
          <li class="nav-item nav-item--cart">Cart {{ cartStore.cart.length }}</li>
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
}
.header-wrapper {
  padding: 24px 16px;
  background-color: #19376D;
  color: white;
}

.nav-list {
  list-style: none;
  display: flex;
}

.nav-item--cart {
  margin-left: auto;
}
</style>