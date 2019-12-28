<template>
  <div class="bt-scroll" ref="scroll">
    <div class="content-scroll">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  export default {
    name: "btScroll",
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          click: true,
          probeType: 3,
          scrollY: true,
          pullDownRefresh: true,
          pullUpLoad: true
        })
        this.bs.on('pullingDown', () => {
          console.log('上拉加载中');
          setTimeout(()=>{
            this.bs.finishPullDown();
          }, 600)
        })
        this.bs.on('pullingUp', () => {
          console.log('下拉加载中');
          setTimeout(()=>{
            this.bs.finishPullUp();
          }, 1600)
        })
      }
    }
  }
</script>

<style scoped>

</style>
