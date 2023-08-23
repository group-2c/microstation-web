import { createRouter, createWebHistory } from "vue-router"
import { getStorageItem } from "_utils/storage"
import { AUTH_TOKEN } from "@/store/mutation-types"
import Login from "@/views/Login/index.vue"
import Dashboard from "@/views/Dashboard/index.vue"

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
    children: [
      {
        path: "dashboard",
        name: "Dashboard",
        component: Dashboard
      }
    ]
  },
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