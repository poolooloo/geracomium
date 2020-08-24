<template>
  <index-section class="component-number-of-people" title="养老人数分布">
    <echart-wrapper></echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import EchartWrapper from "@/components/echarts/echart-wrapper";

export default {
  components: {
    IndexSection,
    EchartWrapper
  },
};
</script>
