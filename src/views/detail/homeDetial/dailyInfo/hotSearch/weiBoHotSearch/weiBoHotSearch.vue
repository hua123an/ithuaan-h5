<script setup>
import {useRouter} from "vue-router";
import {ref , onMounted} from "vue";
import axios from "axios";
const hot = ref("")
const getData = async () => {
  const res = await axios.get("https://api.vvhan.com/api/hotlist?type=wbHot")
  hot.value = res.data.data
}
const router = useRouter()
onMounted(() => getData())
</script>

<template>
  <var-app-bar title="微博热搜" title-position="center">
    <template #left>
      <var-button round @click="router.push('/')">
        <var-icon  name="chevron-left" :size="20"/>
      </var-button>
    </template>
  </var-app-bar>
  <var-divider dashed />
  <var-list v-for="i in hot" :id="i.index">
    <var-cell>
      <var-link :href="i.url" target="_blank" type="primary" underline="false">
        {{i.title}} 热度:{{i.hot}}
      </var-link>
    </var-cell>
  </var-list>





</template>

<style scoped>

</style>