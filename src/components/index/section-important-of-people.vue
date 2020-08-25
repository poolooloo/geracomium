<template>
  <index-section class="component-important-of-people" title="全县五保老人统计">
    <echart-wrapper>
      <echart-view
        v-if="finish || true"
        class="component-important-of-people-chart"
        canvas-name="important-of-people-right"
        :canvas-options="option"
        width="120"
        height="120"
        ref="echart"
      />
      <echart-view
        v-if="finish || true"
        class="component-important-of-people-chart"
        canvas-name="important-of-people-right"
        :canvas-options="option"
        width="120"
        height="120"
        ref="echart"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";

const option = {
  legend: {
    orient: "vertical",
    left: 10,
    data: ["直接访问", "邮件营销", "联盟广告", "视频广告", "搜索引擎"], // api
  },
  series: [
    {
      type: "pie",
      radius: ["60%", "80%"],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "12",
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
  },
  data() {
    return {
      option,
    };
  },
};
</script>

<style lang="scss">
.component-important-of-people {
  flex: 1;
}
</style>
