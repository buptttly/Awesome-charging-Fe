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
                title: '车辆编号',
                dataIndex: 'car_id'
            },
            {
                title: '账单编号',
                dataIndex: 'bill_id',
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
                title: '充电费用（元）',
                dataIndex: 'total_charge_fee'
            },
            {
                title: '服务费用（元）',
                dataIndex: 'total_service_fee'
            },
            {
                title: '总费用（元）',
                dataIndex: 'total_fee'
            },
            {
                title: '启动时间',
                dataIndex: 'start_time'
            },
            {
                title: '停止时间',
                dataIndex: 'end_time'
            },
            {
                title: '详单编号列表',
                dataIndex: 'detail_numbers'
            }
        ]

        // 用于存储表格数据
        const dataSource = reactive([])

        // 执行 HTTP 请求，获取数据
        // 执行 HTTP 请求，获取数据
const fetchData = async () => {
    try {
        const response = await axios.get(process.env.VUE_APP_BACKEND_URL + '/user/checkBill?car_id=' + localStorage.getItem('car_id'))
        const { data } = response.data
        console.log(data)
        const formattedData = data.bills.map(bill => {
            bill.start_time = new Date(bill.start_time).toLocaleString()
            bill.end_time = new Date(bill.end_time).toLocaleString()
            return {
                ...bill
            }
        })
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

<style></style>
