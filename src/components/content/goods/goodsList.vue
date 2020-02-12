<template>
  <div class="goods-content">
    <div class="goods-list" v-if="goods.length">
      <goods-list-item class="goods-item" v-for="(item, index) in goods" :goods="item" :key="index"/>
    </div>
  </div>
</template>

<script>
  import GoodsListItem from "./goodsListItem";

  export default {
    name: "goodsList",
    components: {GoodsListItem},
    props: ['goods']
  }
</script>
<style scoped>
  .goods-list {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-evenly;
  }

  .goods-content {
    margin-bottom: 70px;
  }
</style>
