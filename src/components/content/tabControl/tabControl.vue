<template>
  <div class="tab-control">
    <div v-for="(item, index) in titles" class="tab-control-item" @click="Click(index)">
      <span :class="{'active': index == currentIndex}">{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "tabControl",
    props:['titles'],
    data() {
      return {
        currentIndex: 0
      }
    },
    methods: {
      Click(index) {
        this.currentIndex = index;
        this.$emit('tabClick', index);
      }
    }
  }
</script>

<style scoped>
  .tab-control {
    display: flex;
    text-align: center;
    background-color: var(--color-background);
  }
  .tab-control-item {
    flex: 1;
    height: 40px;
    line-height: 40px;
    font-size: 15px;
  }
  .tab-control-item span {
    padding: 4px;
  }
  .active {
    color: var(--color-high-text);
    border-bottom: 2px solid var(--color-high-text);
  }
</style>
