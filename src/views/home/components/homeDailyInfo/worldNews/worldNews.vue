<script setup>
import {useRouter} from 'vue-router'
const router = useRouter()

</script>

<template>
  <div class="world=news">
    <var-card
        title="世界新闻"
        subtitle="想知道世界上今天都发生了什么大事吗？"
        src="https://v.api.aa1.cn/api/api-fj-1/img/262-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png262-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png"
        :ripple="true" layout="row" @click="router.push('/detail/worldnews')">
    </var-card>
  </div>

</template>

<style scoped>

</style>