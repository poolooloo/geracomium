<template>
  <div class="component-layout-aside">
    <slot />
  </div>
</template>
<style lang="scss">
.component-layout-aside {
  width: px2vw(508);
  min-width: 508px;
  height: 100%;
  padding: px2vh(80) px2vw(24) px2vh(24);
}
</style>