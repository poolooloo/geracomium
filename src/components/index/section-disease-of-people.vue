<template>
  <index-section
    class="component-disease-of-people"
    :title="diseaseDatum.ScreenName || '机构内老人病史分布'"
  >
    <template #section-select>
      <el-select v-model="value" @change="getData" placeholder="请选择">
        <el-option v-for="item in options" :key="item.code" :label="item.value" :value="item.code"></el-option>
      </el-select>
    </template>
    <echart-wrapper class="util-flex" style="height: inherit;">
      <echart-view
        v-if="finish"
        class="component-number-of-people-chart"
        canvas-name="number-of-people"
        :canvas-options="option"
        ref="echart"
      />
      <ul class="echart-info">
        <li v-for="(item,i) in diseaseDatumList" :key="i">
          <span style="color:#D0ECFF; margin-right: 5px;">{{item.name}}</span>
          <span>{{item.percentage}}</span>
        </li>
      </ul>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import IndexSection from "@/components/section/index-section";
import { grid } from "@/echarts/echart-options";
import { getScreenDiseaseByInstitutionName } from "@/api";

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
      data: [].sort(function (a, b) {
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
    ...mapState(["pieDatum", "diseaseDatum"]),
  },
  data() {
    return {
      options: [],
      finish: false,
      value: "",
      option,
      diseaseDatumList: [],
    };
  },
  mounted() {
    this.init();
    this.renderChart();
  },
  methods: {
    ...mapMutations(["SET_DISEASE"]),
    async getData() {
      this.finish = false;
      const data = await getScreenDiseaseByInstitutionName({
        InstitutionName: this.value,
      });

      this.SET_DISEASE(data);
      data && this.renderChart();
    },
    init() {
      try {
        const data = this.pieDatum.screeninstitution.institutionList.map(
          (item) => ({
            code: item.InstitutionName,
            value: item.InstitutionName,
          })
        );
        this.options = data;
      } catch (e) {}
    },
    renderChart() {
      try {
        this.option.series[0].data = this.diseaseDatumList =
          this.diseaseDatum.List &&
          this.diseaseDatum.List.map((item) => {
            return {
              name: item.Name,
              value: item.PeopleNum,
              percentage: (item.Percentage * 100).toFixed(0) + "%",
            };
          });
        this.diseaseDatumList.sort((a, b) => a.value - b.value);
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
.component-disease-of-people {
  .component-echart-wrapper {
    align-items: center;
    justify-content: space-between;
  }
  .echart-info {
    width: 200px;
    height: 150px;
    display: flex;
    flex-wrap: wrap;
    overflow: auto;
    li {
      width: 90px;
      font-size: 12px;
      span {
        line-height: 30px;
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }
    }
  }
}
</style>