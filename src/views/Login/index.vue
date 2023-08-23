<style lang="less" scoped>
 @import url("./index.less");
</style>

<template>
  <a-button @click="handleClickLogin" type="primary">登陆</a-button>
</template>

<script setup>
// import { computed } from "vue"
import { useStore } from "vuex"
import { message } from "ant-design-vue"
import { useRouter } from "vue-router"

const store = useStore()
const router = useRouter()

const handleClickLogin = () => {
  store.dispatch("auth/login", { userInfo: { name: "管理员 "}, token: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2OTIwODk0NTQsInVzZXIiOnsiaWQiOiIzOGI1NTcxMDJjZTMxMWVkYmQwZTAwMDAwMDAwMDAwMCIsInVzZXJOYW1lIjoi57O757uf566h55CG5ZGYIiwiZW1haWwiOm51bGwsInVzZXJObyI6ImFkbWluIiwiZW5hYmxlZCI6dHJ1ZSwiZGVsZXRlRmxhZyI6ZmFsc2V9LCJ1c2VyX25hbWUiOiJhZG1pbiIsImp0aSI6IjA3MDM0OTkyLWQ5MDEtNGEzNS1hMDdlLTg4MDJhYzI5NDkyNCIsImNsaWVudF9pZCI6ImNsaWVudF8yIiwic2NvcGUiOlsic2VydmVyIl19.keCXt1H4fQWC8eUCaAMy52pU9fY9JepdCrX0G--jadx0hZb5hbtIpX6Y1JG1SpmZouS0kcbOuw6xxPuS0IhSi7CbyiT2-a4srTr4XC0gdSUCBWKoiETRXlV4Ekcfx4C-Lea74N6p8CVNTTb18MfeuGH-z523NTSqYGK9YydJPue3YOit_Fek3W7smuTiHdL9CHP4EyeRt9lRNdj4ivFaaSHhj1bw6EeNY562tIZVqTH4GYP6L62IK1T8D08lK5O06nS7YCA1VV0KWAtkVnYq6kJiDBHT1tnpI6n_zqLIuR5FkXQbTQxv39YMQTysN4o3w7NumLTpIixNs4X8mgmLUw" })
  message.success("登录成功！")
  router.push({ path: "/" })
}
</script>