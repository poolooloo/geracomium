<template>
  <index-section class="component-age-of-people" title="全县老人年龄分布">
    <template #section-select>
      <el-select v-model="value" placeholder="请选择">
        <el-option
          v-for="item in options"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        ></el-option>
      </el-select>
    </template>
    <echart-wrapper>
      <echart-view
        v-if="finish || true"
        class="component-gender-of-people-chart"
        canvas-name="gender-of-people"
        :canvas-options="option"
        width="400"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import IndexSection from "@/components/section/index-section";
import EchartWrapper from "@/components/echarts/echart-wrapper";
import EchartView from "@/components/echarts/echart-view";
import { getScreenBaseInfo } from "@/api";
const option = {
  tooltip: {
    trigger: "item",
    formatter: "{a} <br/>{b} : {c}%",
  },
  toolbox: {
    feature: {
      dataView: { readOnly: false },
      restore: {},
      saveAsImage: {},
    },
  },
  legend: {
    data: ["展现", "点击", "访问", "咨询", "订单"],
  },
  series: [
    {
      name: "漏斗图",
      type: "funnel",
      left: 0,
      top: 0,
      width: "100%",
      height: "100%",
      min: 0,
      max: 100,
      minSize: "0%",
      maxSize: "100%",
      sort: "descending",
      gap: 0,
      label: {
        show: true,
        position: "inside",
      },
      labelLine: {
        length: 10,
        lineStyle: {
          width: 1,
          type: "solid",
        },
      },
      itemStyle: {
        borderColor: "#fff",
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 20,
        },
      },
      data: [
        { value: 45, name: "访问" },
        { value: 25, name: "咨询" },
        { value: 15, name: "订单" },
        { value: 12, name: "点击" },
        { value: 3, name: "展现" },
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
  mounted() {
    getScreenBaseInfo().then((res) => {
      console.log(res);
    });
  },
  data() {
    return {
      option,
      finish: false,
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
    };
  },
};
</script>

<style lang="scss">
.component-age-of-people {
  .component-age-echarts__wrapper {
    min-height: 170px;
    height: px2vh(170);
  }
}
</style>