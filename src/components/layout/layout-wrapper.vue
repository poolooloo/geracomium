<template>
  <div class="component-layout-wrapper">
    <div class="component-layout-wrapper__content">
      <slot />
      <div class="component-layout-widget__title">
        <div class="component-layout-widget__title-between"></div>
      </div>
      <div class="component-layout-widget__between"></div>
      <div class="component-layout-widget__bottom"></div>
    </div>
    <div class="component-layout-wrapper__widgets">
      <div class="component-layout__widgets-time">
        <div class="util-flex">
          <div class="util-flex" v-if="dateTime.timer">
            <div class="icon">
              <svg-icon icon="time"></svg-icon>
            </div>
            <div class="content">
              <p class="timer">{{ dateTime.timer }}</p>
              <p class="date">{{ dateTime.date }}</p>
            </div>
          </div>
          <div class="util-flex" style="margin-left:30px;" v-if="weather.wea">
            <div class="icon">
              <svg-icon :icon="weather.icon"></svg-icon>
            </div>
            <div class="content">
              <p class="timer">{{ weather.wea }}</p>
              <p class="date">{{ weather.tem }}℃</p>
            </div>
          </div>
        </div>
      </div>
      <div class="component-layout-widget__square right"></div>
      <div class="component-layout-widget__square top"></div>
      <div class="component-layout-widget__square left"></div>
      <div class="component-layout-widget__square bottom"></div>
    </div>
  </div>
</template>

<script>
import { getTianQiApi } from "@/api/index";

const iconMap = {
  snow: ["xue"],
  yu: ["yu"],
  weather: ["wu", "yun", "yin"],
  flash: ["lei", "bingbao"],
  sun: ["qing"],
};

export default {
  data() {
    return {
      dateTime: {},
      weather: {
        tem: "",
        wea: "",
        icon: "",
      },
    };
  },
  mounted() {
    this.getTianQiApi();
    setInterval(() => {
      this.formateTime();
    }, 1e3);
  },
  methods: {
    getTianQiApi() {
      let iconName = "weather";
      getTianQiApi({
        appid: "12388368",
        appsecret: "JB2Q7sB3",
        version: "v61",
        vue: "1",
        cityid: "101091102",
      }).then((res) => {
        this.weather.tem = res.tem;
        this.weather.wea = res.wea;
        Object.keys(iconMap).some((icon) => {
          if (iconMap[icon].includes(res.wea_img)) {
            iconName = icon;
            return true;
          }
        });
        this.weather.icon = iconName;
      });
    },
    formateTime() {
      const date = new Date();
      const year = date.getFullYear();
      let month = date.getMonth() + 1;
      let strDate = date.getDate();
      let hours = date.getHours();
      let min = date.getMinutes();
      let second = date.getSeconds();

      if (month >= 1 && month <= 9) {
        month = "0" + month;
      }
      if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
      }
      if (hours >= 0 && hours <= 9) {
        hours = "0" + hours;
      }
      if (min >= 0 && min <= 9) {
        min = "0" + min;
      }
      if (second >= 0 && second <= 9) {
        second = "0" + second;
      }

      this.dateTime = {
        date: `${year}年${month}月${strDate}日`,
        timer: `${hours}:${min}:${second}`,
      };
    },
  },
};
</script>

<style lang="scss">
.component-layout-wrapper {
  position: relative;
  width: 100vw;
  height: 100vh;
  min-width: 1920px;
  min-height: 1078px;
  overflow: hidden;
  color: #fff;
  font-size: 16px;
  line-height: 16px;
  background-color: #00052b;
  .component-layout-wrapper__content {
    position: absolute;
    z-index: 2;
    width: 98.23vw;
    height: 96.94vh;
    min-width: 1886px;
    min-height: 1045px;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    border: 1px solid #00a0e8;
  }

  .component-layout-widget__square {
    position: absolute;
    z-index: 3;
    min-width: 100px;
    min-height: 100px;
    width: px2vw(100);
    height: px2vh(100);
    background: $base-bgcolor;

    @media screen and (max-width: 1919px) {
      display: none;
    }
    @media screen and (max-height: 1075px) {
      display: none;
    }

    &.top {
      top: px2vh(-32);
      left: px2vw(-32);
      transform: rotateZ(45deg);
      border-right: 1px solid #00a0e8;
    }
    &.left {
      bottom: px2vh(-32);
      left: px2vw(-32);
      transform: rotateZ(45deg);
      border-top: 1px solid #00a0e8;
    }
    &.bottom {
      bottom: px2vh(-32);
      right: px2vw(-32);
      transform: rotateZ(-45deg);
      border-top: 1px solid #00a0e8;
    }
    &.right {
      top: px2vh(-32);
      right: px2vw(-32);
      transform: rotateZ(-45deg);
      border-left: 1px solid #00a0e8;
    }
  }
  .component-layout-widget__bottom {
    position: absolute;
    left: 50%;
    bottom: 0px;
    width: 420px;
    height: 7px;
    transform: translateX(-50%);
    background: url("../../assets/images/index-widget-bottom.png");
  }
  .component-layout-widget__title {
    position: absolute;
    width: 600px;
    top: 0;
    left: 50%;
    transform: translateX(-50%);
    height: 1px;
    &::after,
    &::before {
      content: "";
      position: absolute;
      right: -28px;
      top: -4px;
      width: 28px;
      height: 8px;
      background-color: #009fe9;
    }
    &::before {
      content: "";
      right: inherit;
      left: -28px;
    }
  }
  .component-layout-widget__title-between {
    position: absolute;
    width: 100%;
    top: 0;
    &::after,
    &::before {
      content: "";
      position: absolute;
      right: -340px;
      top: -9px;
      width: 198px;
      height: 10px;
      background-color: #00052b;
      background-image: url("../../assets/images/index-widget-title-right.png");
      background-size: cover;
    }
    &::before {
      content: "";
      right: inherit;
      top: -2px;
      left: -340px;
      width: 217px;
      height: 19px;
      background-image: url("../../assets/images/index-widget-title-left.png");
      background-size: cover;
    }
  }
  .component-layout-widget__between {
    &::before {
      content: "";
      position: absolute;
      width: 8px;
      height: 239px;
      left: -4px;
      top: 254px;
      background-color: #00052b;
      background-image: url("../../assets/images/index-widget-border-left.png");
      background-size: cover;
    }
    &::after {
      content: "";
      position: absolute;
      width: 18px;
      height: 165px;
      right: -1px;
      bottom: 254px;
      background-color: #00052b;
      background-image: url("../../assets/images/index-widget-border-right.png");
      background-size: cover;
    }
  }
  .component-layout__widgets-time {
    position: absolute;
    top: px2vh(45);
    right: px2vw(84);
    .util-flex {
      align-items: center;
    }
    .icon {
      font-size: 24px;
      color: #8bbed5;
    }
    .content {
      margin-left: 10px;
    }
    .timer {
      font-size: 14px;
      color: #d0ecff;
      line-height: 16px;
    }
    .date {
      font-size: 12px;
      color: #80839c;
      line-height: 16px;
    }
  }
}
</style>