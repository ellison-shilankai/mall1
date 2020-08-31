<template>
  <div>
    <!-- <skeleton /> -->
    <div v-if="testBoolean">{{testObj}}</div>
    <scroll class="content">
      {{obj1}}
      {{obj1.name}}
      {{obj2}}
    </scroll>
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
      arr1: []
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
