import Toast from "@/components/common/toast/Toast";
import Vue from 'vue'

export default {
  install: () => {
    //1. 手动创作构造器
    let toastConstrustor = Vue.extend(Toast);
    //2. 创建组件对象
    let toast = new toastConstrustor();
    //3. 手动挂载
    toast.$mount(document.createElement('div'));
    //4. 添加 body
    document.body.appendChild(toast.$el);

    Vue.prototype.$toast = toast;
  }
}
