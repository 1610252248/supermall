<template>
  <swiper class="detail-swiper" v-if="topImages.length">
    <swiper-item v-for="(item, index) in topImages" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>

  import {Swiper, SwiperItem} from "@/components/common/swiper/index";

  export default {
    name: "detaiSwiper",
    components: {Swiper, SwiperItem},
    props: ['topImages']
  }
</script>

<style scoped>
  .detail-swiper {
    height: 300px;
    overflow: hidden;
  }
</style>
