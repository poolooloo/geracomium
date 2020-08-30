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
  min-height: 205px;
  height: px2vh(205);
}
</style>