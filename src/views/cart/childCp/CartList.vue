<template>
  <div class="cart-list">
    <bt-scroll class="wrapper" ref="scroll">
      <cart-list-item v-for="(item, index) in cartList" :itemInfo="item" :key="index"/>
    </bt-scroll>
  </div>
</template>

<script>
  import CartListItem from "@/views/cart/childCp/CartListItem";
  import BtScroll from "@/components/common/btScroll/btScroll";
  import {mapState} from 'vuex'

  export default {
    name: "CartList",
    components: {BtScroll, CartListItem},
    computed: {
      ...mapState(['cartList'])
    },
    activated() {
      this.$refs.scroll.refresh();
    },
  }
</script>

<style scoped>
  .cart-list {
    height: calc(100% - 55px - 39px - 40px);
  }

  .wrapper {
    height: 100%;
    overflow: hidden;
  }
</style>
