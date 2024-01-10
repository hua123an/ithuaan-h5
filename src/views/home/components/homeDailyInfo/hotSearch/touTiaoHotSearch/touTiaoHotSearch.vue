<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="tou-tiao-hot-search">
    <var-card
        title="头条热搜"
        description="今日头条是一个通用信息平台，致力于连接人与信息，让优质丰富的信息得到高效精准的分发，促使信息创造价值。"
        src="//sf3-cdn-tos.douyinstatic.com/obj/eden-cn/uhbfnupkbps/toutiao_favicon.ico"
        :ripple="true" layout="row" @click="router.push('/detail/toutiaohotsearch')">
    </var-card>
  </div>


</template>

<style scoped>

</style>