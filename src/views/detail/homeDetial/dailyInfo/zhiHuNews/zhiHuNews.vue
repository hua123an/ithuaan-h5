<script setup>
import {ref , onMounted} from "vue";
import  {useRouter} from "vue-router";
import axios from "axios";
const router = useRouter()
// zhihu daily news
const news = ref("")
const getNews = async () => {
  const res = await axios.get("https://tenapi.cn/v2/zhihuhot" , {
    headers : {
     "Content-Type" : "text/html; charset=UTF-8"
    }
  })
  news.value = res.data.data
}
onMounted(() => getNews())
</script>

<template>
  <var-app-bar title="知乎新闻" title-position="center">
    <template #left>
      <var-button round @click="router.push('/')">
        <var-icon  name="chevron-left" :size="20"/>
      </var-button>
    </template>
  </var-app-bar>

  <var-divider dashed />
  <var-list v-for="i in news">
    <var-cell>
      <var-link :href="i.url" target="_blank" type="primary" underline="false">
        {{i.name}}
        <span>{{i.hot}}</span>
      </var-link>
    </var-cell>
  </var-list>


</template>

<style scoped>

</style>