const mongo = require('joiql-mongo')
const convert = require('koa-convert')
const graphqlHTTP = require('koa-graphql')
const { values } = require('lodash')

module.exports = (models) => {
  const api = mongo.models(...values(models))
  return convert(graphqlHTTP({ schema: api.schema, graphiql: true }))
}
