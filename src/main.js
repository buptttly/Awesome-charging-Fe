import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'


import Antd from 'ant-design-vue';
import { DownOutlined } from '@ant-design/icons-vue';

import 'ant-design-vue/dist/antd.css';


const app =createApp(App)
// element icon 注册
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }
app.use(store).use(router).use(Antd).use(ElementPlus).mount('#app')
