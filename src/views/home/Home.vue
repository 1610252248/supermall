<template>
  <div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <tab-control class="up-tab-control" v-show="isShowTabControl" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="getCategory"/>

    <bt-scroll class="bt-scroll" ref="scroll" @scroll="getPosition" @loadMore="loadMore">
      <home-swiper :banners="banners" @loadSwiperImage="loadSwiperImage"/>
      <home-recommend :recommend="recommend"/>
      <home-feature/>
      <tab-control  ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="getCategory"/>
      <goods-list :goods="goods[curCategory].list"/>
    </bt-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import {getHomeGoods, getHomeMultidata} from "@/network/home";
  import {itemListenerMixin, backTopMixin} from "@/common/mixin"

  import homeSwiper from "./childCp/homeSwiper";
  import HomeRecommend from "./childCp/homeRecommend";
  import HomeFeature from "./childCp/homeFeature";
  import NavBar from "@/components/common/navBar/navBar";
  import BtScroll from "@/components/common/btScroll/btScroll";
  import BackTop from "@/components/content/backTop/backTop";
  import GoodsList from "@/components/content/goods/goodsList";
  import TabControl from "@/components/content/tabControl/tabControl";

  export default {
    name: "Home",
    components: {TabControl, GoodsList, BackTop, BtScroll, HomeFeature, HomeRecommend, NavBar, homeSwiper},
    data() {
      return {
        banners: '',
        recommend: '',
        goods: {
          'pop': {page: 0, list: []},
          'new': {page: 0, list: []},
          'sell': {page: 0, list: []},
        },
        categories: ['pop', 'new', 'sell'],
        curCategory: 'pop',
        tabOffsetTop: 0,
        isShowTabControl: false,
        saveY: 0
      }
    },
    mixins: [itemListenerMixin, backTopMixin],
    created() {
      this.getHomeMultidata();
      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata().then(res => {
            this.banners = res.data.data.banner.list;
            this.recommend = res.data.data.recommend.list;
          })
      },
      getHomeGoods(type) {
        let page = ++this.goods[type].page;
        getHomeGoods(type, page).then(res => {
            this.goods[type].list.push(...res.data.data.list);
          })
      },
      getCategory(index) {
        this.curCategory = this.categories[index];
        this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index;
      },
      getPosition(position) {
        this.isShowBack = (-position.y) > 600;
        this.isShowTabControl = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        console.log('-----');
        this.getHomeGoods(this.curCategory);
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
          console.log('上拉加载更多');
        }, 600);
      },
      loadSwiperImage() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },
    activated(){
      this.$refs.scroll.scrollTo(0, this.saveY, 0);
      this.$refs.scroll.refresh();
    },
    deactivated(){
      this.saveY = this.$refs.scroll.getScrollY();
    },
  }
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: var(--color-background);
  }
  .up-tab-control{
    position: fixed;
    top: 43px;
    left: 0;
    right: 0;
    z-index: 9;
  }
  .bt-scroll {
    height: calc(100% - 93px);
    overflow: hidden;
    position: relative;
  }
</style>
