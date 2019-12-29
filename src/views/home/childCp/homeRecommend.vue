<template>
  <div class="home-recommend">
    <div v-for="item in recommend" class="recommend-item">
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
  export default {
    name: "homeRecommend",
    props: ['recommend']
  }
</script>

<style scoped>
  .home-recommend {
    display: flex;
    text-align: center;
    padding: 10px 0 20px 0;
    border-bottom: 10px solid #eee;
  }
  .recommend-item {
    flex: 1;
    width: 100%;
    font-size: 14px;
  }
  .recommend-item img {
    width: 85px;
    height: 85px;
    margin-bottom: 5px;
  }

</style>
