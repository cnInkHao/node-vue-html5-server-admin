
const jwt = require('jsonwebtoken')
const assert = require('http-assert')

const AdminUser = require('../models/AdminUser')

module.exports = options => async (req, res, next) => {
  const token = String(req.headers.authorization || '').split(' ').pop()
  console.log(123123123123123123, token, assert(token, 401, '请先登录'));
  
  assert(token, 401, '请先登录')

  const { id } = jwt.verify(token, req.app.get('secret'))
  assert(id, 401, '请先登录')

  req.user = await AdminUser.findById(id)
  assert(req.user, 401, '请先登录')
  await next()
}