<template>
  <index-section class="component-age-of-people" title="全县老人年龄分布">
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
    <!-- ECHARTS -->
    <echart-wrapper class="util-flex">
      <echart-view
        canvas-name="gender-of-people"
        :canvas-options="option"
      />
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState } from "vuex";
import IndexSection from "@/components/section/index-section";

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
  },
  data() {
    return {
      option,
      options: [],
      value: "",
    };
  },
  computed: {
    ...mapState(["pieDatum"]),
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
.component-age-of-people {
  .component-age-echarts__wrapper {
    min-height: 170px;
    height: px2vh(170);
  }
}
</style>