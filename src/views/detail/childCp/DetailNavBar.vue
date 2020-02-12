<template>
  <nav-bar>
    <div slot="left" class="back" @click="backClick">
      <img src="~@/assets/img/common/back.svg" alt="">
    </div>
    <div slot="center" class="titles">
      <div v-for="(item, index) in titles" class="titles-item"
           :class="{active: currentIndex == index}" @click="itemClick(index)">
        {{item}}
      </div>
    </div>
  </nav-bar>
</template>

<script>
  import NavBar from "@/components/common/navBar/navBar";
  export default {
    name: "detailNavBar",
    components: {NavBar},
    data() {
      return {
        titles: ['商品','参数','评论','推荐'],
        currentIndex: 0,
      }
    },
    methods: {
      itemClick(index) {
        this.currentIndex = index;
        console.log(index);
        this.$emit('jumpDetail', index)
      },
      backClick() {
        this.$router.back();
      }
    }
  }
</script>

<style scoped>
  .titles {
    display: flex;
    font-size: 14px;
  }
  .titles-item {
    flex: 1;
  }
  .active {
    color: var(--color-high-text);
  }
  .back {
    margin-top: 6px;
  }
</style>
