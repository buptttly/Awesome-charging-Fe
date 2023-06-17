import { createRouter, createWebHashHistory } from 'vue-router'
import LayOut from '../views/LayOut/LayOut'
import store from "../store/index.js"
import { notification } from 'ant-design-vue';

const routes = [
  //登录
  {
    path: "/user/login",
    name: "login",
    component: () => import("../views/pages/login.vue")
  },
  //各个pages
  {
    path: "/",
    name: "layout",
    component: LayOut,
    //子路由
    children: [
      {
        path: '/index',
        name: 'index',
        component: () => import("../views/pages/rolesList.vue")
      },
      {
        path: '/user',
        name: 'user',
        component: () => import("../views/pages/usersList.vue")
      },
      {
        path: '/submitChargeRequest',
        name: 'submitChargeRequest',
        component: () => import("../views/pages/submitChargeRequest.vue")
      },
      {
        path: '/modifyAmount',
        name: 'modifyAmount',
        component: () => import("../views/pages/modifyAmount.vue")
      },
      {
        path: '/chMode',
        name: 'chMode',
        component: () => import("../views/pages/chMode.vue")
      },
      {
        path: '/startCharging',
        name: 'startCharging',
        component: () => import("../views/pages/startCharging.vue")
      },
      {
        path: '/stopCharging',
        name: 'stopCharging',
        component: () => import("../views/pages/stopCharging.vue")
      },
      {
        path: '/checkBill',
        name: 'checkBill',
        component: () => import("../views/pages/checkBill.vue")
      }
      // ,
      // {
      //   path: '/checkBill',
      //   name: 'stopCharging',
      //   component: () => import("../views/pages/stopCharging.vue")
      // }
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})
//路由守卫
router.beforeEach((to, from, next) => {
  if (to.path === '/user') {
    const userName = sessionStorage.getItem('user_name');
    const wsUrl = process.env.VUE_APP_WS_URL + `/ws/${userName}`;
    const ws = new WebSocket(wsUrl);

    ws.onopen = () => {
      console.log('WebSocket连接已打开');
};

    ws.onmessage = (event) => {
      const message = event.data;
      console.log('收到消息:', message);
      // 显示通知
      notification.open({
        message: '新的WebSocket消息',
        description: message,
      });
    };

    ws.onerror = (error) => {
      console.log('WebSocket错误:', error);
    };

    ws.onclose = () => {
      console.log('WebSocket连接已关闭');
    };
  }

  const uInfo = store.state.uInfo.userInfo;
  if (!uInfo.username) {
    if (to.path === '/user/login') {
      next();
      return;
    }
    next('/user/login');
  } else {
    next();
  }
});

export default router
