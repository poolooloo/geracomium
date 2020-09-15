<template>
  <index-section class="component-check-in" :title="liquidFill.ScreenName || '机构入住率'">
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
    <echart-wrapper class="util-flex">
      <div class="tmp-box" style="min-width: 205px;">
        <echart-view
          style="height: 100%;"
          v-if="finish"
          class="component-check-in-chart"
          canvas-name="check-in"
          :canvas-options="option"
        />
      </div>
      <div class="echart-info">
        <p v-if="sheckInSumNumMap.freeSumNum" class="freeSumNum">
          {{sheckInSumNumMap.freeSumNum.PeopleNum}}
          <svg-icon style="color:#464968;" icon="arrow1" />
        </p>
        <p
          v-if="sheckInSumNumMap.freeSumNum"
          class="font-gray"
        >{{ sheckInSumNumMap.freeSumNum.Name }}</p>

        <p v-if="sheckInSumNumMap.sheckInSumNum" class="util-flex sheckInSumNum">
          <span class="name">{{sheckInSumNumMap.sheckInSumNum.Name}}</span>
          <span class="font-white">{{sheckInSumNumMap.sheckInSumNum.PeopleNum}}</span>
        </p>

        <p v-if="sheckInSumNumMap.sumBedSumNum" class="util-flex sumBedSumNum">
          <span class="name">{{sheckInSumNumMap.sumBedSumNum.Name}}</span>
          <span class="font-white">{{sheckInSumNumMap.sumBedSumNum.PeopleNum}}</span>
        </p>
      </div>
    </echart-wrapper>
  </index-section>
</template>

<script>
import { mapState, mapMutations } from "vuex";
import IndexSection from "@/components/section/index-section";
import echartsLiquidfill from "echarts-liquidfill";
import { getOccupancyRateByInstitutionName } from "@/api";
console.log(echartsLiquidfill, "use echartsLiquidfill");

const option = {
  series: [
    {
      type: "liquidFill", //类型
      data: [0.7, 0.7, 0.7], //数据是个数组 数组的每一项的值是0-1
      outline: {
        show: true, //是否显示轮廓 布尔值
        borderDistance: 0, //外部轮廓与图表的距离 数字
        itemStyle: {
          borderColor: "rgba(0,0,0,0.09)", //边框的颜色
          borderWidth: 0, //边框的宽度
          // shadowBlur: 5 , //外部轮廓的阴影范围 一旦设置了内外都有阴影
          shadowColor: "#000", //外部轮廓的阴影颜色
        },
      },
      label: {
        formatter: function (param) {
          return (param.value * 100).toFixed(2) + "%" + "\n\n" + "入住率";
        },
        fontSize: 16,
        fontWeight: 400,
        color: "rgb(47, 194, 255)",
      },
      backgroundStyle: {
        color: "rgba(0,0,0,0)", //图表的背景颜色
        borderWidth: "1", //图表的边框宽度
        borderColor: "rgba(72,89,142,1)", //图表的边框颜色
        itemStyle: {
          shadowBlur: 100, //设置无用
          shadowColor: "#f60", //设置无用
          opacity: 1, //设置无用
        },
      },
      itemStyle: {
        opacity: 0.5, //波浪的透明度
        shadowBlur: 10, //波浪的阴影范围
        shadowColor: "#f60", //阴影颜色
      },
      emphasis: {
        itemStyle: {
          opacity: 0.8, //鼠标经过波浪颜色的透明度
        },
      },
      color: ["#FCB25B", "#FCB25B", "#FCB25B"], //水波的颜色 对应的是data里面值
      shape: "circle", //水填充图的形状 circle默认圆形  rect圆角矩形  triangle三角形  diamond菱形  pin水滴状 arrow箭头状  还可以是svg的path
      center: ["50%", "50%"], //图表相对于盒子的位置 第一个是水平的位置 第二个是垂直的值 默认是[50%,50%]是在水平和垂直方向居中 可以设置百分比 也可以设置具体值
      radius: "80%", //图表的大小 值是圆的直径 可以是百分比 也可以是具体值 100%则占满整个盒子 默认是40%; 百分比下是根据宽高最小的一个为参照依据
      amplitude: 3, //振幅 是波浪的震荡幅度 可以取具体的值 也可以是百分比 百分比下是按图标的直径来算
      waveLength: "50%", //波的长度 可以是百分比也可以是具体的像素值  百分比下是相对于直径的 取得越大波浪的起伏越小
      phase: 0, //波的相位弧度 默认情况下是自动
      period: (value, index) => {
        //控制波的移动速度 可以是函数 也可以是数字 两个参数  value 是data数据里面的值 index 是data值的索引
        return index * 2000;
      },
      direction: "left", //波移动的速度 两个参数  left 从右往左 right 从左往右
      waveAnimation: true, //控制波动画的开关  值是布尔值 false 是关闭动画 true 是开启动画 也是默认值
      animationEasing: "linear", //初始动画
      animationEasingUpdate: "quarticInOut", //数据更新的动画效果
      animationDuration: 3000, //初始动画的时长，支持回调函数，可以通过每个数据返回不同的 delay 时间实现更绚丽的初始动画效果
      animationDurationUpdate: 300, //数据更新动画的时长
    },
  ],
};
export default {
  components: {
    IndexSection,
  },
  computed: {
    ...mapState(["liquidFill", "pieDatum"]),
  },
  data() {
    return {
      options: [],
      finish: false,
      option,
      value: "全县",
      sheckInSumNumMap: {},
    };
  },
  mounted() {
    this.init();
    this.renderChart();
  },
  methods: {
    ...mapMutations(["SET_LIQUID_FILL"]),
    async getData() {
      this.finish = false;
      const data = await getOccupancyRateByInstitutionName({
        InstitutionName: this.value,
      });
      this.SET_LIQUID_FILL(data);
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
        data.unshift({
          code: "全县",
          value: "全县",
        });
        this.options = data;
      } catch (e) {}
    },
    renderChart() {
      try {
        const sheckInSumNumMap = this.liquidFill.List.reduce((total, item) => {
          total[item.Code] = item;
          return total;
        }, {});
        this.option.series[0].data = new Array(3).fill(
          sheckInSumNumMap.sheckInSumNum.Percentage
        );
        this.sheckInSumNumMap = sheckInSumNumMap;
        this.finish = true;
      } catch (e) {}
    },
  },
};
</script>

<style lang="scss">
.component-check-in {
  .echart-info {
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .name {
    width: 65px;
  }
  .font-white {
    color: #fff;
  }
  .freeSumNum {
    font-size: 20px;
    color: #2fc2ff;
  }
  .font-gray {
    margin: 8px 0;
    font-size: 12px;
    color: #abacc0;
  }
  .sheckInSumNum,
  .sumBedSumNum {
    font-size: 12px;
    color: #d0ecff;
    line-height: 30px;
  }
}
</style>