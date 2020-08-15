<template>
  <div class="component-index-section-header">
    <div class="component-index-section-header__title">
      <p class="title">{{ title || '全县老人数及性别占比' }}</p>
      <div class="component-index-section-header__widget"></div>
    </div>
    <div class="component-index-section-header__select">
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  props: {
    title: String,
  },
};
</script>
<style lang="scss">
.component-index-section-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  .component-index-section-header__title {
    position: relative;
    padding: 0 0 4px 8px;
    border-left: 4px solid $default-orange;
    &::after {
      content: "";
      position: absolute;
      bottom: -5px;
      left: 0;
      width: 100%;
      height: 1px;
      background-color: #5bb6fe;
      opacity: 0.5;
    }
    &::before {
      content: "";
      position: absolute;
      bottom: -6px;
      right: 0;
      width: 3px;
      height: 3px;
      border-radius: 2px;
      background-color: $default-orange;
    }
  }
  .component-index-section-header__widget {
    position: absolute;
    left: 22px;
    bottom: -5px;
    width: 35px;
    height: 1px;
    background-color: #5bb6fe;
    &::after {
      content: "";
      position: absolute;
      bottom: 0px;
      left: -25px;
      width: 3px;
      height: 5px;
      border-left: 1px solid rgba(91, 182, 254, 0.5);
      border-bottom: 1px solid rgba(91, 182, 254, 0.5);
    }
  }
  .title {
  }
}
</style>