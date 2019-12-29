<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <bt-scroll class="bt-scroll"  ref="scroll" @scroll="showBack" @loadMore="loadMore">
      <home-swiper :banners="banners"></home-swiper>
      <home-recommend :recommend="recommend"></home-recommend>
      <home-feature></home-feature>
      <tab-control :titles="['流行','新款','精选']" @tabClick="getCategory"></tab-control>
      <goods-list :goods="goods[curCategory]"></goods-list>
    </bt-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBack"></back-top>
  </div>
</template>

<script>
  import {getHomeMultidata, getHomeGoods} from "network/home";

  import homeSwiper from "./childCp/homeSwiper";
  import HomeRecommend from "./childCp/homeRecommend";
  import HomeFeature from "./childCp/homeFeature";
  import BScroll from "better-scroll";
  import NavBar from "@/components/common/navBar/navBar";
  import BtScroll from "@/components/common/btScroll/btScroll";
  import BackTop from "@/components/content/backTop/backTop";
  import GoodsList from "@/components/content/goods/goodsList";
  import TabControl from "@/components/content/tabControl/tabControl";

  export default {
    name: "Home",
    components: {TabControl, GoodsList, BackTop, BtScroll,  HomeFeature, HomeRecommend, NavBar,homeSwiper},
    data() {
      return {
        banners: '',
        recommend: '',
        goods: {
          'pop' : {page: 0, list: []},
          'new' : {page: 0, list: []},
          'sell' : {page: 0, list: []},
        },
        categories: ['pop', 'new', 'sell'],
        curCategory: 'pop',
        isShowBack: false
      }
    },
    mounted() {
      this.getHomeMultidata();
      this.getHomeGoods(this.curCategory);
      let refresh = this.debounce(this.scrollRefresh, 20);
      this.$bus.$on('loadImage', () => {
        refresh();
      });
    },
    methods: {
      getHomeMultidata() {
        getHomeMultidata()
          .then(res => {
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
      },
      backTopClick() {
        this.$refs.scroll.scrollTo();
      },
      showBack(position) {
        this.isShowBack = (-position.y) > 600;
      },
      loadMore() {
        console.log('上拉加载更多');
        this.getHomeGoods(this.curCategory);
        setTimeout(this.$refs.scroll.finishPullUp(), 600);
      },
      debounce(func, delay) {
        let timer = null;
        return (...args) => {
          clearTimeout(timer);
          timer = setTimeout(() => {
            func.apply(this, args)
          }, delay)
        }
      },
      scrollRefresh() {
        this.$refs.scroll.refresh();
      }
    }
  }
</script>

<style scoped>
  #home {
    padding-top: 43px;
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
    height: calc(100% - 49px);
    overflow: hidden;
  }
</style>
