const jsonwebtoken = require('jsonwebtoken')
const { secret } = require('../config')
const User = require('../mongodb/schema/user')

const { ciphertext, originalText } = require('../utils/crypto')

class UserController {
  async checkOwner(ctx, next) {
    console.log(ctx.params)
    console.log(ctx.state.user)
    await next()
  }
  async register(ctx) {
    ctx.verifyParams({
      mobile: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })

    const { mobile } = ctx.request.body
    const repeatedUser = await User.findOne({ mobile })
    if (repeatedUser) {  // 校验用户名是否已存在
      ctx.throw(409, '用户名已存在')
    }

    const opts = ctx.request.body
    opts.password = ciphertext(opts.password)

    const user = new User(opts)
    const saveUser = await user.save() // 保存数据

    if (saveUser) {
      ctx.body = {
        code: 200,
        msg: '注册成功'
      }
    } else {
      ctx.body = {
        code: 200001,
        msg: '注册失败'
      }
    }
  }
  async login(ctx) {
    ctx.verifyParams({
      mobile: { type: 'string', required: true },
      password: { type: 'string', required: true }
    })

    // 从数据库获取user
    const opts = ctx.request.body
    const user = await User.findOne({ mobile: opts.mobile })

    if (!user) {
      ctx.throw(401, '用户名或密码不正确')
    }

    const { _id, mobile, password } = user

    if (originalText(password) !== opts.password) {
      ctx.throw(401, '用户名或密码不正确')
    }

    const token = jsonwebtoken.sign({ _id, mobile }, secret, { expiresIn: '1d' })  // 登录成功返回jwt加密后的token信息
    ctx.body = {
      code: 200,
      data: {
        token
      },
      msg: '登录成功'
    }
  }
}

module.exports = new UserController()
