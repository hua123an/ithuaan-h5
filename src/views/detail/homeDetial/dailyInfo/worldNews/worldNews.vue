<script setup>
import {ref , onMounted} from 'vue'
import {useRouter} from "vue-router";
// import {getWorldNews} from "@/apis/home/homeApis.js";
import axios from "axios";
const router = useRouter()
const news = ref('')
const getNews = async () => {
  const res = await axios.get('https://newsapi.org/v2/everything?q=keyword&apiKey=32467bdc0580474891c0bf4859aab561')
  news.value = res.data.articles
}


onMounted(() => getNews())


</script>

<template>
  <var-app-bar title="世界新闻" title-position="center">
    <template #left>
      <var-button round @click="router.back()">
        <var-icon  name="chevron-left" :size="20"/>
      </var-button>
    </template>
  </var-app-bar>
  <var-link v-for="i in news" :href="i.url"  style="text-decoration:none" target="_blank">
   <var-card :title="i.content" :subtitle="i.author" :description="i.description" :src="i.urlToImage" layout="row" class="card" />
  </var-link>


</template>

<style scoped>
/*mobile*/
@media screen and (max-width: 768px) {
  .card {
    max-width: 768px;
  }
}
</style>