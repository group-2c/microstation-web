import { createRouter, createWebHistory } from "vue-router"
import { getStorageItem } from "_utils/storage"
import { AUTH_TOKEN } from "@/store/mutation-types"
import Login from "@/views/Login/index.vue"
import Layout from "@/views/Layout/index.vue"
import Dashboard from "@/views/Dashboard/index.vue"
import User from "@/views/operations/User/index.vue"
import Controller from "@/views/operations/Controller/index.vue"
import TemperatureEquipment from "@/views/operations/TemperatureEquipment/index.vue"
import TemperatureEquipmentValue from "@/views/operations/TemperatureEquipmentValue/index.vue"
import WaterImmersionSensor from "@/views/operations/WaterImmersionSensor/index.vue"
import WaterImmersionSensorValue from "@/views/operations/WaterImmersionSensorValue/index.vue"

export const routes = [
  { 
    path: "/login", 
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Index",
    redirect: "/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      }
    ]
  },
  {
    path: "/operations/",
    name: "Operations",
    component: Layout,
    redirect: "/operations/user",
    children: [
      {
        path: "user",
        name: "User",
        component: User,
      },
      {
        path: "controller",
        name: "Controller",
        component: Controller,
      },
      {
        path: "temperatureEquipment",
        name: "TemperatureEquipment",
        component: TemperatureEquipment,
      },
      {
        path: "temperatureEquipmentValue",
        name: "TemperatureEquipmentValue",
        component: TemperatureEquipmentValue,
      },
      {
        path: "waterImmersionSensor",
        name: "WaterImmersionSensor",
        component: WaterImmersionSensor,
      },
      {
        path: "waterImmersionSensorValue",
        name: "WaterImmersionSensorValue",
        component: WaterImmersionSensorValue,
      }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, _, next) => {
  const storageToken = getStorageItem({ key: AUTH_TOKEN, isJson: false })
  const whiteList = ["/login"]

  if (storageToken) {
    if (to.path === "/login") {
      next({ path: "/" })
    } else {
      next()
    }
  } else {
    if (whiteList.indexOf(to.path) !== -1) {
      next()
    } else {
      next("/login")
    }
  }
})

export default router