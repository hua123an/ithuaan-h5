<script setup>
// today in history
import axios from "axios";
import {ref} from "vue";
import {useRouter} from "vue-router";
const router  = useRouter()

const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
const todayInHistory = ref("")
const getData = async () => {
  const res = await axios.get(`http://www.wudada.online/Api/ScLsDay?month=${month}&&day=${day}`)
  todayInHistory.value = res.data.data
}

</script>

<template>
  <div class="today-in-history">
    <var-card
        title="历史上的今天"
        subtitle="我表情悠哉 跳个大概"
        src="https://varlet.gitee.io/varlet-ui/cat.jpg"
        :ripple="true" layout="row">
      <template #extra>
        <var-button type="primary" @click="router.replace('/detail/todayinhistory')">查看详情</var-button>
      </template>
    </var-card>
  </div>



</template>

<style scoped>

</style>