<script setup>
import {useRouter} from "vue-router";
import {ref , onMounted} from "vue";
import axios from "axios";
const router = useRouter()
const date = new Date()
const month = date.getMonth() + 1
const day = date.getDate()
const todayInHistory = ref("")
const getData = async () => {
  const res = await axios.get(`http://www.wudada.online/Api/ScLsDay?month=${month}&&day=${day}`)
  todayInHistory.value = res.data.data
}
onMounted(() => getData())
</script>

<template>
  <var-app-bar title="历史上的今天" title-position="center">
    <template #left>
      <var-button round @click="router.push('/')">
        <var-icon  name="chevron-left" :size="20"/>
      </var-button>
    </template>
  </var-app-bar>
  <var-divider dashed/>
  <var-list v-for="i in todayInHistory">
    <var-cell>
        {{i.id}} {{i.date}} {{i.title}}
    </var-cell>
  </var-list>



</template>

<style scoped>

</style>