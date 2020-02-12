<template>
  <div class="bottom-bar">
    <div class="content">
      <check-button @click.native="checkClick" class="check-button" :is-check="isSelect" />
      <span>全选</span>
    </div>
    <div class="total">
      合计:<span style="color: #ff2a16">￥{{totalPrice}}</span>
    </div>

    <div class="select" @click="buy">
      结算{{totalCount}}
    </div>
  </div>
</template>

<script>
  import CheckButton from "@/components/common/CheckButton/CheckButton";
  import {mapState} from 'vuex'

  export default {
    name: "cartBottomNav",
    components: {CheckButton},
    computed: {
      ...mapState(['cartList']),
      totalPrice() {
         return this.cartList.filter(item => item.check).reduce((pre, now) => {
             return pre + now.count * now.price;
           }, 0)
      },
      totalCount() {

        let val = this.cartList.filter(item => item.check).length;
        if(val === 0) return "";
        return "("+val+")";
      },
      isSelect() {
        return this.cartList.length > 0 &&
          this.cartList.find(item => !item.check) == null
      }
    },
    methods: {
      checkClick() {
        let val = !this.isSelect;
        this.cartList.forEach(item => {
          item.check = val;
        })
      },
      buy() {
        this.$toast.show('结算失败，余额不足')
      }
    }
  }
</script>

<style scoped>
  .bottom-bar {
    display: flex;
    height: 40px;
    line-height: 40px;
    background-color: #f6f6f6;
    font-size: 14px;
  }
  .content {
    display: flex;
    align-items: center;
    margin-left: 10px;
    width: 100px;
  }

  .check-button {
    width: 21px;
    height: 21px;
    line-height: 21px;
    margin-right: 5px;
  }

  .total {
    flex: 1;
    text-align: right;
    margin-right: 10px;
  }

  .select {
    margin-right: 10px;
    width: 100px;
    background-color: #ff2a16;
    border-radius: 20px;
    text-align: center;
    color: #fff;
  }
</style>
