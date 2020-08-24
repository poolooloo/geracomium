<template>
  <index-section class="component-gender-of-people" title="全县老人数及性别占比">
    <echart-wrapper>
      <echart-view
        v-if="finish || true"
        class="component-gender-of-people-chart"
        canvas-name="gender-of-people"
        :canvas-options="option"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import EchartWrapper from "@/components/echarts/echart-wrapper";
import EchartView from "@/components/echarts/echart-view";

const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b}: {c} ({d}%)",
  },
  legend: {
    orient: "vertical",
    left: 10,
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"],
  },
  series: [
    {
      name: "访问来源",
      type: "pie",
      radius: ["50%", "70%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "30",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 234, name: "联盟广告" },
        { value: 135, name: "视频广告" },
        { value: 1548, name: "搜索引擎" },
      ],
    },
  ],
};

export default {
  components: {
    IndexSection,
    EchartWrapper,
    EchartView,
  },
  data() {
    return {
      finish: false,
      option
    };
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