## 项目介绍

## 项目初始化

## 安装Vue CLi

```shell
npm install -g @vue/cli
# OR
yarn global add @vue/cli
```

## 项目创建

```shell
mkdir server
vue create admin
vue create web
```

## 模块依赖

### (admin)后台管理

#### router

```shell
vue add router
```

#### elementUI

```powershell
vue add element
```

#### axios

```shell
npm i axios
```

### （server）服务端

#### nodemon

```shell
npm i -g nodemon
```

#### express

```shell
npm i express
```

#### mongoose

（基于mongoDB的数据模型）

```shell
npm i mongoose
```

#### cors(跨域处理)

```shell
npm i cors
```

#### inflection

> https://www.npmjs.com/package/inflection

> [inflection-js](http://code.google.com/p/inflection-js/)是Ruby on Rails的Active Support Inflection类到Javascript的功能的移植。`inflection`是`inflection-js`node.js npm软件包的端口。与其像[扩展JavaScript本机](http://wonko.com/post/extending-javascript-natives) String对象那样`inflection-js`，`inflection`不如将方法分离到一个独立的程序包中，以避免发生意外行为。

```shell
npm install inflection
```

动态接口 详情查看server-routes-admin-index.js

```javascript
app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const modelName = require('inflection').classify(req.params.resource)
    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)
```

