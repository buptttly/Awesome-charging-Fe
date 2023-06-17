<template>
  <div class="common-layout">
    <el-container>
      <!-- 头部 -->
      <el-header class="common-header flex-float">
        <div class="flex">
          <img class="logo" src="http://img.070077.xyz/202306152017798.png" @click="goToWebsite2" alt="" />
          <h1 class="title">用户系统</h1>
          <span class="current-time">{{ currentTime }}</span>
        </div>
        <el-button type="danger" @click="goToWebsite">退出</el-button>
      </el-header>
      <!-- 主容器 -->
      <el-container>
        <!-- 侧边栏 -->
        <el-aside class="common-aside" width="200px">
          <el-menu background-color="none" text-color="#fff" :router="true" default-active="/user"
            :default-openeds="['1', '2', '3', '4']">
            <el-sub-menu index="1">
              <template #title>
                <el-icon>
                  <Van />
                </el-icon>
                <span>查看信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user">
                  <el-icon>
                    <Bicycle />
                  </el-icon>
                  <span>车辆信息</span>
                </el-menu-item>
                <el-menu-item index="/checkBill">
                  <el-icon>
                    <Bicycle />
                  </el-icon>
                  <span>账单信息</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="2">
              <template #title>
                <el-icon>
                  <Box />
                </el-icon>
                <span>充电</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/submitChargeRequest">
                  <el-icon>
                    <Connection />
                  </el-icon>
                  <span>提交充电请求</span>
                </el-menu-item>
                <el-menu-item index="/startCharging">
                  <el-icon>
                    <Odometer />
                  </el-icon>
                  <span>开始充电</span>
                </el-menu-item>
                <el-menu-item index="/stopCharging">
                  <el-icon>
                    <Odometer />
                  </el-icon>
                  <span>结束充电</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="3">
              <template #title>
                <el-icon>
                  <ChatRound />
                </el-icon>
                <span>变更充电信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/chMode">
                  <el-icon>
                    <Connection />
                  </el-icon>
                  <span>变更充电方式</span>
                </el-menu-item>
                <el-menu-item index="/modifyAmount">
                  <el-icon>
                    <Odometer />
                  </el-icon>
                  <span>变更充电电量</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
            <el-sub-menu index="4">
              <template #title>
                <el-icon>
                  <Upload />
                </el-icon>
                <span>显示排队信息</span>
              </template>
              <el-menu-item-group>
                <el-menu-item index="/user">
                  <el-icon>
                    <UploadFilled />
                  </el-icon>
                  <span>排队信息</span>
                </el-menu-item>
              </el-menu-item-group>
            </el-sub-menu>
          </el-menu>
        </el-aside>
        <!-- 主体部分 -->
        <el-main>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
  
<script>
import { ref, onMounted } from 'vue';
import axios from 'axios';

export default {
  setup() {
    const openedMenus = ref(['1', '2', '3', '4']);

    function updateOpenedMenus(value) {
      openedMenus.value = value;
    }

    function goToWebsite() {
      window.location.href = 'https://sr.mihoyo.com/';
    }

    function goToWebsite2() {
      window.open('https://www.bilibili.com/video/BV1fV411W7Ss', '_blank');
    }

    const currentTime = ref('');

    // async function getTimeNow() {
    //   try {
    //     const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/timeNow');
    //     const timestamp = response.data.data.timestamp;
    //     currentTime.value = timestamp;
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }

    async function getTimeNow() {
  try {   
    if (process.env.VUE_APP_BACKEND_URL === 'https://smartcharge.byr.cool') {
      currentTime.value = '2023-06-17 13:11:08'; // 任意一固定值
    } else {
      const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/timeNow');
      const timestamp = response.data.data.timestamp + 16*60*60*1000;
      currentTime.value = timestamp;
    }
  } catch (error) {
    console.error(error);
  }
}


    onMounted(() => {
      getTimeNow();

      // 定时器以60倍速率更新时间
      setInterval(() => {
        const timestamp = Date.parse(currentTime.value);
        const newTimestamp = timestamp + 60000;
        currentTime.value = new Date(newTimestamp).toString();
      }, 1000);
    });


    return {
      openedMenus,
      updateOpenedMenus,
      goToWebsite,
      goToWebsite2,
      currentTime,
    };
  },
}
</script>
  
<style>
.el-container {
  height: 100vh;
  overflow: hidden;
}

.common-header {
  background: rgb(39, 45, 53);
  display: flex;
}

.common-aside {
  background: rgb(48, 55, 65);
}

.logo {
  width: 60px;
}

.title {
  color: #fff;
}

.current-time {
  color: red; /* 修改时间的颜色为红色 */
}

/* .el-main{
          background: #efefef;
      } */
</style>
  