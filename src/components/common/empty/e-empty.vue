<template>
  <div class="e-empty" :style="{ marginTop: top + '%' }">
    <img class="e-empty__img" src="@/assets/images/empty.png" />
    <p class="e-empty__text">{{ text }}</p>
  </div>
</template>

<script>
export default {
  components: {},
  props: {
    text: {
      type: String,
      default: "暂无数据"
    },
    top: {
      type: Number,
      default: 10
    }
  },
  data() {
    return {};
  },
  computed: {},
  watch: {},
  created() {},
  methods: {}
};
</script>
