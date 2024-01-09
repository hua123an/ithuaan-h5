<script setup>
import {useRouter} from "vue-router";

const router = useRouter()

</script>

<template>
  <div class="wei-bo-hot-search">
    <var-card
        title="微博热搜"
        subtitle="我表情悠哉 跳个大概"
        src="https://varlet.gitee.io/varlet-ui/cat.jpg"
        :ripple="true" layout="row">
      <template #extra>
        <var-button type="primary" @click="router.push('/detail/weibohotsearch')">查看详情</var-button>
      </template>
    </var-card>
  </div>


</template>

<style scoped>

</style>