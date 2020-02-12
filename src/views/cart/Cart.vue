<template>
  <div id="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list/>

    <cart-bottom-nav/>
  </div>
</template>

<script>
  import NavBar from "@/components/common/navBar/navBar";
  import {mapGetters} from 'vuex';
  import CartList from "@/views/cart/childCp/CartList";
  import CartBottomNav from "@/views/cart/childCp/cartBottomNav";

  export default {
    name: "Cart",
    components: {CartBottomNav, CartList, NavBar},
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  #cart {
    height: 100vh;
  }
  .nav-bar {
    background: var(--color-tint);
    color: #fff;
  }
</style>
