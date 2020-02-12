<template>
  <div ref="wrapper">
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
        this.bs = new BScroll(this.$refs.wrapper, {
          click: true,
          scrollY: true,
          pullUpLoad: true,
          probeType: 3
        })
        this.bs.on('pullingUp', () => {
          // console.log('-------');
          this.$emit('loadMore');
        })
        this.bs.on('scroll', position => {
          this.$emit('scroll', position);
        })
      },
      scrollTo(x = 0, y = 0, time = 500) {
        this.bs && this.bs.scrollTo(x, y, time);
      },
      finishPullUp() {
        this.bs && this.bs.finishPullUp();
      },
      refresh() {
        this.bs && this.bs.refresh();
      },
      getScrollY() {
        return this.bs ?  this.bs.y : 0;
      }
    }

  }
</script>

<style scoped>

</style>
