<template>
  <Header />
  <CartList />
</template>
<script>
import Header from '@/components/Header/Header.vue';
import CartList from '@/components/CartList/CartList.vue';
export default {
  components: {
    Header,
    CartList
  }
}
</script>
<style lang="scss">
.cart-item {
  display: flex;

  .cart-item-image {
    height: 25rem;
  }
}
</style>