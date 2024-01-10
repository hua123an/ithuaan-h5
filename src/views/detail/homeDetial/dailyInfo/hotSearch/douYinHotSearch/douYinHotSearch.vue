<script setup>
import {ref , onMounted} from "vue";
import axios from "axios";
import {useRouter} from "vue-router";
const router = useRouter()
const hot = ref('')
const getHot = async () => {
  const res = await axios.get("https://tenapi.cn/v2/douyinhot")
  hot.value = res.data.data
}
onMounted(() => getHot())
</script>

<template>
  <var-app-bar title="抖音热搜" title-position="center">
    <template #left>
      <var-button round @click="router.push('/')">
        <var-icon  name="chevron-left" :size="20"/>
      </var-button>
    </template>
  </var-app-bar>
  <var-divider dashed />
  <var-list v-for="i in hot">
    <var-cell>
      <var-link :href="i.url" target="_blank" type="primary" underline="false">
        {{i.name}}
        <span>{{i.hot}}热度</span>
      </var-link>
    </var-cell>
  </var-list>

</template>

<style scoped>

</style>