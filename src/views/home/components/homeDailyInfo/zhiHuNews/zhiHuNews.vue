<script setup>
import {useRouter} from "vue-router";
import {ref , onMounted}  from "vue";
import axios from "axios";
const router = useRouter()
// zhihu daily news
const news = ref("")
const getNews = async () => {
  const res = await axios.get("https://v.api.aa1.cn/api/zhihu-news/index.php?aa1=xiarou")
  news.value = res.data.toString()
  console.log(res.data)
}
onMounted(() => getNews())
</script>

<template>
  <div class="zhi-hu-news">
  <var-card
      title="知乎新闻"
      subtitle="知乎每日新闻"
      src="https://static.zhihu.com/heifetz/favicon.ico"  layout="row" outline="outline" >
    <template #extra>
      <var-button type="primary" @click="router.replace('/detail/zhihunews')">查看详情</var-button>
    </template>
  </var-card>
</div>


</template>

<style scoped>

</style>