<template>
  <Swiper v-if="banners.length">
    <SwiperItem v-for="(item, index) in banners" :key="index">
      <a :href="item.link"> <img :src="item.image" alt="" @load="loadImage"></a>
    </SwiperItem>
  </Swiper>
</template>

<script>

  import {Swiper, SwiperItem} from "@/components/common/swiper/index";
  export default {
    name: "homeSwiper",
    data() {
      return {
        isLoad: false,
      }
    },
    props: ['banners'],
    components: {Swiper, SwiperItem},
    methods: {
      loadImage() {
        // if(this.isLoad) return ;
        this.isLoad = true;
        this.$emit('loadSwiperImage');
      }
    }
  }
</script>

<style scoped>

</style>
