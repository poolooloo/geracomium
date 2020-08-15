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
  padding: 80px 24px 24px;
  overflow: auto;
}
</style>