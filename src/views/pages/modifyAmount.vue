<template>
    <div class="container">
        <!-- <h1>修改充电量</h1> -->
        <!-- <form @submit.prevent="submit">
            <div>
                <label for="car_id">车牌号</label>
                <input type="text" id="car_id" v-model="car_id" />
            </div>
            <div>
                <label for="request_amount">充电量 (度)</label>
                <input type="number" id="request_amount" v-model="request_amount" />
            </div>
            <div>
                <button type="submit">提交请求</button>
            </div>
        </form> -->

        <a-form @submit.prevent="submit">
            <a-form-item label="车牌号">
                <a-input v-model:value="car_id" />
            </a-form-item>
            <a-form-item label="充电量 (度)">
                <a-input-number v-model:value="request_amount" />
            </a-form-item>
            <a-form-item>
                <a-button type="primary" html-type="submit">提交请求</a-button>
            </a-form-item>
        </a-form>
    </div>
</template>

<script>
import { message } from 'ant-design-vue'

export default {
    data() {
        return {
            car_id: sessionStorage.getItem('car_id'),
            request_amount: `${0}`
        }
    },
    methods: {
        async submit() {
            try {
                const response = await fetch(process.env.VUE_APP_BACKEND_URL + '/user/modifyAmount', {
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

