<template>
  <div class="home-nav">
    <nav-bar>
      <div slot="center">购物街</div>
    </nav-bar>
  </div>
</template>

<script>
  import NavBar from "components/common/navbar/navBar";
  export default {
    name: "Home",
    components: {NavBar}
  }
</script>

<style scoped>
  .home-nav {
    background-color: var(--color-tint);
    color: var(--color-background);
  }
</style>
