import { createRouter, createWebHistory } from "vue-router"
import { getStorageItem } from "_utils/storage"
import { AUTH_TOKEN } from "@/store/mutation-types"

import Layout from "@/views/Layout/index.vue"
import Login from "@/views/Login/index.vue"
import Dashboard from "@/views/Dashboard/index.vue"
import operations from "./modules/operations"
import dataAnalysis from "./modules/dataAnalysis"
import others from "./modules/others"

export const routes = [
  { 
    path: "/login", 
    name: "Login",
    component: Login
  },
  { path: "/", redirect: "/app" },
  {
    path: "/app",
    name: "App",
    redirect: "/app/dashboard",
    component: Layout,
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard,
        meta: { title: "首页", icon: "HomeOutlined", index: 0 },
      },
      ...others,
      dataAnalysis,
      operations,
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