<template>
  <div>
    <nav-bar>
      <div slot="left" class="back" @click="backclick">
        <img src="~assets/img/common/back.svg" alt />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item, index) in titles"
          :key="index"
          :class="{active: index === currentIndex}"
          class="title-item"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  components: {
    NavBar
  },
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  methods: {
    titleClick(index) {
      this.currentIndex = index;
    },
    backclick() {
      // this.$router.go(-1)
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.back img {
  margin-top: 12px
}

.title {
  display: flex;
  font-size: 13px;
}

.active {
  color: var(--color-high-text);
}

.title-item {
  flex: 1;
}
</style>