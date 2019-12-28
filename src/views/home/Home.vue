<template>
  <div id="home" ref="scroll">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <bt-scroll class="bt-scroll">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="getCategory"></tab-control>
      <goods-list :goods="goods[curCategory]"></goods-list>
    </bt-scroll>
  </div>
</template>

<script>
  import {getHomeMultidata, getHomeGoods} from "network/home";

  import NavBar from "components/common/navBar/navBar";
  import homeSwiper from "./childCp/homeSwiper";
  import TabControl from "components/common/tabControl/tabControl";
  import HomeRecommend from "./childCp/homeRecommend";
  import HomeFeature from "./childCp/homeFeature";
  import GoodsList from "components/common/goods/goodsList";
  import BScroll from "better-scroll";
  import BtScroll from "@/components/common/btScroll/btScroll";

  export default {
    name: "Home",
    components: {BtScroll, TabControl, GoodsList, HomeFeature, HomeRecommend, NavBar,homeSwiper},
    data() {
      return {
        data: '',
        banners: '',
        recommend: '',
        goods: {
          'pop' : {page: 0, list: []},
          'new' : {page: 0, list: []},
          'sell' : {page: 0, list: []},
        },
        categories: ['pop', 'new', 'sell'],
        curCategory: 'pop',
      }
    },
    mounted() {
      this.getHomeMultidata();
      this.getHomeGoods(this.curCategory);
      // this.init();
    },
    methods: {
      init() {
        this.bs = new BScroll(this.$refs.scroll, {
          scrollY: true,
          click: true,
          probeType: 3 // listening scroll hook
        })
      },
      getHomeMultidata() {
        getHomeMultidata()
          .then(res => {
            this.data = res;
            this.banners = res.data.data.banner.list;
            this.recommend = res.data.data.recommend.list;
          })
      },
      getHomeGoods(type) {
        let page = ++this.goods[type].page;
        getHomeGoods(type, page)
          .then(res => {
            this.goods[type].list.push(...res.data.data.list);
          })
      },
      getCategory(index) {
        this.curCategory = this.categories[index]
        this.getHomeGoods(this.curCategory);
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 43px;
    position: relative;
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: var(--color-background);
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9;
  }
  .bt-scroll {
    position: absolute ;
    top: 43px;
    bottom: 49px;
    left: 0px;
    right: 0px;
    overflow: hidden;
  }
</style>
