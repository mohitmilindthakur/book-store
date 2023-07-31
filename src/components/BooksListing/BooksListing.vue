<template>
  <section class="books-listing" :class="{ loading: isFetching }">

    <div class="listing-info" v-if="search">
      <div>
        <span>Showing results for: </span>
        <span class="label-bold">{{ search }}</span>
      </div>

      <div class="books-count">
        <span>Books Count: </span>
        <span class="label-bold">{{ booksCount }}</span>
      </div>
    </div>

    <div class="books-grid">
      <template v-for="book in books">
        <RouterLink class="book-listing-book-card-container" :to="{ name: 'book-detail-page', params: { id: book.key } }">
          <BookCard class="book-listing-book-card" :book="book" />
        </RouterLink>
      </template>
    </div>
  </section>
</template>
<script>
import BookCard from '../BookCard/BookCard.vue';
import { useCartStore } from '../../stores/cart';
import { useSearchStore } from '../../stores/search';
import { fetchBooks } from '@/apis/book.js';
import { storeToRefs } from 'pinia';
import initialData from './initial-data';

export default {
  setup() {
    const cartStore = useCartStore();
    const searchStore = useSearchStore();
    const { search } = storeToRefs(searchStore);
    searchStore.setSearch('');
    return { cartStore, searchStore, search };
  },
  components: {
    BookCard
  },

  data() {
    return {
      books: initialData,
      isFetching: false,
      debouncedSearch: null,
      booksCount: 12,
      pageNum: 1,
      observer: null,
      initialData
    }
  },

  watch: {
    search() {
      if (!this.search) {
        this.books = initialData;
        this.booksCount = 12;
      } else {
        this.renderBooks();
      }
    }
  },

  mounted() {
    // this.watchScroll();
  },

  methods: {
    renderBooks(isAppend = false, pageNum=1) {
      !isAppend && (this.isFetching = true);
      fetchBooks(this.search, pageNum)
        .then(({ data, response }) => {
          let url = new URLSearchParams(new URL(response.url).search);
          if (url.get('q') != this.search) {
            return;
          }
          if (isAppend) {
            this.books.push(...data.docs);
          } else {
            this.books = data.docs
          }
          this.books.forEach(item => {
            if (!item.ratings_average) {
              item.ratings_average = (Math.random() * 5).toFixed(2);
            }
            if (item.key.includes('/')) {
              item.key = item.key.split('/')[2];
            }

            if(!item.price) {
              item.price = (Math.random() * 200).toFixed(2);
            }
          })
          this.booksCount = data.numFound;
          this.isFetching = false;
          this.pageNum = pageNum;
          return this.$nextTick();
        })
        .then(() => {
          if (this.booksCount > this.books.length) {
            this.watchScroll();
          }
        })
        .catch(error => {
          console.log('error', error);
          this.isFetching = false;
        })
    },

    watchScroll() {
      this.observer && this.observer.disconnect();
      let allCards = document.querySelectorAll('.book-card');
      console.log(allCards);
      let lastCard = allCards[allCards.length - 1];
      
      this.observer= new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.intersectionRatio > .2) {
            this.renderBooks(true, this.pageNum + 1);
            this.observer.disconnect();
          }
        })
      }, { threshold: 0.2 });
      this.observer.observe(lastCard);
    }
  }
}

</script>
<style lang="scss" scoped>
.books-listing {
  max-width: 144rem;
  margin: 0 auto;
  padding: 0 24px;
  &.loading {
    opacity: .5;

    &:before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      // background-image: linear-gradient(to bottom, rgba(0,0,0.5), rgba(0,0,0,.5));
      opacity: .5;
      z-index: 1;
    }
  }
}

.listing-info {
  display: flex;
  justify-content: space-between;
}

.books-count {
  text-align: center;
}

.books-grid {
  display: flex;
  gap: 2.5rem;
  flex-wrap: wrap;
  justify-content: center;
  margin-top: 6.4rem;
  position: relative;
  // row-gap: 2.5rem;
}

.book-title {
  font-size: 2rem;
  color: #4D4D4D;
  margin-bottom: 1rem;
}

.book-author {
  font-size: 1.5rem;
  color: #4D4D4D;
  margin-bottom: 2rem;
}

.book-listing-book-card {
  height: 100%;
}


.book-listing-book-card-container {
  width: 32rem;
}
</style>