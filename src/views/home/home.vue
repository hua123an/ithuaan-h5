<script setup>
import HomeNavigation from "@/views/home/components/homeNavigation/homeNavigation.vue";
import HomeSwipe from "@/views/home/components/homeSwipe/homeSwipe.vue";
import HomeNoticeBar from "@/views/home/components/homeNoticeBar/homeNoticeBar.vue";
import HomeDailyInfo from "@/views/home/components/homeDailyInfo/homeDailyInfo.vue";
</script>
<template>
  <!--  navigation-->
  <home-navigation/>
  <!--  swipe-->
  <home-swipe/>
  <!--notice bar-->
  <home-notice-bar/>
  <van-divider/>
  <!--  daily info-->
  <home-daily-info/>
</template>

<style scoped>


</style>