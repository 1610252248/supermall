<template>
  <div class="goods-item" v-if="Object.keys(goods).length" @click="jumpDetail(showGoodsId)">
    <img v-lazy="showImage" alt="" @load="loadImage">
    <div class="goods-info">
      <p>{{goods.title}}</p>
      <span class="price">{{goods.price}}</span>
      <span class="collect">{{goods.cfav}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "goodsListItem",
    props: ['goods'],
    computed: {
      showImage() {
        return this.goods.image || this.goods.show.img;
      },
      showGoodsId() {
        return this.goods.iid || this.goods.shop_id;
      }
    },
    inject: ['reload'],
    methods: {
      loadImage() {
        this.$bus.$emit('loadImage');
      },
      jumpDetail(iid) {
        this.reload();
        this.$router.push({
          path: '/detail',
          query: {
            iid: iid
          }
        }).catch(err => err);
      }
    }
  }
</script>

<style scoped>
  .goods-item {
    padding-bottom: 40px;
    position: relative;
    width: 48%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;

  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~@/assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>
