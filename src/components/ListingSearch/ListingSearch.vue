<template>
  <section class="listing-search">

    <!-- SEARCH CARD -->
    <div class="search-card">
      <input v-model="search" type="text" class="search-input" placeholder="Search for Book......">
    </div>
  </section>
</template>
<script>
export default {
  data() {
    return {
      search: ''
    }
  }
}
</script>
<style lang="scss">
.listing-search {
  position: relative;
  // min-height: 75vh;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

.search-card {
  width: 100%;
  text-align: center;
  margin-top: 48px;
}

.search-input {
  background-color: white;
  border-radius: 5px;
  padding: 12px;
  position: relative;
  max-width: 500px;
  margin: 0 auto;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: none;

  .search-input {
    // background-color: white;
  }
}
</style>