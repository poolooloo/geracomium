<template>
  <div class="component-layout-wrapper">
    <div class="component-layout-wrapper__content">
      <slot />
    </div>
    <div class="component-layout-wrapper__widgets"></div>
  </div>
</template>

<style lang="scss">
.component-layout-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1920px;
  min-height: 1078px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  background-color: #00052b;
  .component-layout-wrapper__content {
    position: absolute;
    z-index: 2;
    width: 98.23vw;
    height: 96.94vh;
    min-width: 1886px;
    min-height: 1045px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #00a0e8;
  }
}
</style>