
<template>
  <div>
    <a-table :columns="columns" :data-source="dataSource"></a-table>
  </div>
</template>
  
<script>
import { reactive, onMounted } from 'vue'
import axios from 'axios'

export default {
  setup() {
    // 用于存储表格列的信息
    const columns = [
      {
        title: '车辆ID',
        dataIndex: 'car_id'
      },
      {
        title: '日期',
        dataIndex: 'date'
      },
      {
        title: '订单ID',
        dataIndex: 'order_id'
      },
      {
        title: '账单ID',
        dataIndex: 'bill_id',
      },
      {
        title: '充电桩ID',
        dataIndex: 'pile_id',
      },
      {
        title: '充电量',
        dataIndex: 'charge_amount'
      },
      {
        title: '充电时长',
        dataIndex: 'charge_duration'
      },
      {
        title: '开始时间',
        dataIndex: 'start_time'
      },
      {
        title: '结束时间',
        dataIndex: 'end_time'
      },
      {
        title: '充电费用',
        dataIndex: 'total_charge_fee'
      },
      {
        title: '服务费用',
        dataIndex: 'total_service_fee'
      },
      {
        title: '合计费用',
        dataIndex: 'total_fee'
      }
    ]

    // 用于存储表格数据
    const dataSource = reactive([])

    // 执行 HTTP 请求，获取数据
    const fetchData = async () => {
      try {
        const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/user/checkBill?car_id=tt6')
        const { data } = response.data
        const formattedData = data.bills
        dataSource.push(...formattedData)
      } catch (error) {
        console.error(error)
      }
    }

    // 在组件挂载后执行一次 HTTP 请求
    onMounted(fetchData)

    // 返回需要在模板中使用的数据和方法
    return {
      columns,
      dataSource,
    }
  },
}
</script>
  
