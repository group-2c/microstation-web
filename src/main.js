import { createApp } from "vue"
import * as L from "leaflet"
import Antd from "ant-design-vue"
import router from "./router"
import store  from "./store"
import App from "./App.vue"
import icon from "leaflet/dist/images/marker-icon.png"
import iconShadow from "leaflet/dist/images/marker-shadow.png"
import XDescriptions from "_components/Descriptions/index.vue"
import BasicListLayout from "_components/BasicListLayout/index.vue"
import "ant-design-vue/dist/reset.css"
import "@/assets/styles/common.less"
import "leaflet/dist/leaflet.css"

import { pageReload, routeJump } from "@/router"

L.Marker.prototype.options.icon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [15, 50]
})

const app = createApp(App)
.use(router)
.use(store)
.use(Antd)

app.config.globalProperties.$routeJump = routeJump
app.provide("$routeJump", routeJump)
app.component("XDescriptions", XDescriptions)
app.component("BasicListLayout", BasicListLayout)

pageReload()

app.mount("#app")
