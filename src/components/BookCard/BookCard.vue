<template>
  <div class="book-card" v-if="book">
    <div class="book-card-img-container">
      <picture>
        <source v-if="book.cover_i" :srcset="`https://covers.openlibrary.org/b/id/${book.cover_i}-L.jpg?default=false`"
          type="image/jpg">
        <img src="https://openlibrary.org/images/icons/avatar_book-sm.png">
      </picture>
    </div>
    <div class="book-card-content">

      <div class="label-bold book-title">
        {{ book.title }}
      </div>
      <div class="book-author">
        {{ book.author_name && book.author_name.join(', ') }}, {{ book.first_publish_year }}
      </div>

      <div class="book-description">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Ex, quam deleniti. Officia, nesciunt, error dolorem
        consequatur obcaecati ipsum ea dignissimos doloremque earum consequuntur impedit iste magnam voluptatem ipsa
        distinctio minus.
      </div>

      <div class="book-footer">

        <!-- REMOVE FROM CART -->
        <button class="cart-btn item-in-cart" @click.prevent="cartStore.removeItem(book.key)" v-if="cartStore.idsObject[book.key]">
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

        <!-- ADD TO FAV -->
        <button class="add-to-fav-btn" aria-label="Add to favorites">
          <svg width="24px" height="24px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fill-rule="evenodd" clip-rule="evenodd"
              d="M12 6.00019C10.2006 3.90317 7.19377 3.2551 4.93923 5.17534C2.68468 7.09558 2.36727 10.3061 4.13778 12.5772C5.60984 14.4654 10.0648 18.4479 11.5249 19.7369C11.6882 19.8811 11.7699 19.9532 11.8652 19.9815C11.9483 20.0062 12.0393 20.0062 12.1225 19.9815C12.2178 19.9532 12.2994 19.8811 12.4628 19.7369C13.9229 18.4479 18.3778 14.4654 19.8499 12.5772C21.6204 10.3061 21.3417 7.07538 19.0484 5.17534C16.7551 3.2753 13.7994 3.90317 12 6.00019Z"
              stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          </svg>
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import { RouterLink } from 'vue-router';
import { useCartStore } from '../../stores/cart';
export default {
    props: ['book'],
    setup() {
        const cartStore = useCartStore();
        return { cartStore };
    },
    components: { RouterLink }
}
</script>
<style lang="scss" scoped>
.book-card {
  // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  // display: flex;

  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  width: 32rem;
  background-color: white;
  padding: 1.6rem .8rem;
  border-radius: .8rem;
  display: flex;
  flex-direction: column;
  transition: all .2s linear;
  cursor: pointer;

  &:hover {
    // box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
    box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px, rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  }

  &-img-container {
    text-align: center;

    img {
      height: 20rem;
      border-radius: .4rem;
    }
  }

  &-content {
    padding: 16px 8px;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
  }

  .book-author {
    color: #919EAB;
  }

  .book-description {
    margin-top: 24px;
    // font-size: 18px;
    font-size: 1.4rem;
    line-height: 1.4;
    padding-bottom: 2rem;
  }

  .book-footer {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: auto;
    border-top: 1px solid #e1e1e1;
    padding-top: 2rem;

    .cart-btn {
      border: none;
      background-color: transparent;
      display: flex;
      align-items: center;
      gap: 8px;
      cursor: pointer;

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

    .add-to-fav-btn {
      border: none;
      background-color: transparent;
      cursor: pointer;

      svg {
        transition: fill .5s linear;
      }

      svg:hover {
        fill: red;
        stroke: red;
        transform: scale(1.2);
      }
    }
  }
}</style>