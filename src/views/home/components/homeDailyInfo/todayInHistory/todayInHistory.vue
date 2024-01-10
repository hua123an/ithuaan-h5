<script setup>
import {useRouter} from "vue-router";
const router  = useRouter()



</script>

<template>
  <div class="today-in-history">
    <var-card
        title="历史上的今天"
        subtitle="我表情悠哉 跳个大概"
        src="src/assets/home01.jpg"
        :ripple="true" layout="row" @click="router.push('/detail/todayinhistory')">
    </var-card>
  </div>



</template>

<style scoped>

</style>