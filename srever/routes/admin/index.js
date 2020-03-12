module.exports = app => {
  const express = require('express')
  const jwt = require('jsonwebtoken')
  const AdminUser = require('../../models/AdminUser')

  const router = express.Router({
    mergeParams: true
  })

  router.post('/', async (req, res) => {
    const model = await req.Model.create(req.body)
    res.send(model)
  })

  router.put(`/:id`, async (req, res) => {
    const model = await req.Model.findByIdAndUpdate(req.params.id, req.body)
    res.send(model)
  })

  router.delete(`/:id`, async (req, res) => {
    await req.Model.findByIdAndDelete(req.params.id, req.body)
    res.send({
      success: true
    })
  })

  router.get('/', async (req, res, next) => {
    const token = String(req.headers.authorization || '').split(' ').pop()
    const { id } = jwt.verify(token, app.get('secret'))
    req.user = await AdminUser.findById(id)
    console.log(req.user)
    await next()
  }, async (req, res) => {
    const queryOptions = {}
    if (req.Model.modelName === 'Category') {
      queryOptions.populate = 'parent'
    }
    const item = await req.Model.find().setOptions(queryOptions).limit(100)
    res.send(item)
  })
  router.get('/:id', async (req, res) => {
    const model = await req.Model.findById(req.params.id)
    res.send(model)
  })

  app.use('/admin/api/rest/:resource', async (req, res, next) => {
    const inflection = require('inflection')
    const modelName = inflection.classify(req.params.resource)
    console.log(req.params.resource, modelName);

    req.Model = require(`../../models/${modelName}`)
    next()
  }, router)

  const multer = require('multer')
  const upload = multer({ dest: __dirname + '/../../uploads' })
  app.post('/admin/api/upload', upload.single('file'), (req, res) => {
    const file = req.file
    file.url = `http://localhost:3000/uploads/${file.filename}`
    res.send(file)
  })

  app.post('/admin/api/login', async (req, res) => {
    const { userName, password } = req.body
    // 1、根据用户名找用户
    const user = await AdminUser.findOne({ userName }).select('password')
    if (!user) {
      return res.status(422).send({
        message: '用户不存在'
      })
    }
    // 2、校验密码
    const isValid = require('bcrypt').compareSync(password, user.password)
    if (!isValid) {
      return res.status(422).send({
        message: '密码错误'
      })
    }
    // 3、返回token
    const token = jwt.sign({ id: user._id }, app.get('secret'))
    res.send({ token })
  })

}
