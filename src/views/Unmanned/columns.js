/*
 * @author: zzp
 * @date: 2023-10-20 14:50:20
 * @fileName: columns.js
 * @filePath: src/views/Unmanned/columns.js
 * @description: 设备表格列
 */

export default {
  common: [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1 },    
    { title: "柜 号", dataIndex: "name", align: "left", width: 150, ellipsis: true },    
    { title: "名 称", dataIndex: "slaveId", align: "left", width: 150, ellipsis: true },
    { title: "型 号", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "端口号", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "V3端口号", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "地址", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "通讯速率", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "回路名称", dataIndex: "baudRate", align: "left", width: 150 },
    { title: "数据分析与应用", dataIndex: "baudRate", align: "left", width: 150 },
  ],
  accessControlController: [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1 },    
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true },    
    { title: "IP地址", dataIndex: "ip", align: "left", width: 250, ellipsis: true },
    { title: "状态", dataIndex: "status", align: "left", width: 250, ellipsis: true },
  ],
  camera: [
    { title: "序 号", dataIndex: "index", align: "center",  width: 80, customRender: data => data.index + 1 },    
    { title: "设备名称", dataIndex: "name", align: "left", width: 250, ellipsis: true },    
    { title: "IP地址", dataIndex: "ip", align: "left", width: 250, ellipsis: true },
    { title: "类 型", dataIndex: "typeName", align: "left", width: 250, ellipsis: true },
    { title: "状态", dataIndex: "status", align: "left", width: 250, ellipsis: true },
  ]
}