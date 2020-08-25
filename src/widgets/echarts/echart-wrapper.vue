<template>
  <div class="component-echart-wrapper">
    <slot />
  </div>
</template>
<script>
export default {
  name: 'echart-wrapper',
}
</script>
<style lang="scss">
.component-echart-wrapper{
  min-height: 170px;
  height: px2vh(170);
  padding-top: 20px;
  margin-bottom: 20px;
}
</style>