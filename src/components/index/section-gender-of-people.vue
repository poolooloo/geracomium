<template>
  <index-section class="component-gender-of-people" title="全县老人数及性别占比">
    <echart-wrapper></echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import EchartWrapper from "@/echarts/echart-wrapper";

export default {
  components: {
    IndexSection,
    EchartWrapper
  },
};
</script>
<style lang="scss">
.component-gender-of-people {
  .component-gender-echarts__wrapper {
    min-height: 195px;
    height: px2vh(195);
  }
}
</style>