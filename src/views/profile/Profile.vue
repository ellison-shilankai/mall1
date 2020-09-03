<template>
  <div>
    <!-- <skeleton /> -->
    <div v-if="testBoolean">{{testObj}}</div>
    <scroll class="content">
      {{obj1}}
      {{obj1.name}}
      {{obj2}}
    </scroll>
    <van-button color="#7232dd">单色按钮</van-button>
    <van-button color="#7232dd" plain>单色按钮</van-button>
    <van-button color="linear-gradient(to right, #ff6034, #ee0a24)">渐变色按钮</van-button>
    <van-button type="primary" size="large">大号按钮</van-button>
    <van-button type="primary" size="normal">普通按钮</van-button>
    <van-button type="primary" size="small">小型按钮</van-button>
    <van-button type="primary" size="mini">迷你按钮</van-button>
    <van-cell-group title="分组1">
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
    <van-cell-group title="分组2">
      <van-cell title="单元格" value="内容" />
    </van-cell-group>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll";
import Skeleton from "components/common/skeleton/Skeleton";
import { quickSort } from "@/components/common/algorithm";
import { mapState, mapActions } from "vuex";
export default {
  name: "Profile",
  components: {
    Skeleton,
    Scroll
  },
  data() {
    return {
      obj1: { name: "小明", age: 20 },
      obj2: {},
      obj3: {},
      arr: [5, 3, 2, 7, 10],
      arr1: [],
      str: "aweoifdjmaiofcja"
    };
  },
  computed: {
    ...mapState(["testBoolean", "testObj"])
  },
  created() {
    // this.arr1 = quickSort(this.arr);
    console.log(quickSort(this.arr));

    // this.changeStatus(false);
    this.obj2 = this.clone(this.obj1);
    this.obj3 = this.deepClone(this.obj1);
    this.obj1.name = "小红";

    this.$bus.$on("event1", function(aaa) {
      console.log(aaa);
    });
    console.log(this.select(this.str));
  },
  methods: {
    ...mapActions(["changeStatus"]),
    clone(origin) {
      return Object.assign({}, origin);
    },
    deepClone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
    },
    quickSort(arr) {
      if (arr.length <= 1) {
        return arr;
      }
      var pivotIndex = Math.floor(arr.length / 2); //去基准点
      var pivot = arr.splice(pivotIndex, 1)[0]; //取基准值
      var left = []; //放小于基准点的值
      var right = []; //放大于基准点的值
      //遍历数组，分组
      for (var i = 0; i < arr.length; i++) {
        if (arr[i] < pivot) {
          left.push(arr[i]);
        }
        if (arr[i] > pivot) {
          right.push(arr[i]);
        }
      }
      //递归执行以上操作,对左右两个数组进行操作，直到数组长度为<=1；
      return this.quickSort(left).concat([pivot], this.quickSort(right));
    },
    select(str) {
      var obj = {};
      var obj2 = {};
      var arr = str.split("");
      var max = 1;
      for (let i = 0; i < arr.length; i++) {
        var item = arr[i];
        obj[item] = obj[item] + 1 || 1;
      }
      for (var key in obj) {
        if (obj[key] > max) max = key;
      }
      for (var key in obj) {
        if (obj[key] === max) obj2[key] = max;
      }
      return obj2;
    }
  }
};
</script>
<style scoped>
/* .content {
    height: 300px;
    background-color: red;
    overflow: hidden;
  } */
</style>
