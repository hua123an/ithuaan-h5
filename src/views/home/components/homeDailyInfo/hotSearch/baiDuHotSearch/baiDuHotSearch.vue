<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="bai-du-hot-search">
    <var-card
        title="百度热搜"
        subtitle="百度一下，你就知道"
        description="百度热搜以数亿用户海量的真实数据为基础，通过专业的数据挖掘方法，计算关键词的热搜指数，旨在建立权威、全面、热门、时效的各类关键词排行榜，引领热词阅读时代。"
        src="https://baidu.com/favicon.ico"
        :ripple="true" layout="row" @click="router.push('/detail/baiduhotsearch')">
    </var-card>
  </div>
</template>

<style scoped>

</style>