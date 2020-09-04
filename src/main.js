import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "@/assets/styles/main.scss"
import toast from 'components/common/toast'
import VueLazyLoad from 'vue-lazyload'
import moment from "moment";
//时间和时间戳
Vue.prototype.$moment = moment;

Vue.config.productionTip = false
//根据事件总线传递函数
Vue.prototype.$bus = new Vue()
//安装toast插件
Vue.use(toast)

// 使用懒加载插件
Vue.use(VueLazyLoad)
// 使用vant
import {
  Button,
  CellGroup,
  Icon,
  Skeleton,
  List,
  Overlay,
  RadioGroup,
  Radio,
  Cell,
  Field,
  ActionSheet,
  DatetimePicker,
  AddressEdit,
  Area,
  Picker
} from 'vant';
Vue.use(Button)
  .use(CellGroup)
  .use(Icon)
  .use(Skeleton)
  .use(List)
  .use(Overlay)
  .use(RadioGroup)
  .use(Radio)
  .use(Cell)
  .use(Field)
  .use(ActionSheet)
  .use(DatetimePicker)
  .use(AddressEdit)
  .use(Area)
  .use(Picker);
new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
