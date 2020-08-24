# geracomium-system

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
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
```