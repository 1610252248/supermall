<template>
  <div id="tab-bar-item" @click="itemClick">
    <div v-if="!isActive"><slot name="item-icon"></slot></div>
    <div v-else><slot name="item-icon-active"></slot></div>
    <div :class="{active: isActive}"><slot name="item-text"></slot></div>
  </div>
</template>

<script>
  export default {
    name: "tabBarItem",
    props: {
      path: String
    },
    methods: {
      itemClick() {
        this.$router.replace(this.path).catch(err => {err});
      }
    },
    computed: {
      isActive() {
        return this.$route.path == this.path;
      }
    }
  }
</script>

<style scoped>
  #tab-bar-item{
    flex: 1;
    text-align: center;
    font-size: 14px;
    height: 49px;
    padding-top: 3px;
  }
  #tab-bar-item img {
    width: 24px;
    height: 24px;
    vertical-align: middle;
  }

  .active {
    color: #ff5777;
  }
</style>
