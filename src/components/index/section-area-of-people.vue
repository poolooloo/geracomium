<template>
  <index-section class="component-area-of-people" title="全县老人区域分布">
    <!-- ECHARTS -->
    <echart-view
      class="component-gender-of-people-chart"
      canvas-name="gender-of-people"
      :canvas-options="option"
      height="600"
    />
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import { xColor, grid } from "@/echarts/echart-options";

const option = {
  grid,
  color: ["#2988e4"],
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
  },
  data() {
    return {
      option,
    };
  },
};
</script>
