const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')


class UserController {
  async checkOwner(ctx, next) {
    console.log(ctx.params)
    console.log(ctx.state.user)
    await next()
  }
  async login(ctx) {
    ctx.verifyParams({
      username: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })

    // 从数据库获取user
    const user = { _id: 1, username: 'txw' }

    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }

    const { _id, username } = user
    const token = jsonwebtoken.sign({ _id, username }, secret, { expiresIn: '1d' })  // 登录成功返回jwt加密后的token信息
    ctx.body = { token }
  }
}

module.exports = new UserController()
