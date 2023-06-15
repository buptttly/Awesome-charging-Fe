<template>
    <div class="login_wrap">
        <div class="form_wrap">
            <!-- 用户名+密码 -->
            <el-form ref="formRef" :model="loginData" label-width="100px" class="demo-dynamic">
                <el-form-item prop="username" label="用户名" :rules="[
                    {
                        required: true,
                        message: '此项为必填项',
                        trigger: 'blur',
                    },
                ]">
                    <el-input v-model="loginData.username" />
                </el-form-item>

                <el-form-item prop="password" label="密码" :rules="[
                    {
                        required: true,
                        message: '此项为必填项',
                        trigger: 'blur',
                    },
                ]">
                    <el-input type="password" v-model="loginData.password" />
                </el-form-item>
            </el-form>
            <!-- 登录按钮 -->
            <el-button type="primary" class="login_btn" @click="handleLogin">登录</el-button>
            <!-- <p>{{num}}</p> -->
        </div>
    </div>
</template>
    
<script>

import { reactive, toRefs } from 'vue'
import { useStore } from "vuex"
// import router from '@/router'
import { useRouter } from "vue-router"
import axios from 'axios'
// import {loginApi} from "@/util/request"
export default {
    name: "login",
    setup() {
        const store = useStore()
        const router = useRouter()
        const count = store.state.number.count
        const data = reactive({
            loginData: {
                username: "",
                password: ""
            },
            num: count,
        })

        const handleLogin = () => {
            const loginData = {
                username: data.loginData.username,
                password: data.loginData.password // 假设登录数据中包含密码
            };

            console.log(process.env.VUE_APP_BACKEND_URL)

            axios.post(process.env.VUE_APP_BACKEND_URL + '/user/login', loginData)
                .then(response => {
                    const responseData = response.data;

                    if (responseData.code === 0) {
                        localStorage.setItem("car_id", responseData.data.car_id);
                        localStorage.setItem("user_name", responseData.data.username);
                        store.commit('setUserInfo', responseData.data);
                        router.push({ path: "/user" }); // 跳转到用户主界面
                    } else {
                        // 处理登录失败的情况
                        console.log(responseData.msg); // 输出错误信息
                        alert("用户名或密码错误")
                    }
                })
                .catch(error => {
                    console.error(error);
                });
        };
        // const handleLogin=()=>{
        //     // 请求后台接口
        //     // 默认用户：admin/123456
        //     loginApi(data.loginData).then(res=>{
        //         if(res.data){
        //             store.commit('setUserInfo', res.data);
        //             localStorage.setItem("loginData",JSON.stringify(res.data))
        //             // 跳转/user
        //             router.push({
        //                 path:"/"
        //             })
        //         }
        //     }) 
        // }


        // vuex更改语法
        // console.log("修改前getters",store.getters["number/countStatus"])
        // const handleLogin=()=>{
        //     // store.commit('number/setCount', 100);
        //     store.dispatch('number/setCountPromise', 10).then(res=>{
        //         alert("修改成功")
        //     }).catch(err=>{
        //         alert(err)
        //     });
        //     console.log(store.state.number.count)
        //     console.log("修改后getters",store.getters["number/countStatus"])
        // }

        return {
            ...toRefs(data),
            handleLogin
        }
    }
}
</script>
<style  scoped>
.login_wrap {
    width: 100%;
    height: 100vh;
    background-size: cover;
    position: relative;
    background-image: url(http://img.070077.xyz/202306151718573.jpg);
}

.form_wrap {
    position: fixed;
    top: 15%;
    left: 55%;
    opacity: 1;
}

.login_btn {
    display: block;
    margin: 10px auto;
}
</style>