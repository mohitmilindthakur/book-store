<template>
  <section class="listing-search">

    <!-- SEARCH CARD -->
    <!-- <div class="search-card"> -->
    <!-- <select name="saerch-type" id="" class="search-type">
        <option value="book" class="search-type-option">Book</option>
        <option value="author" class="search-type-option">Author</option>
      </select> -->

    <!-- TWO OPTIONS: Either use debounced search or search using enter key-->

    <!-- OPTION 1: Debounced Search -->
    <div class="search-card">
      <input v-model="search" @input="debouncedSearch" id="search-input" type="text" class="search-input"
        placeholder="Search for Book......" />
      <div class="search-submit">
        <button class="search-submit-btn" type="submit">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Arrow 1"
              d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97918 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM11 13.5L12 13.5L12 10.5L11 10.5L11 13.5Z"
              fill="white" />
          </svg>
        </button>
      </div>
    </div>

    <!-- OPTION 2: Search using the enter key  -->

    <!-- <form @submit.prevent="onSearchSubmit" class="search-card">
      <input v-model="search" id="search-input" type="text" class="search-input" placeholder="Search for Book......" />
      <div class="search-submit">
        <button class="search-submit-btn" type="submit">
          <svg width="14" height="24" viewBox="0 0 14 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path id="Arrow 1"
              d="M13.0607 13.0607C13.6464 12.4749 13.6464 11.5251 13.0607 10.9393L3.51472 1.3934C2.92893 0.807611 1.97919 0.807611 1.3934 1.3934C0.807612 1.97918 0.807612 2.92893 1.3934 3.51472L9.87868 12L1.3934 20.4853C0.807611 21.0711 0.807611 22.0208 1.3934 22.6066C1.97918 23.1924 2.92893 23.1924 3.51472 22.6066L13.0607 13.0607ZM11 13.5L12 13.5L12 10.5L11 10.5L11 13.5Z"
              fill="white" />
          </svg>
        </button>
      </div>
    </form> -->
    <!-- </div> -->
  </section>
  <section class="books-listing" :class="{ loading: isFetching }">
    <!-- <div class="grid-container"> -->
    <!-- <div class="grid-x"> -->

    <div class="books-count">Total: {{ booksCount }}</div>
    <div class="books-grid">
      <template v-for="book in books">
        <!-- <div class="cell col-3"> -->
        <RouterLink :to="{ name: 'book-detail-page', params: { id: book.key } }">
          <BookCard class="book-listing-book-card" :book="book" />
        </RouterLink>
        <!-- </div> -->
      </template>
    </div>
    <!-- </div> -->
    <!-- </div> -->

    <!-- <table>
      <thead>
        <tr>
          <th>Book</th>
          <th>Ratings</th>
          <th>Genre</th>
          <th>Actions</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="book in books" role="link" data-id="{{ book }}" :key="book.key">
          <td>
            <div class="book-basic-info">
              <picture>
                <source v-if="book.cover_i"
                  :srcset="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`" type="image/jpg">
                <img src="https://openlibrary.org/images/icons/avatar_book-sm.png">
              </picture>
              <div>
                <div class="book-title">
                  {{ book.title }}
                </div>
                <div class="book-author">
                  {{ book.author_name && book.author_name.join(', ') }}, {{ book.first_publish_year }}
                </div>
                <div class="book-description">
                  Lorem, ipsum dolor sit amet consectetur adipisicing elit. Quibusdam sunt iusto quod consectetur sapiente
                  eaque culpa, totam recusandae doloremque rem accusantium nemo dolore nesciunt sit ea eligendi magni
                  natus incidunt.
                </div>
              </div>
            </div>
          </td>
          <td>
            <span class="book-rating">
              {{ book.ratings_average  }} / 5
            </span>
          </td>
          <td>
            <span class="book-genre">
              {{ book.subject && book.subject[0] || 'Fiction' }}
            </span>
          </td>
          <td>
            <button v-if="cartStore.idsObject[book.key]" @click="cartStore.removeItem(book.key)">Remove from the cart</button>
            <button v-else @click="cartStore.addItem(book)">Add item to cart</button>
          </td>
        </tr>
      </tbody>
    </table> -->
  </section>
</template>
<script>
import BookCard from '../BookCard/BookCard.vue';
import { useCartStore } from '../../stores/cart';
import { fetchBooks } from '@/apis/book.js';

export default {
  setup() {
    const cartStore = useCartStore();
    console.log(cartStore.idsObject);
    return { cartStore };
  },
  components: {
    BookCard
  },

  data() {
    return {
      books: [],
      search: '',
      isFetching: false,
      debouncedSearch: null,
      booksCount: 10
    }
  },

  mounted() {
    // this.fetchBooks();
  },

  created() {
    this.debouncedSearch = this.debounce(this.onSearchSubmit, 500);
  },

  methods: {
    onSearchSubmit() {
      fetchBooks(this.search)
        .then(data => {
          this.books = data.docs
          this.books.forEach(item => {
            if (!item.ratings_average) {
              item.ratings_average = (Math.random() * 5).toFixed(2);
            }
          })
          console.log(this.books);
          this.booksCount = data.numFound;
          this.isFetching = false;
        })
        .catch(error => {
          console.log('error', error);
          this.isFetching = false;
        })
    },

    debounce(func, timeout = 300) {
      let timer;
      return (...args) => {
        clearTimeout(timer);
        timer = setTimeout(() => { func.apply(this, args); }, timeout);
      };
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
  padding-bottom: 2.5rem;
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

.search-submit {
  display: block;
}

.search-submit-btn {
  border: 0;
  background-color: #19376D;
  padding: 0 1.6rem;
  border-radius: .8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
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
  max-width: 144rem;
  margin-left: auto;
  margin-right: auto;
  position: relative;

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

  .book-card {}

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
}

.book-listing-book-card {
  height: 100%;
}

table {
  border-collapse: separate;
  border-spacing: 0 2.4rem;
  width: 90%;
}

th,
td {
  text-align: left;
  padding: 1.2rem;
  margin-bottom: 1.2rem;
}

.book-basic-info {
  display: flex;
  gap: 4.7rem;

  picture {
    min-width: 5rem;
  }

  img {
    height: 10rem;
    border-radius: .4rem;
  }
}

tbody tr {
  background-color: white;
  border-radius: 10px;
}
</style>