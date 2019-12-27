<template>
  <div id="chidren-swiper">
    <Swiper>
      <SwiperItem v-for="item in banners">
        <a :href="item.link"> <img :src="item.image" alt=""></a>
      </SwiperItem>
    </Swiper>
  </div>
</template>

<script>

  import {Swiper, SwiperItem} from "components/common/swiper/index";
  export default {
    name: "chidrenSwiper",
    props: ['banners'],
    components: {Swiper, SwiperItem},

  }
</script>

<style scoped>

</style>
