<script setup>
import {useRouter} from "vue-router";
// import axios from "axios";
// const getData = () => {
//   const res = axios.get("https://tenapi.cn/v2/weibohot")
//   data.value = res.data.data
// }

const router = useRouter()
</script>

<template>
<van-nav-bar title="微博热搜" @click="router.push('/')" left-text="返回"/>
</template>

<style scoped>

</style>