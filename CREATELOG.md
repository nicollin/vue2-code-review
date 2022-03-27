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

- 修改`./src/main.js`

```javascript
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.use(ElementUI)
```
