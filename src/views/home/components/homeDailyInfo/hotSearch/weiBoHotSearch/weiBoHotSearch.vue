<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="wei-bo-hot-search">
    <var-card
        title="微博热搜"
        subtitle='微博 – 随时随地发现新鲜事'
        src="https://weibo.com/favicon.ico"
        :ripple="true" layout="row" @click="router.push('/detail/weibohotsearch')">
    </var-card>
  </div>


</template>

<style scoped>

</style>