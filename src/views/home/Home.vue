<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>
    <tab-control :titles="['流行','新款','样品']"
                   @tabClick="tabClick"
                   ref="tabControl1"
                   :class="fixed"
                   v-show="isTabfixed"/>
    <scroll class="content" ref="scroll"
            :probe-type="3" @scroll="contentScroll"
            :pull-up-load="true"
            @pullingUp="loadMore">
      <home-swiper :banners="banners"
      @swiperImageLoad="swiperImageLoad"/>
      <recommend-view :recommends="recommends"/>
      <feature-view/>
      <tab-control :titles="['流行','新款','样品']"
                   @tabClick="tabClick"
                   ref="tabControl2"
                   :class="{fixed: isTabfixed}"/>

      <goods-list :goods="showGoods "/>
    </scroll>

    <back-top @click.native="backClick" v-show="isShowBackTop"/>
  </div>
</template>

<script>
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  import FeatureView from './childComps/FeatureView'

  import tabControl from 'components/content/tabControl/tabControl'
  import NavBar from 'components/common/navbar/NavBar'
  import GoodsList from 'components/content/goods/GoodsList'
  import Scroll from 'components/common/scroll/Scroll'
  import BackTop from 'components/content/backTop/BackTop'

  import { itemListenerMixin } from "components/common/mixin";
  import { getHomeMultidata, getHomeGoods } from "network/home";
  import { debounce } from "components/common/utils";
  export default {
    name: "Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      tabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    mixins: [itemListenerMixin],
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          'pop': {page: 0 ,list: []},
          'new': {page: 0 ,list: []},
          'sell': {page: 0 ,list: []},
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabfixed: false,
        fixed: "fixed",
        saveY: 0
      }
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      }
    },
    created() {
      //1.请求我们的多个数据
      this.getHomeMultidata()
      //2.请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    activated() {
      this.$refs.scroll.scrollTo(0, this.saveY, 0.1);
      this.$refs.scroll.refresh();
    },
    deactivated () {
      this.saveY = this.$refs.scroll.getScrollY();
    },
    mounted () {
       //3.监听item中图片加载完成
      //  const refresh = debounce(this.$refs.scroll.refresh, 200)
      // this.$bus.$on('itemImageLoad', () => {
      //   refresh();
      // })
    },
    methods: {
      tabClick(index) {
        switch(index) {
          case 0:
            this.currentType = 'pop';
            break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell';
            break
        }
        this.$refs.tabControl1.currentIndex = index;
        this.$refs.tabControl2.currentIndex = index;
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0);
      },
      contentScroll(position) {
        this.isShowBackTop = (-position.y) > 1000

        this.isTabfixed = (-position.y) > this.tabOffsetTop
      },
      loadMore() {
        this.getHomeGoods(this.currentType)
      },

      swiperImageLoad() {
        // console.log(this.$refs.tabControl)
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop;
      },
      //网络请求
      getHomeMultidata() {
        getHomeMultidata().then(res => {
          //this.result = res;
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      getHomeGoods(type) {
        const page = this.goods[type].page +1
        getHomeGoods(type, page).then(res =>{
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1
          //完成上拉加载更多
          this.$refs.scroll.finishPullUp();
        })
      }
    }
  }
</script>

<style scoped>
  #home {
    height: 100vh;
  }
  .home-nav {
    background-color: var(--color-tint);
    color: #fff;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  /* .tab-control {
    position: sticky;
    top: 44px;
    z-index: 9;
  } */
  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  .fixed {
    position: relative;
    z-index: 9;
  }
  /*.content {*/
  /*height: calc(100% - 93px);*/
  /*overflow: hidden;*/
  /*margin-top: 44px;*/
  /*}*/
</style>
