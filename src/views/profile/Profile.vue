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
      obj3: {}
    };
  },
  computed: {
    ...mapState(["testBoolean", "testObj"])
  },
  created() {
    // this.changeStatus(false);
    this.obj2 = this.clone(this.obj1);
    this.obj3 = this.deepClone(this.obj1);
    this.obj1.name = "小红";
  },
  methods: {
    ...mapActions(["changeStatus"]),
    clone(origin) {
      return Object.assign({}, origin);
    },
    deepClone(origin) {
      let originProto = Object.getPrototypeOf(origin);
      return Object.assign(Object.create(originProto), origin);
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
