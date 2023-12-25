import { createRouter, createWebHashHistory } from "vue-router"
import { getStorageItem, setStorageItem, removeStorageItem } from "_utils/storage"
import { AUTH_TOKEN, MENU_OPEN_KYES, MENU_SELECTED_KEYS } from "@/store/mutation-types"
import { getThreeNameParents, sendHeartBeat } from "_utils/function"
import { message } from "ant-design-vue"
import store from "@/store"
import Lodash from "lodash"
import Layout from "@/views/Layout/index.vue"
import Login from "@/views/Login/index.vue"
import Dashboard from "@/views/Dashboard/index.vue"
import operations from "./modules/operations"
import equipments from "./modules/equipments"
import dataAnalysis from "./modules/dataAnalysis"
import systems from "./modules/systems"
import siteMonitoring from "./modules/siteMonitoring"
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
        meta: { title: "首页", index: 0, disableBreadcrumb: true },
      },
      ...others,
      dataAnalysis,
      operations,
      equipments,
      siteMonitoring,
      systems
    ]
  }
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
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

/**
 * 路由跳转
 * @param {*} param0 
 * @returns 
 */
export const routeJump = ({
  name,
  query = undefined,
}) => {
  const data = { name }
  if(query) data.query = query
  const routeList = getThreeNameParents(Lodash.cloneDeep(routes), name)

  removeStorageItem({ key: MENU_OPEN_KYES })
  removeStorageItem({ key: MENU_SELECTED_KEYS })

  if(!routeList || routeList.length === 0) {
    return message.error("路由错误！")
  } else {
    const owns = store.state.auth.owns
    if(!owns.find(x => x.name === name)) {
      return message.error("没有页面访问权限！")
    }
    if(routeList.length > 1) {
      setStorageItem({ key: MENU_OPEN_KYES, value: [routeList[1].name] })
    }
    setStorageItem({ key: MENU_SELECTED_KEYS, value: [name] })
    router.push(data)
  }
}

/**
 * 页面重载
 */
export const pageReload = () => {
  const locHash = window.location.hash.split("/")
  const currentURLs = locHash.map(item => item.split("?")[0])

  removeStorageItem({ key: MENU_OPEN_KYES })
  removeStorageItem({ key: MENU_SELECTED_KEYS })

  if(currentURLs.length === 3) {
    setStorageItem({ key: MENU_SELECTED_KEYS, value: [ Lodash.upperFirst(currentURLs[currentURLs.length - 1]) ] })
  }
  else if(currentURLs.length === 4) {
    setStorageItem({ key: MENU_OPEN_KYES, value: [ Lodash.upperFirst(currentURLs[currentURLs.length - 2]) ] })
    setStorageItem({ key: MENU_SELECTED_KEYS, value: [ Lodash.upperFirst(currentURLs[currentURLs.length - 1]) ] })
  }

  sendHeartBeat()
}

/**
 * 获取页面权限
 * @returns 
 */
export const getPermissions = () => {
  const name = router.currentRoute.value.name
  const owns = store.state.auth.owns
  const item = owns.find(x => x.name === name)
  if(!item) {
    message.error("没有页面访问权限！")
    router.push({ name: "Dashboard" })
    setTimeout(() => {
      location.reload()
    }, 1000)
  }
  return item?.permissions || {}
}


export default router