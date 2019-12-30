<template>
  <div id="home">
    <nav-bar class="home-nav"> <div slot="center">购物街</div> </nav-bar>
    <tab-control v-show="isShowTabControl" ref="tabControl1" :titles="['流行','新款','精选']" @tabClick="getCategory"/>

    <bt-scroll class="bt-scroll" ref="scroll" @scroll="getPosition" @loadMore="loadMore">
      <home-swiper :banners="banners" @loadSwiperImage="loadSwiperImage"/>
      <home-recommend :recommend="recommend"/>
      <home-feature/>
      <tab-control v-show="!isShowTabControl" ref="tabControl2" :titles="['流行','新款','精选']" @tabClick="getCategory"/>
      <goods-list :goods="goods[curCategory].list"/>
    </bt-scroll>
    <back-top @click.native="backTopClick" v-show="isShowBack"/>
  </div>
</template>

<script>
  import {getHomeGoods, getHomeMultidata} from "network/home";
  import {debounce} from "@/common/utils";

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
        isShowBack: false,
        tabOffsetTop: 0,
        isShowTabControl: false,
      }
    },
    created() {
      console.log('created');
      this.getHomeMultidata();

      this.getHomeGoods('pop');
      this.getHomeGoods('new');
      this.getHomeGoods('sell');
    },
    mounted() {
      let refresh = debounce(this.scrollRefresh, 20);
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
        this.curCategory = this.categories[index];
        this.$refs.tabControl1.currentIndex = this.$refs.tabControl2.currentIndex = index;
      },
      backTopClick() {
        this.$refs.scroll.scrollTo();
      },
      getPosition(position) {
        this.isShowBack = (-position.y) > 600;
        this.isShowTabControl = (-position.y) > this.tabOffsetTop;
      },
      loadMore() {
        this.getHomeGoods(this.curCategory);
        setTimeout(() => {
          this.$refs.scroll.finishPullUp();
          console.log('上拉加载更多');
        }, 600);
      },
      scrollRefresh() {
        this.$refs.scroll.refresh();
      },
      loadSwiperImage() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      }
    },
    activated() {
      console.log('activated');
    },
    deactivated() {
      console.log('deactivated');
    }

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

  .bt-scroll {
    height: calc(100% - 93px);
    overflow: hidden;
    position: relative;
  }
</style>
