<script setup>
import {ref} from 'vue'
const active = ref("home")
</script>
<template>
  <van-tabbar v-model="active" :route="true">
    <van-tabbar-item icon="home-o" name="home" to="/"></van-tabbar-item>
    <van-tabbar-item icon="search" name="tool" to="/tools"></van-tabbar-item>
    <van-tabbar-item icon="friends-o" name="mine" to="/mine"></van-tabbar-item>
  </van-tabbar>
  <van-back-top />
<router-view/>
</template>
<style>
    
    
    
    
    
</style>