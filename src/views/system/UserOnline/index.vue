/*
 * @author: zzp
 * @date: 2023-12-06 16:28:04
 * @fileName: index.vue
 * @filePath: src/views/system/UserOnline/index.vue
 * @description: 用户在线
 */
<template>
  <div class="parcel">
    <a-spin :spinning="dataCenter.loading" >
      <a-page-header class="pageHeader" title="用户在线列表">
        <template #extra> 
          <div class="headerImportant">在线人数: <span>{{ dataCenter.pagination.total }}</span></div>
        </template>
      </a-page-header>
      <div class="searchContainer">
        <a-row justify="space-between">
          <a-col></a-col>
          <a-col>
            <a-input-search
              v-model:value="dataCenter.searchForm.name"
              class="searchBox"
              placeholder="模糊搜索"
              enter-button
              size="large"
              @search="handleSearch"
            />
          </a-col>
        </a-row> 
      </div>
      <div class="contentContainer">
        <a-table 
          row-key="id"
          :columns="columns"
          :data-source="dataCenter.tableList" 
          :pagination="dataCenter.pagination"
          :scroll="{ y: 'calc(100vh - 410px)', x: 'max-content' }"
          @change="handleTableChange"
        >
          <template #bodyCell="{ column }">
            <template v-if="column.dataIndex === 'status'">
              <a-tag color="success">在线</a-tag>
            </template>
          </template>
        </a-table>
      </div>
    </a-spin>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue"
  import { message } from "ant-design-vue"
  import Lodash from "lodash"
  import loginInfoApi from "_api/loginInfo"

  const dataDefault = {
    loading: false,
    tableList: [],
    searchForm: {},
    pagination: {
      total: 0,
      current: 1,
      pageSize: 10,
      showSizeChanger: true,
      pageSizeOptions: ["10", "20", "30", "40", "50", "100", "200", "500", "1000"],
      showTotal: total => `共有 ${total} 条数据`
    }
  }

  const dataCenter = ref(Lodash.cloneDeep(dataDefault))

  const columns = ref([  
    { title: "序 号", dataIndex: "index", align: "center", width: 80, customRender: data => data.index + 1, fixed: "left" },
    { title: "用户名", dataIndex: "username", align: "left" },    
    { title: "登录IP", dataIndex: "ip", align: "left" },
    { title: "登录城市", dataIndex: "address", align: "left" },
    { title: "登录时间", dataIndex: "loginTime", align: "left" },
    { title: "在线状态", dataIndex: "status", align: "center" }
  ])

  const _getTableList = async () => {
    dataCenter.value.loading = true

    const { searchForm, pagination } = dataCenter.value
    const { current, pageSize } = pagination
    const data = { ...searchForm, page: current, size: pageSize }
    try {
      const res = await loginInfoApi.getOnlineInfo(data)
      dataCenter.value.tableList = res.content || []
      dataCenter.value.pagination.total = res.totalElements
      dataCenter.value.pagination.current = res.number
    } catch(err) {
      message.error("获取用户在线数据失败: " + err)
    } finally {
      dataCenter.value.loading = false
    }
  }

  const handleSearch = () => {
    dataCenter.value.pagination.current = 1
    _getTableList()
  }

  const handleTableChange = pagination => {
    dataCenter.value.pagination.current = pagination.current
    dataCenter.value.pagination.pageSize = pagination.pageSize
    _getTableList()
  }

  onMounted(() => {
    _getTableList()
  })
</script> 