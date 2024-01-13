<script setup>

</script>

<template>
<div class="home-swipe">
  <var-swipe class="swipe-example" autoplay="2000">
    <var-swipe-item>
      <var-image class="swipe-example-image" src="public/swipe01.jpg" />
    </var-swipe-item>
    <var-swipe-item>
      <var-image class="swipe-example-image" src="public/swipe02.png" />
    </var-swipe-item>
    <var-swipe-item>
      <var-image class="swipe-example-image" src="public/swipe03.png" />
    </var-swipe-item >
    <var-swipe-item>
      <var-image class="swipe-example-image" src="public/swipe04.jpg" />
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
    height: 300px;
  }
  .swipe-example-image {
    object-fit: cover;
    pointer-events: none;
  }
}

</style>