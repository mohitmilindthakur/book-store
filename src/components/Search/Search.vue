<template>
  <section class="listing-search">

    <!-- Debounced Search -->
    <div class="search-card">
      <input v-model="search" @input="onSearchInput" id="search-input" type="search" class="search-input"
        placeholder="Search for Book......" />
      <div class="search-icon">
        <div class="search-icon-btn" type="submit">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M14.9536 14.9458L21 21M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
              stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
import { debounce } from '../../utils/utils';
import { useSearchStore } from '../../stores/search';
export default {
  setup() {
    const searchStore = useSearchStore();
    return { searchStore };
  },
  data() {
    return {
      search: '',
      debouncedSearch: null,
    }
  },

  created() {
    this.debouncedSearch = debounce(this.searchStore.setSearch, 500);
  },

  methods: {
    onSearchInput() {
      this.debouncedSearch(this.search);
    }
  }

}
</script>
<style lang="scss" scoped>
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
  overflow: visible;
  padding: 0 2.4rem 2.5rem 2.4rem;
  display: flex;
  align-items: stretch;
  justify-content: center;
  gap: 12px;
}

.search-input {
  background-color: white;
  border-radius: 5px;
  padding: 12px;
  position: relative;
  max-width: 500px;
  // margin: 0 auto;
  width: 100%;
  box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
  border: none;
  overflow: visible;

  .search-input {
    // background-color: white;
  }
}

.search-icon {
  display: block;
}

.search-icon-btn {
  border: 0;
  background-color: #19376D;
  padding: 0 1.6rem;
  border-radius: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
}
</style>