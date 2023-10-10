<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <div class="loginBox">
    <div class="container">
      <div>
        <div class="title">{{ constant.VUE_APP_NAME }}</div>
        <div class="outBodyBox">
          <div class="loginTips">欢迎登录</div>
          <div class="centerContainer">
            <a-form class="formBox" ref="formRef" :model="formState">
              <a-form-item label="账号" name="username" :colon="false">
                <a-input v-model:value="formState.username" autocomplete="off" placeholder="请输入账号" />
              </a-form-item>
              <a-form-item label="密码" name="password" :colon="false">
                <a-input class="passwordInput" autocomplete="off" v-model:value="formState.password" placeholder="请输入密码" />
              </a-form-item>
              <div class="loginBtn" @click="handleClickLogin">登 录</div>
            </a-form>
          </div>
        </div>
        <div class="copyright">版权所有：{{ constant.VUE_APP_COPYRIGHT }} @ {{ year }}</div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, inject } from "vue"
import { useStore } from "vuex"
import { message } from "ant-design-vue"
import constant from "_constant"
import dayjs from "dayjs"
import AuthApi from "_api/auth"

const routeJump = inject("$routeJump")

const store = useStore()
const formState = ref({})
const loading = ref(false)
const formRef = ref()
const year = dayjs().year()

const handleClickLogin = async () => {
  store.dispatch("auth/login", { userInfo: { name: "管理员 "}, token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwODk0NTQsInVzZXIiOnsiaWQiOiIzOGI1NTcxMDJjZTMxMWVkYmQwZTAwMDAwMDAwMDAwMCIsInVzZXJOYW1lIjoi57O757uf566h55CG5ZGYIiwiZW1haWwiOm51bGwsInVzZXJObyI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiZGVsZXRlRmxhZyI6ZmFsc2V9LCJ1c2VyX25hbWUiOiJhZG1pbiIsImp0aSI6IjA3MDM0OTkyLWQ5MDEtNGEzNS1hMDdlLTg4MDJhYzI5NDkyNCIsImNsaWVudF9pZCI6ImNsaWVudF8yIiwic2NvcGUiOlsic2VydmVyIl19.keCXt1H4fQWC8eUCaAMy52pU9fY9JepdCrX0G--jadx0hZb5hbtIpX6Y1JG1SpmZouS0kcbOuw6xxPuS0IhSi7CbyiT2-a4srTr4XC0gdSUCBWKoiETRXlV4Ekcfx4C-Lea74N6p8CVNTTb18MfeuGH-z523NTSqYGK9YydJPue3YOit_Fek3W7smuTiHdL9CHP4EyeRt9lRNdj4ivFaaSHhj1bw6EeNY562tIZVqTH4GYP6L62IK1T8D08lK5O06nS7YCA1VV0KWAtkVnYq6kJiDBHT1tnpI6n_zqLIuR5FkXQbTQxv39YMQTysN4o3w7NumLTpIixNs4X8mgmLUw" })
  message.success("登录成功！")
  routeJump({ name: "Dashboard" })
  // if(!formState.value.username) {
  //   return message.warning("请输入账号！")
  // }
  // if(!formState.value.password) {
  //   return message.warning("请输入密码！")
  // }
  // try {
  //   loading.value = true
  //   const res = await AuthApi.login(formState.value)
  //   store.dispatch("auth/login", { userInfo: res.data, token: res.data.token })
  //   message.success("登录成功！")
  //   document.body.removeEventListener("keydown", _handleKeyDown)
  //   routeJump({ name: "Dashboard" })
  // } catch(err) {
  //   message.error(`登录失败: ${err}`)
  // } finally {
  //   loading.value = false
  // }
}

const _handleKeyDown = e => {
  if (e.key === "Enter") {
    handleClickLogin()
  }
}

onMounted(() => {
  document.body.addEventListener("keydown", _handleKeyDown)
})
</script>