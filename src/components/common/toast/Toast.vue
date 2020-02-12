<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>
</template>

<script>
  export default {
    name: "Toast",
    data() {
      return {
        message: "默认数值ABC",
        isShow: false
      }
    },
    methods: {
      show(message = "默认数值", duration = 2000) {
        this.message = message;
        this.isShow = true;
        setTimeout(() => {
          this.isShow = false;
        }, duration);
      }
    }
  }
</script>

<style scoped>
  .toast {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 8px 15px;
    border-radius: 15px;

    color: #fff;
    background-color: rgba(0, 0, 0, 0.75);
    z-index: 99;
  }
</style>
