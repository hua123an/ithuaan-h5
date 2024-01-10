<script setup>
import ZhiHuNews from "@/views/home/components/homeDailyInfo/zhiHuNews/zhiHuNews.vue";
import TodayInHistory from "@/views/home/components/homeDailyInfo/todayInHistory/todayInHistory.vue";
import HotSearch from "@/views/home/components/homeDailyInfo/hotSearch/hotSearch.vue";
</script>

<template>
<div class="home-daily-info">
  <h2 style="text-align: center">今日信息</h2>
  <zhi-hu-news />
  <today-in-history />
  <hot-search/>
</div>
</template>

<style scoped>

</style>