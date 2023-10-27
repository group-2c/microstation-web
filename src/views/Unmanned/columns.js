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
    { title: "微站控制器名称", dataIndex: "controllerName", align: "left", width: 120, ellipsis: true },    
    { title: "微站控制器ID", dataIndex: "controllerId", align: "left", width: 120, ellipsis: true },
    { title: "设备名称", dataIndex: "name", align: "left", width: 120 },
    { title: "设备ID", dataIndex: "id", align: "left", width: 120 },
    { title: "设备地址", dataIndex: "ip", align: "left", width: 120 },
    { title: "波特率", dataIndex: "baudRate", align: "left", width: 120 },
    { title: "数据位", dataIndex: "dataBit", align: "left", width: 120 },
    { title: "停止位", dataIndex: "stopBit", align: "left", width: 120 },
    { title: "奇偶校验", dataIndex: "baudRate", align: "left", width: 120 },
    { title: "设备状态", dataIndex: "status", align: "left", width: 120 },
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