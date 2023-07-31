<template>
  <section class="book-detail-banner" v-if="book">
    <div class="banner-container">

      <!-- IMAGE -->
      <div class="book-image-container">
        <picture>
          <source v-if="book.cover_i" :srcset="`https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg?default=false`"
            type="image/jpg">
          <img src="https://openlibrary.org/images/icons/avatar_book-sm.png">
        </picture>
        <div class="book-price">
          $ {{ book.price }}
        </div>
        <div class="cart-section">
          <!-- REMOVE FROM CART -->
          <button class="cart-btn item-in-cart" @click.prevent="cartStore.removeItem(book.key)"
            v-if="cartStore.idsObject[book.key]">
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 6H11M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="label-bold">Remove from Cart</span>
          </button>

          <!-- ADD TO CART -->
          <button class="cart-btn item-not-in-cart" @click.prevent="cartStore.addItem(book)" v-else>
            <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M21 5L19 12H7.37671M20 16H8L6 3H3M16 5.5H13.5M13.5 5.5H11M13.5 5.5V8M13.5 5.5V3M9 20C9 20.5523 8.55228 21 8 21C7.44772 21 7 20.5523 7 20C7 19.4477 7.44772 19 8 19C8.55228 19 9 19.4477 9 20ZM20 20C20 20.5523 19.5523 21 19 21C18.4477 21 18 20.5523 18 20C18 19.4477 18.4477 19 19 19C19.5523 19 20 19.4477 20 20Z"
                stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
            </svg>
            <span class="label-bold">Add to Cart</span>
          </button>
        </div>
      </div>

      <!-- TEXT -->
      <div class="book-content-container">

        <!-- TITLE -->
        <div class="book-title">
          {{ book.title }}
        </div>

        <!-- AUTHOR -->
        <div class="book-author">
          {{ book.author }}
        </div>

        <!-- DESCRIPTION -->
        <div class="book-description">
          {{ book.description }}
        </div>

        <!-- REVIEWS -->
        <div class="book-reviews"></div>

        <!-- TOPICS -->
        <div class="book-topics">
          <h2>Topics</h2>
          <div class="topics-container">
            <div v-for="topic in book.topics" :key="topic" class="topic">
              {{ topic }}
            </div>
          </div>
        </div>

        <!-- PLACES -->
        <div class="book-places"></div>
      </div>
    </div>
  </section>
  <div v-if="isFetching" class="book-loading">
    <svg fill="#000000" width="800px" height="800px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <title>loader</title>
      <path d="M16 0.75c-0.69 0-1.25 0.56-1.25 1.25v0 8c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-8c0-0.69-0.56-1.25-1.25-1.25v0zM16 20.75c-0.69 0-1.25 0.56-1.25 1.25v8c0 0.69 0.56 1.25 1.25 1.25s1.25-0.56 1.25-1.25v0-8c-0-0.69-0.56-1.25-1.25-1.25h-0zM11.25 16c0-0.69-0.56-1.25-1.25-1.25v0h-8c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h8c0.69 0 1.25-0.56 1.25-1.25v0zM30 14.75h-8c-0.69 0-1.25 0.56-1.25 1.25s0.56 1.25 1.25 1.25v0h8c0.69 0 1.25-0.56 1.25-1.25s-0.56-1.25-1.25-1.25v0zM6.984 5.217c-0.226-0.226-0.539-0.366-0.884-0.366-0.69 0-1.25 0.56-1.25 1.25 0 0.345 0.14 0.658 0.366 0.884v0l5.657 5.657c0.226 0.226 0.539 0.366 0.884 0.366 0.69 0 1.25-0.56 1.25-1.25 0-0.345-0.14-0.658-0.366-0.884v0zM21.127 19.357c-0.226-0.225-0.538-0.364-0.882-0.364-0.691 0-1.251 0.56-1.251 1.251 0 0.344 0.139 0.656 0.364 0.882l5.658 5.658c0.227 0.228 0.541 0.369 0.888 0.369 0.691 0 1.251-0.56 1.251-1.251 0-0.347-0.141-0.661-0.369-0.887l-0-0zM10.874 19.357l-5.657 5.658c-0.227 0.226-0.367 0.539-0.367 0.885 0 0.691 0.56 1.251 1.251 1.251 0.345 0 0.658-0.14 0.884-0.366v0l5.657-5.658c0.227-0.226 0.367-0.539 0.367-0.885 0-0.691-0.56-1.251-1.251-1.251-0.345 0-0.658 0.14-0.884 0.366v0zM20.242 13.008c0.001 0 0.001 0 0.002 0 0.345 0 0.657-0.14 0.883-0.366l5.658-5.657c0.226-0.226 0.366-0.539 0.366-0.884 0-0.691-0.56-1.251-1.251-1.251-0.346 0-0.658 0.14-0.885 0.367v0l-5.658 5.657c-0.226 0.226-0.366 0.539-0.366 0.884 0 0.69 0.56 1.25 1.25 1.25 0 0 0.001 0 0.001 0h-0z"></path>
    </svg>
  </div>
