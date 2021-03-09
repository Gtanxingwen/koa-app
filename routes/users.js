const jwt = require('koa-jwt')
const { secret } = require('../config')
const Router = require('@koa/router')
const router = new Router({ prefix: '/users' }) // 路由前缀

const { login, checkOwner } = require('../controllers/users')

const auth = jwt({ secret })  // jwt鉴权

router.get('/', (ctx) => {
  console.log('get...')
  ctx.body = { name: 'txw', age: 27 }
})

router.get('/info', auth, (ctx) => {
  // 获取用户其他信息
  const { _id, username } = ctx.state.user
  ctx.body = { id: _id, username }
})

router.post('/login', login)

module.exports = router
