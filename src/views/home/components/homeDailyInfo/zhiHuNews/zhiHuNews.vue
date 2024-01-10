<script setup>
import {useRouter} from "vue-router";
import {ref , onMounted}  from "vue";
import axios from "axios";
const router = useRouter()

</script>

<template>
  <div class="zhi-hu-news">
  <var-card
      title="知乎新闻"
      subtitle="知乎每日新闻"
      src="https://static.zhihu.com/heifetz/favicon.ico"  layout="row" outline="outline" @click="router.push('/detail/zhihunews')">
  </var-card>
</div>


</template>

<style scoped>

</style>