</template>
<script>
import { fetchBook } from '@/apis/book';
import { useCartStore } from '../../stores/cart';
export default {
  setup() {
    const cartStore = useCartStore();
    return { cartStore };
  },
  data() {
    return {
      book: null,
      isFetching: true
    }
  },
  created() {
    this.isFetching = true;
    fetchBook(this.$route.params.id)
      .then(data => {
        this.book = data;
        if (this.book.description && this.book.description.value) {
          this.book.description = this.book.description.value;
        }

        this.book.author = 'Paulo Coelho';

        if (!this.book.description) {
          this.book.description = `Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quam deleniti. Officia, nesciunt, error dolorem
        consequatur obcaecati ipsum ea dignissimos doloremque earum consequuntur impedit iste magnam voluptatem ipsa
        distinctio minus.`
        }
        if (this.book.covers && this.book.covers instanceof Array) {
          this.book.cover_i = this.book.covers[0];
        } else {
          this.book.cover_i = null;
        }

        if (this.book.subjects && this.book.subjects instanceof Array) {
          this.book.topics = this.book.subjects.filter((item, index) => index < 5);
        } else {
          this.book.topics = ['fiction'];
        }

        if (!this.book.price) {
          this.book.price = (Math.random() * 200).toFixed(2);
        }

        this.book.key = this.$route.params.id;
        this.isFetching = false;
      })
      .catch(error => {
        this.isFetching = false;
      })
  }
}
</script>
<style lang="scss" scoped>
.book-detail-banner {
  max-width: 144rem;
  margin: 5rem auto;
  margin-top: 5rem;
  padding: 0 2.5rem;
}

.banner-container {
  display: flex;
  gap: 5rem;
  padding: 2.4rem 3.2rem;
  background-color: white;
  border-radius: .4rem;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
}

@media screen and (max-width: 768px) {
  .banner-container {
    flex-direction: column;
  }
}

.book-image-container {
  img {
    width: 25rem;
    border-radius: .4rem;
  }
}

.book-price {
  margin-top: 1rem;
  font-size: 1.8rem;
  font-weight: bold;
}

.cart-btn {
  border: none;
  background-color: transparent;
  display: flex;
  align-items: center;
  gap: 8px;
  cursor: pointer;
  margin-top: 2rem;

  svg {
    color: currentColor;
    stroke: currentColor;
  }

  &.item-in-cart:hover {
    color: red;
  }

  &.item-not-in-cart:hover {
    color: green;
  }
}

.book-title {
  font-size: 3.2rem;
  line-height: 3.2rem;
  font-weight: bold;
  margin-bottom: 1.5rem;
}

.book-author {
  font-size: 1.6rem;
  color: #555555;
  margin-bottom: 2rem;
}

.book-description {
  font-size: 1.6rem;
  line-height: 2.7rem;
  max-width: 100rem;
}

.book-topics {
  margin-top: 2.5rem;
}

.topics-container {
  display: flex;
  gap: 15px;
  flex-wrap: wrap;
  margin-top: 1rem;

}

.topic {
  border: 1px solid #515151;
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 1.4rem;
  color: #515151;
}

.book-loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  svg {
    width: 10rem;
    height: 10rem;
  }
}
</style>