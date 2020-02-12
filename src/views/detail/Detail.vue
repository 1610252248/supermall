<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav-bar" ref="nav" @jumpDetail="jumpDetail"/>
    <bt-scroll class="detail-scroll" @scroll="contentScroll" ref="scroll">
      <detail-swiper :top-images="topImages"/>
      <detail-base-info :goods="goods"/>
      <detail-shop-info :shop="shop"/>
      <detail-goods-info :detail-info="detailInfo"/>
      <detail-param-info ref="param" :param-info="paramInfo"/>
      <detail-comment-info ref="comment" :comment-info="commentInfo"/>
      <goods-list ref="recommend" :goods="recommends"/>
    </bt-scroll>
    <detail-bottom-bar @addToCart="addToCart"/>
    <back-top @click.native="backTopClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import {getDetail, getRecommend, Goods, GoodsParam, Shop} from "@/network/detail";
  import {backTopMixin, itemListenerMixin} from "@/common/mixin"
  import {debounce} from "@/common/utils";
  import {mapActions} from 'vuex'

  import DetailNavBar from "@/views/detail/childCp/DetailNavBar";
  import DetailSwiper from "@/views/detail/childCp/DetailSwiper";
  import DetailBaseInfo from "@/views/detail/childCp/DetailBaseInfo";
  import DetailShopInfo from "@/views/detail/childCp/DetailShopInfo";
  import BtScroll from "@/components/common/btScroll/btScroll";
  import DetailGoodsInfo from "@/views/detail/childCp/DetailGoodsInfo";
  import DetailParamInfo from "@/views/detail/childCp/DetailParamInfo";
  import DetailCommentInfo from "@/views/detail/childCp/DetailCommentInfo";
  import GoodsList from "@/components/content/goods/goodsList";
  import DetailBottomBar from "@/views/detail/childCp/DetailBottomBar";
  import BackTop from "@/components/content/backTop/backTop";

  export default {
    name: "Detail",
    components: {
      BackTop,
      DetailBottomBar,
      GoodsList,
      DetailCommentInfo,
      DetailParamInfo, DetailGoodsInfo, BtScroll, DetailShopInfo, DetailBaseInfo, DetailSwiper, DetailNavBar
    },
    data() {
      return {
        iid: '',
        data: '',
        topImages: [],
        goods: {},
        shop: {},
        detailInfo: {},
        paramInfo: {},
        commentInfo: {},
        recommends: {},
        currentIndex: 0,
        offsetTops: [],
        getDetailTop: null,
        temp: null,
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      this.temp = () => {
        this.offsetTops = [];
        this.offsetTops.push(0);
        if (!this.$refs.param) return;
        this.offsetTops.push(this.$refs.param.$el.offsetTop);
        this.offsetTops.push(this.$refs.comment.$el.offsetTop);
        this.offsetTops.push(this.$refs.recommend.$el.offsetTop);
      }
    },
    mounted() {
      this.iid = this.$route.query.iid;
      this.init();
      this.getDetailTop = debounce(this.temp, 500)
      this.$bus.$on('loadImageGetTop', () => {
        this.getDetailTop();
      });
    },
    methods: {
      ...mapActions(['addCart']),
      jumpDetail(index) {
        this.$refs.scroll && this.$refs.scroll.scrollTo(0, -this.offsetTops[index]);
      },
      init() {
        getDetail(this.iid).then(res => {
          const data = res.data.result;
          this.data = res.data.result;
          this.topImages = data.itemInfo.topImages;
          this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
          this.shop = new Shop(data.shopInfo);
          this.detailInfo = data.detailInfo;
          this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule);
          if (data.rate.list) this.commentInfo = data.rate.list[0];
        })
        getRecommend().then(res => {
          this.recommends = res.data.data.list;
        })
      },
      contentScroll(position) {
        let y = -position.y;
        this.isShowBack = y > 600;
        for (let i = this.offsetTops.length - 1; i >= 0; i--) {
          if (-position.y >= this.offsetTops[i]) {
            this.$refs.nav.currentIndex = i;
            break;
          }
        }
      },
      addToCart() {
        let product = {};
        product.image = this.topImages[0];
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice;
        product.iid = this.iid;
        product.check = false;
        product.count = 1;
        this.addCart(product).then(res => {
          this.$toast.show(res);
        });
      }
    }
  }
</script>

<style scoped>
  #detail {
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }

  .detail-scroll {
    height: calc(100% - 44px - 58px);
    position: relative;
  }

  .detail-nav-bar {
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>
