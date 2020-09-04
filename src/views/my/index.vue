<template>
  <div class="my">
    <div class="my-header">
      <div class="my-header-left">
        <img :src="avatar" />
        <p class="header-left-content">{{ nickName }}</p>
      </div>
      <div class="my-header-right" @click="toMyDetail">
        <van-icon name="arrow" />
        <!-- <i class="iconfont iconfangxiang"></i> -->
      </div>
    </div>

    <div class="my-content">
      <div class="content-function" >
        <div class="content-function-left">绑定手机号</div>
        <div><van-icon name="arrow" /></div>
      </div>

      <div class="line-gray"></div>

      <div class="content-function" >
        <div class="content-function-left">联系我们</div>
        <div><van-icon name="arrow" /></div>
      </div>

      <div class="line-gray"></div>

      <div class="content-order">
        <div class="content-order-title">
          我的订单
        </div>

        <van-list
          v-model="loading"
          :finished="isAll"
          finished-text=""
        >
        </van-list>
        <e-empty v-if="isEmpty"></e-empty>
      </div>
    </div>

    <van-skeleton title avatar :row="3" :loading="loading">

    </van-skeleton>
  </div>
</template>

<script>
export default {
  name: "My",
  data() {
    return {
      avatar: '@/assets/img/avatar.jpg',
      loading: true,
      nickName: 'jack',
      isEmpty: false,
      isAll: false,
    };
  },
  mounted() {
    this.loading = false;
  },
  methods: {
    toMyDetail() {
      this.$router.push({ path: "/my/details" });
    }
  }
};
</script>

<style>
</style>