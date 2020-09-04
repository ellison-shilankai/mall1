<template>
  <div class="my-details" :style="{ height: clientHeight + 'px' }">
    <div class="my_setting-item item-extra-height">
      <span class="my_setting-title title-18">头像</span>
      <div class="my_setting-content">
        <img :src="this.info.avatarUrl" class="my_setting-avatar" />
        <van-icon name="arrow" class="my_setting-more" />
        <!-- <i class="iconfont iconfangxiang my_setting-more"></i> -->
      </div>
    </div>
    <van-field v-model="info.nickname" input-align="right" label="昵称" :placeholder="info.nickname" />
    <div class="line-gray"></div>
    <van-field
      v-model="info.sex"
      input-align="right"
      label="性别"
      :placeholder="info.sex"
      right-icon="arrow my_setting-more-special"
      @click="sexCancel"
    />
    <van-action-sheet v-model="show.sex">
      <van-picker show-toolbar :columns="Sexcolumns" @confirm="sexConfirm" @cancel="sexCancel" />
    </van-action-sheet>

    <van-field
      input-align="right"
      v-model="info.showBirthday"
      :value="value"
      label="生日"
      :placeholder="info.showBirthday"
      right-icon="arrow my_setting-more-special"
      @click="birthCancel"
    />
    <van-action-sheet v-model="show.birthday">
      <van-datetime-picker
        v-model="birthtDate"
        type="date"
        title="选择年月日"
        :min-date="minDate"
        :max-date="maxDate"
        @confirm="birthConfirm"
        @cancel="birthCancel"
      />
    </van-action-sheet>

    <van-field
      v-model="info.area"
      input-align="right"
      :value="value"
      label="地区"
      :placeholder="info.area"
      right-icon="arrow my_setting-more-special"
      @click="areaCancel"
    />
    <van-action-sheet v-model="show.area">
      <van-area
        title="选择地区"
        :area-list="areaList"
        value
        @confirm="areaConfirm"
        @cancel="areaCancel"
      />
    </van-action-sheet>

    <!-- <div class="my_setting-keep" @click="keepData">保存</div> -->
  </div>
</template>

<script>
import { arealist } from "@/utils/arealist";
export default {
  name: "my-details",
  data() {
    return {
      info: {
        avatar: "@/assets/images/test.jpg",
        nickname: "酷酷宝",
        sex: "",
        birthday: "",
        showBirthday: "",
        area: "",
        province: "",
        city: ""
      },
      sex: [" ", "男", "女"],
      Sexcolumns: ["男", "女"],
      show: {
        sex: false,
        nickname: false,
        birthday: false,
        area: false
      },
      value: "",
      minDate: new Date(1900, 1, 1),
      maxDate: new Date(),
      birthtDate: new Date(),
      areaList: arealist,
      clientHeight: 800
    };
  },
  methods: {
    sexCancel() {
      this.show.sex = !this.show.sex;
    },
    sexConfirm(value) {
      this.info.sex = value;
      this.show.sex = false;
    },
    birthConfirm() {
      this.info.showBirthday = this.formatDate(this.birthtDate);
      this.info.birthday = this.getTime(this.info.showBirthday) / 1000;
      this.show.birthday = false;
    },
    formatDate(date) {
      return `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`;
    },
    birthCancel() {
      this.show.birthday = !this.show.birthday;
    },
    areaConfirm(val) {
      this.info.province = val[0].name;
      this.info.city = val[1].name;
      if (this.info.province === this.info.city) {
        this.info.area = this.info.city;
      } else this.info.area = this.info.province + " " + this.info.city;
      this.show.area = false;
    },
    areaCancel() {
      this.show.area = !this.show.area;
    },
    keepData() {
      // if (!this.info.avatarUrl) {
      //   this.$toast("头像不能为空");
      //   return;
      // }
      if (!this.info.nickname) {
        this.$toast("昵称不能为空");
        return;
      }
    },
    //日期转换为时间戳
    getTime(time) {
      return this.$moment(time).valueOf();
    },
    //将时间戳转换为日期
    timestampToTime(timestamp) {
      return this.$moment(Number(timestamp) * 1000).format("YYYY/MM/DD");
    }
  }
};
</script>

<style>
</style>