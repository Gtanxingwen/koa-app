const jwt = require('koa-jwt')
const { secret } = require('../config')
const Router = require('@koa/router')
const router = new Router({ prefix: '/user' }) // 路由前缀

const { login, checkOwner, register } = require('../controllers/user')
const { info } = require('../controllers/info')

const auth = jwt({ secret })  // jwt鉴权

router.get('/', (ctx) => {
  console.log('get...')
  ctx.body = { name: 'txw', age: 27 }
})

router.get('/info', auth, info)

router.post('/login', login)
router.post('/register', register)

module.exports = router
