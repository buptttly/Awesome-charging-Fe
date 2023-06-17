<template>
  <div class="container">
    <a-form @submit.prevent="submit">
      <a-form-item label="车牌号">
        <a-input v-model:value="car_id" />
      </a-form-item>
      <a-form-item label="充电量 (度)">
        <a-input-number v-model:value="request_amount" />
      </a-form-item>
      <a-form-item label="充电模式">
        <a-select v-model:value="request_mode">
          <a-select-option value="quick">快充</a-select-option>
          <a-select-option value="slow">慢充</a-select-option>
        </a-select>
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
      request_amount: `${0}`,
      request_mode: 'quick'
    }
  },
  methods: {
    async submit() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL + '/user/request', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            car_id: this.car_id,
            request_amount: parseFloat(this.request_amount),
            request_mode: this.request_mode
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
  background-image: url(http://img.070077.xyz/202306151658575.jpg);
  background-size: cover;
  background-position: center;
  background-color: rgba(255, 255, 255, 0.5);
}
</style>
