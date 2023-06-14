<template>

<div class="common-layout">
    <el-container>
        <!-- 头部 -->
        <el-header class="common-header flex-float"> 
            <div class="flex">
                <img class="logo" src="../../assets/logo.png" alt="">
                <h1 class="title">用户系统</h1>
            </div>  
            <el-button type="danger">退出</el-button>
        </el-header>
      <!-- 主容器 -->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside class="common-aside" width="200px">
                <el-menu
                    background-color="none"
                    text-color="#fff"
                    :router="true"
                >
                    <el-sub-menu index="1">
                        <template #title> 
                            <el-icon><Van /></el-icon>
                            <span>录入车辆信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/user">
                                <el-icon><Bicycle /></el-icon>
                                <span>车辆信息</span>
                            </el-menu-item> 
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="2">
                        <template #title>
                            <el-icon><Box /></el-icon>
                            <span>录入充电信息</span>
                        </template>
                        <el-menu-item-group>                        
                            <el-menu-item index="/user">
                                <el-icon><Connection /></el-icon>
                                <span>录入充电方式</span>
                            </el-menu-item> 
                            <el-menu-item index="/user">
                                <el-icon><Odometer /></el-icon>
                                <span>录入充电电量</span>
                            </el-menu-item> 
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="3">
                        <template #title>
                            <el-icon><ChatRound /></el-icon>
                            <span>变更充电信息</span>
                        </template>
                        <el-menu-item-group>                        
                            <el-menu-item index="/user">
                                <el-icon><Connection /></el-icon>
                                <span>变更充电方式</span>
                            </el-menu-item> 
                            <el-menu-item index="/user">
                                <el-icon><Odometer /></el-icon>
                                <span>变更充电电量</span>
                            </el-menu-item> 
                        </el-menu-item-group>             
                    </el-sub-menu>
                    <el-sub-menu index="4">
                        <template #title>
                            <el-icon><Upload /></el-icon>
                            <span>显示排队信息</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/user">
                                <el-icon><UploadFilled /></el-icon>
                                <span>排队信息</span>
                            </el-menu-item> 
                        </el-menu-item-group>
                    </el-sub-menu>
                    <el-sub-menu index="5">
                        <template #title>
                            <el-icon><CloseBold /></el-icon>
                            <span>故障处理</span>
                        </template>
                        <el-menu-item-group>
                            <el-menu-item index="/index">
                                <el-icon><CircleCloseFilled /></el-icon>
                                <span>显示故障</span>
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
    export default{
        name:"layout"
    }
</script>

<style>
    .el-container{
        height: 100vh;
        overflow: hidden;
    }
    .common-header{
        background: rgb(39, 45, 53); 
        display: flex;
    } 
    .common-aside{
        background: rgb(48, 55, 65);
    }    
    .logo{
        width: 60px;
    }
    .title{
        color: #fff;
    }
    /* .el-main{
        background: #efefef;
    } */
    
    
    
</style>