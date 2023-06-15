<template>
    <div>
        <h1>修改充电量</h1>
        <form @submit.prevent="submit">
            <div>
                <label for="car_id">车牌号</label>
                <input type="text" id="car_id" v-model="car_id" />
            </div>
            <div>
                <label for="request_mode">充电模式</label>
                <select id="request_mode" v-model="request_mode">
                    <option value="quick">快充</option>
                    <option value="slow">慢充</option>
                </select>
            </div>
            <div>
                <button type="submit">提交请求</button>
            </div>
        </form>
    </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
    data() {
        return {
            car_id: '',
            request_mode: 'quick'
        }
    },
    methods: {
        async submit() {
            try {
                const response = await fetch('http://localhost:6480/user/chMode', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        car_id: this.car_id,
                        request_amount: parseFloat(this.request_amount)
                    })
                })

                const data = await response.json()
                if (data && data.code === 0) {
                    message.success('请求成功')
                    console.log(data.data)
                } else {
                    message.error(data.msg || '请求失败')
                }
            } catch (error) {
                message.error(error.message || '请求失败')
            }
        }
    }
}
</script>

<style scoped>
.container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}
</style>
