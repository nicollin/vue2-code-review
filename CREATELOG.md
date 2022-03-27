# 项目创建记录

## 1.脚手架

### 1)项目初始化

1. `vue-cli`初始化`vue2.x` + `webpack`模板项目

```shell
vue init webpack [project-name]
```

2. 输入相关信息

```shell
? Project name [project-name]
? Project description [project-description]
? Author [Author]
? Vue build standalone
? Install vue-router? Yes
? Use ESLint to lint your code? No
? Set up unit tests No
? Setup e2e tests with Nightwatch? No
? Should we run `npm install` for you after the project has been created? (recommended) npm
```

3. 将项目纳入git版本控制

```shell
git init
```

4. 上传到github等代码托管平台

```shell
git remote add origin [remote-git-repository-address]
git branch -M main
git push -u origin main
```

### 2)完善脚手架

1. 全局引入`elementUI`

- 安装`elementUI`npm包

```shell
npm i element-ui -S
```

- 修改`./src/main.js`：

```javascript
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI)
```

2. 修改`./src/router/index.js`路由文件：

```javascript
import Vue from "vue";
import Router from "vue-router";

const Home = () => import("../views/home/index.vue");

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Home",
      component: Home
    }
  ]
});
```

3. 引入`scss`并配置全局样式

- 下载`node-sass`、`sass-loader`、`sass-resources-loader`npm包

```shell
npm install node-sass sass-loader sass-resources-loader -D
```

- 修改`./build/webpack.base.conf.js`：

```javascript
// rules下添加以下配置
{
  test: /\.sass$/,
  loaders: ["style", "css", "scss"]
}
```

- 配置全局样式文件`./src/style/common.scss`

- 修改`./build/utils.js`：

```javascript
exports.cssLoaders = function(options) {
  ...
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass"),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
};
```

改为

```javascript
exports.cssLoaders = function(options) {
  ...
  return {
    css: generateLoaders(),
    postcss: generateLoaders(),
    less: generateLoaders("less"),
    sass: generateLoaders("sass", { indentedSyntax: true }),
    scss: generateLoaders("sass").concat({
      loader: "sass-resources-loader",
      options: {
        resources: path.resolve(__dirname, "./../src/style/common.scss")
      }
    }),
    stylus: generateLoaders("stylus"),
    styl: generateLoaders("stylus")
  };
};
```

**报错相关解决方案**：

- `Module build failed: TypeError: this.getOptions is not a function`

解决方案：修改`./package.json`再执行`npm install`

```javascript
{
  "sass-loader": "^4.0.0",
}
```
