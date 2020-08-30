<template>
  <index-section class="component-disease-of-people" title="机构内老人病史分布">
    <template #section-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.code"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
    </template>
    <echart-wrapper class="util-flex" style="height: inherit;">
      <echart-view
        class="component-number-of-people-chart"
        canvas-name="number-of-people"
        :canvas-options="option"
        ref="echart"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";
import { grid } from "@/echarts/echart-options";

const option = {
  grid,
  tooltip: {
    trigger: "item",
    formatter: " {d}%",
  },
  visualMap: {
    show: false,
    min: 80,
    max: 600,
    inRange: {
      colorLightness: [0, 1],
    },
  },
  series: [
    {
      type: "pie",
      radius: "60%",
      center: ["50%", "50%"],
      data: [
        { value: 335, name: "直接访问" },
        { value: 310, name: "邮件营销" },
        { value: 274, name: "联盟广告" },
        { value: 235, name: "视频广告" },
        { value: 400, name: "搜索引擎" },
      ].sort(function (a, b) {
        return a.value - b.value;
      }),
      roseType: "radius",
      label: {
        color: "rgba(255, 255, 255, 1)",
      },
      labelLine: {
        show: false,
        smooth: 0,
        length: 0,
        length2: 10,
      },
      itemStyle: {
        color: "#2988e4",
        shadowBlur: 200,
        shadowColor: "rgba(0, 0, 0, 0.5)",
      },
      animationType: "scale",
      animationEasing: "elasticOut",
      animationDelay: function () {
        return Math.random() * 200;
      },
    },
  ],
};
export default {
  components: {
    IndexSection,
  },
  computed: {
    ...mapState(["pieDatum"]),
  },
  data() {
    return {
      options: [
        {
          value: "选项1",
          label: "黄金糕",
        },
        {
          value: "选项2",
          label: "双皮奶",
        },
        {
          value: "选项3",
          label: "蚵仔煎",
        },
        {
          value: "选项4",
          label: "龙须面",
        },
        {
          value: "选项5",
          label: "北京烤鸭",
        },
      ],
      value: "",
      option,
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      try {
        const data = this.pieDatum.enumInfo[0].EnumList;
        this.options = data

      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
</style>