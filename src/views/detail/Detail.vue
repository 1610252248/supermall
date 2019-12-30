<template>
  <div id="detail">
    <detail-nav-bar/>
    <detail-swiper :top-images="topImages"/>
  </div>
</template>

<script>
  import DetailNavBar from "@/views/detail/childCp/detailNavBar";
  import DetailSwiper from "@/views/detail/childCp/detailSwiper";

  import {getDetail} from "@/network/detail";


  export default {
    name: "Detail",
    components: {DetailSwiper, DetailNavBar},
    data() {
      return {
        iid: '',
        data: '',
        topImages:[],
      }
    },
    created() {
      this.iid = this.$route.query.iid;
      this.getDetail();
    },
    mounted() {
    },
    methods: {
      getDetail() {
        getDetail(this.iid)
        .then(res => {
          this.data = res.data;
          this.topImages = res.data.result.itemInfo.topImages;
        })
      }
    }
  }
</script>

<style scoped>

</style>
