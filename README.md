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

#### vue2-[editor](https://www.npmjs.com/package/vue2-editor)

```shell
npm install vue2-editor
yarn add vue2-editor
```

Usage

```javascript
// Basic Use - Covers most scenarios
import { VueEditor } from "vue2-editor";
 
// Advanced Use - Hook into Quill's API for Custom Functionality
import { VueEditor, Quill } from "vue2-editor";
```

```javascript
<template>
  <div id="app">
    <vue-editor v-model="content"></vue-editor>
  </div>
</template>
 
<script>
import { VueEditor } from "vue2-editor";
 
export default {
  components: {
    VueEditor
  },
 
  data() {
    return {
      content: "<h1>Some initial content</h1>"
    };
  }
};
</script>
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

#### [multer](https://www.npmjs.com/package/multer)

Multer 是一个 node.js 中间件，用于处理 `multipart/form-data` 类型的表单数据，它主要用于上传文件。它是写在 [busboy](https://github.com/mscdex/busboy) 之上非常高效。

```shell
$ npm install --save multer
```

##### use

```javascript
const multer = require('multer')
  const upload = multer({dest: __dirname + '/../../uploads'})
  app.post('/admin/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })
```

#### [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)

jsonwebtoken是一个跨域认证标准，它的好处就是可以跨域，跨平台。

```shell
npm install jsonwebtoken
```

#### app.set()

设置全局变量。给app 应该放在环境配置里面

```javascript
app.set('secret', 'asdasdasdasdasdsa')
```

### (web)移动端

#### scss 

```shell
npm install -D sass sass-loader
```

**注意项目中利用sass编写的工具css 特别的值得学习和借鉴**

#### vue-awesome-swiper

```shell
npm install vue-awesome-swiper --save
```

#### require-all

```shell
npm i require-all
```

引入某个人文件夹下面的所有文件