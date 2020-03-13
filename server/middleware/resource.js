
const inflection = require('inflection')

module.exports = options => async (req, res, next) => {
  const modelName = inflection.classify(req.params.resource)
  // console.log(req.params.resource, modelName);

  req.Model = require(`../models/${modelName}`)
  next()
}