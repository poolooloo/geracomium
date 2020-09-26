# geracomium-system

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for uat
```
npm run build
```

### Compiles and minifies for production
```
npm run product
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


```js
const vue_config_js = {
  css: {
    sourceMap: false,
    loaderOptions: {
      sass: {
        // 全局引入sass 新 sass-loader prependData 旧版 data
        prependData: `
          @import "@/styles/_variable.scss";
        `
      }
    }
  }
}

// pie data
const enumInfo = "县级下拉框数据源"
const streetsInfos = "老人区域分布"
const screeninstitution = "机构信息"
const screeninstitution.institutionCount = "机构类型数量"
const screeninstitution.institutionPeople = "养老人数分布"
const peopleNums[0] = "老人人数及性别占比"
const peopleNums[1] = "全县五保老人统计"
const peopleNums[2] = "分级照护"
```
