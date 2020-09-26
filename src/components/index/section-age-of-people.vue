<template>
  <index-section class="component-age-of-people" :title="ageDatum.ScreenName || '全县老人年龄分布'">
    <template #section-select>
      <el-select v-model="value" @change="getData" placeholder="请选择">
        <el-option
          v-for="(item, index) in options"
          :key="index"
          :label="item.value"
          :value="item.code"
        ></el-option>
      </el-select>
    </template>
    <!-- ECHARTS -->
    <echart-wrapper class="util-flex">
      <echart-view v-if="finish" canvas-name="gender-of-people" :canvas-options="option" />
      <ul class="echart-info">
        <li v-for="(item, i) in ageDatumList" :key="i">
          <span class="name">{{ item.name }}</span>
          <span class="percentage">{{ item.percentage }}</span>
          <span class="value">({{ item.value }})</span>
        </li>
      </ul>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { getScreenAgeDistributionByCounty } from "@/api";
import { mapState, mapMutations } from "vuex";
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
    data: [],
  },
  series: [
    {
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
        borderColor: "rgba(0,0,0,.2)",
        borderWidth: 1,
      },
      emphasis: {
        label: {
          fontSize: 16,
          color: "rgb(47, 194, 255)",
        },
      },
      data: [],
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
      value: "全县",
      finish: false,
      ageDatumList: [],
    };
  },
  computed: {
    ...mapState(["pieDatum", "ageDatum"]),
  },
  mounted() {
    this.init();
    this.renderChart();
  },
  methods: {
    ...mapMutations(["SET_AGE_DATA"]),
    async getData() {
      this.finish = false;
      const data = await getScreenAgeDistributionByCounty({
        CountyName: this.value,
      });
      data && this.SET_AGE_DATA(data);
      this.renderChart();
    },
    init() {
      try {
        const data = this.pieDatum.enumInfo[0].EnumList;
        this.options = data;
      } catch (e) {}
    },
    renderChart() {
      try {
        this.option.legend.data = this.ageDatum.List.map((item) => item.Name);
        const __data = this.ageDatum.List.map((item) => {
          return {
            name: item.Name,
            value: item.Percentage * 200,
          };
        });
        this.ageDatumList = this.ageDatum.List.map((item) => {
          return {
            name: item.Name,
            value: item.PeopleNum,
            percentage: (item.Percentage * 100).toFixed(2) + "%",
          };
        });
        this.option.series[0].data = __data;
        this.finish = true;
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
  .echart-info {
    width: 170px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    span {
      font-size: 14px;
    }
    li {
      display: flex;
      line-height: 30px;
    }
  }
  .name {
    color: #d0ecff;
    width: 60px;
    margin-right: 16px;
  }
  .percentage {
    color: #fff;
    margin-right: 6px;
  }
  .value {
    color: #abacc0;
  }
}
</style>