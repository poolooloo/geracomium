<template>
  <index-section class="component-check-in" title="机构入住率">
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
    };
  },
};
</script>

<style lang="scss">

</style>