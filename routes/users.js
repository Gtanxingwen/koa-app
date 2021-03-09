const Router = require('@koa/router')
const router = new Router({ prefix: '/users' }) // 路由前缀

router.get('/', (ctx) => {
  console.log('get...')
  ctx.body = { name: 'txw', age: 27 }
})

router.post('/', (ctx) => {
  console.log('post...')
  ctx.verifyParams({  // 入参格式校验
    username: { type: 'string', required: true },
    password: { type: 'string', required: true }
  })
  ctx.body = { name: 'txw', age: 27 }
})

module.exports = router
