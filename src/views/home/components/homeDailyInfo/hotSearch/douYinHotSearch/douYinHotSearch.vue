<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <var-card
      title="抖音热搜"
      subtitle="抖音-记录美好生活"
      description="抖音让每一个人看见并连接更大的世界，鼓励表达、沟通和记录，激发创造，丰富人们的精神世界，让现实生活更美好。"
      src="https://p-pc-weboff.byteimg.com/tos-cn-i-9r5gewecjs/favicon.png"
      :ripple="true" layout="row" @click="router.push('/detail/douyinhotsearch')">
  </var-card>
</template>

<style scoped>

</style>