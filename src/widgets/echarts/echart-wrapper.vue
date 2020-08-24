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
.component-echarts-wrapper{
  min-height: 170px;
  height: px2vh(170);
  margin-bottom: 35px;
}
</style>