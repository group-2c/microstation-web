import { createApp } from "vue"
import Antd from "ant-design-vue"
import router from "./router"
import store  from "./store"
import App from "./App.vue"

import "ant-design-vue/dist/reset.css"
import "@/assets/styles/common.less"

const app = createApp(App)
.use(router)
.use(store)
.use(Antd)

app.mount("#app")
