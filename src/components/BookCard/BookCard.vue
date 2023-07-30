<template>
  <div class="book-card">
    <div class="book-card-img-container">
      <img src="@/assets/images/book-1.jpeg" alt="Book 1" class="book-card-img">
    </div>
    <div class="book-card-content">
      <div class="book-title-author">
        <span class="book-title">Return of the Nightangle</span>
        <span class="book-author">Paulo Coleho</span>
      </div>

      <div class="book-description">
        The Alchemist is a novel by Brazilian author Paulo Cohelo. It was published in 1988 and was the first book in the Brazilian Alchemist series.
      </div>
    </div>
  </div>


  <div class="card">

  </div>
</template>
<script>
export default {

}
</script>
<style lang="scss" scoped>
.book-card {
  box-shadow: rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px;
  display: flex;
  width: 320px;
  &-img-container {
    text-align: center;
  }
  &-img {
    height: 100%;
    // width: 100%;
  }

  &-content {
    padding: 16px 8px;
  }

  .book-title-author {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;

    .book-title {
      margin-right: 12px;
    }

    .book-author {
      color: #525252;
    }
  }

  .book-description {
    margin-top: 24px;
    // font-size: 18px;
    line-height: 1.2;
  }
}
</style>