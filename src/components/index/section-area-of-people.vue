<template>
  <index-section class="component-area-of-people" title="全县老人区域分布">
    <echart-view
      v-if="finish || true"
      class="component-gender-of-people-chart"
      canvas-name="gender-of-people"
      :canvas-options="option"
      height="400"
    />
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import EchartView from "@/components/echarts/echart-view";
import { xColor } from "@/echarts/echart-options";

const option = {
  color: ["#3398DB"],
  tooltip: {
    trigger: "axis",
    axisPointer: {
      // 坐标轴指示器，坐标轴触发有效
      type: "shadow", // 默认为直线，可选为：'line' | 'shadow'
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  yAxis: [
    {
      type: "category",
      data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
      axisTick: {
        alignWithLabel: true,
      },
      axisLabel: xColor,
    },
  ],
  xAxis: [
    {
      type: "value",
      axisLabel: xColor,
    },
  ],
  series: [
    {
      name: "直接访问",
      type: "bar",
      barWidth: "60%",
      data: [10, 52, 200, 334, 390, 330, 220],
    },
  ],
};
export default {
  components: {
    IndexSection,
    EchartView,
  },
  data() {
    return {
      finish: false,
      option,
    };
  },
};
</script>
