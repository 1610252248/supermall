<template>
  <div ref="wrapper1">
    <div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'

  export default {
    name: "btScroll",
    data() {
      return {
        bs: null,
        isShowLoad: false
      }
    },
    mounted() {
      this.init();
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.wrapper1, {
          click: true,
          scrollY: true,
          pullDownRefresh: true,
          pullUpLoad: true
        })
        this.bs.on('pullingDown', () => {
          console.log('下拉加载中');
          this.isShowLoad = true;
          setTimeout(() => {
            this.bs.finishPullDown();
            this.isShowLoad = false;
          }, 600)
        })
        this.bs.on('pullingUp', () => {
          this.$emit('loadMore');
        })
        this.bs.on('scroll', position => {
          this.$emit('scroll', position);
        })
      },
      scrollTo(x = 0, y = 0, time = 500) {
        this.bs.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.bs.finishPullUp();
      },
      refresh() {
        this.bs.refresh();
      }
    }

  }
</script>

<style scoped>

</style>
