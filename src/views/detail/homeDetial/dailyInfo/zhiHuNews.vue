<script setup>

import  {useRouter} from "vue-router";
const router = useRouter()
</script>

<template>
  <van-nav-bar title="知乎新闻" @click="router.push('/')" left-text="返回"/>
</template>

<style scoped>

</style>