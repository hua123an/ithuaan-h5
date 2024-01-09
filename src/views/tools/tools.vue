<script setup>
// get search data
import {showToast} from "vant";
import {ref} from "vue";

const search = ref("")
const onSearch = (val) => showToast(val)
const onCancel = () => showToast("取消")
</script>

<template>
  <van-search show-action v-model="search" placeholder="请输入搜索关键词" input-align="center" background="#d2f0f4" @search="onSearch" @cancel="oncancel"/>


</template>

<style scoped>

</style>