import { createApp } from "vue"
import Antd from "ant-design-vue"
import router from "./router"
import store  from "./store"
import App from "./App.vue"

import "ant-design-vue/dist/reset.css"
import "@/assets/styles/common.less"

import { pageReload, routeJump } from "@/router"

const app = createApp(App)
.use(router)
.use(store)
.use(Antd)

app.config.globalProperties.$routeJump = routeJump
app.provide('$routeJump', routeJump)

pageReload()

app.mount("#app")
