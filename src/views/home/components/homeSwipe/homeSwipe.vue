<script setup>

</script>

<template>
<div class="home-swipe">
  <var-swipe class="swipe-example" autoplay="2000">
    <var-swipe-item>
      <var-image class="swipe-example-image" src="https://v.api.aa1.cn/api/api-fj-1/img/850-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png850-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png" />
    </var-swipe-item>
    <var-swipe-item>
      <var-image class="swipe-example-image" src="https://v.api.aa1.cn/api/api-fj-1/img/695-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png695-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png" />
    </var-swipe-item>
    <var-swipe-item>
      <var-image class="swipe-example-image" src="https://v.api.aa1.cn/api/api-fj-1/img/751-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png751-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png" />
    </var-swipe-item >
    <var-swipe-item>
      <var-image class="swipe-example-image" src="https://v.api.aa1.cn/api/api-fj-1/img/742-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png742-2K%E5%A3%81%E7%BA%B8%EF%BC%88api.aa1.cn%EF%BC%89%E5%85%8D%E8%B4%B9API.png" />
    </var-swipe-item>
  </var-swipe>
</div>
</template>

<style scoped>
/*display on pc*/
@media screen and (max-width: 3840px) {
  .swipe-example {
    height: 600px;
  }
  .swipe-example-image {
    width: 100%;
    object-fit: cover;
    pointer-events: none;
  }
}
/*display on mobile*/
@media screen and (max-width: 768px) {
  .swipe-example {
    height: 240px;
  }
  .swipe-example-image {
    object-fit: cover;
    pointer-events: none;
  }
}

</style>