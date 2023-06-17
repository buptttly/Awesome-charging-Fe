<template>
  <div class='container'>
    <!-- <form @submit.prevent="submit">
      <div>
        <label for="car_id">车牌号</label>
        <input type="text" id="car_id" v-model="car_id" />
      </div>
      <div>
        <button type="submit">提交请求</button>
      </div>
    </form> -->

    <a-form @submit.prevent="submit">
      <a-form-item label="车牌号">
        <a-input v-model:value="car_id" />
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
      car_id: sessionStorage .getItem("car_id")
    }
  },
  methods: {
    async submit() {
      try {
        const response = await fetch(process.env.VUE_APP_BACKEND_URL + '/startCharging', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            car_id: this.car_id
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
