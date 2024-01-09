<script setup>
import {useRouter} from "vue-router";

const router = useRouter()
</script>

<template>
<van-nav-bar title="历史上的今天" left-text="返回" @click-left="router.push('/')"/>
</template>

<style scoped>

</style>