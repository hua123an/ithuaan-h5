<script setup>
// get daily words
import {getDailyWords} from "@/apis/home/homeApis.js";
import {ref , onMounted} from "vue"
// get notice words
const text = ref('')
const getDailyWordsData = async () => {
  try {
    const res = await getDailyWords()
    text.value = res.data.data.content + "-----" +  res.data.data.origin
  }catch (e){
    console.log(e)
  }
}
onMounted(() => getDailyWordsData())
</script>

<template>
<div class="home-notice-bar">
  <van-notice-bar :text/>

</div>
</template>

<style scoped>

</style>