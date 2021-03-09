const path = require('path')
const Koa = require('koa')
const koaStatic = require('koa-static')
const error = require('koa-json-error')
const bodyParser = require('koa-bodyparser')
const cors = require('@koa/cors')
const parameter = require('koa-parameter')

const app = new Koa()


const routeing = require('./routes')


let options = {
  postFormat: (e, { stack, ...rest }) => process.env.NODE_ENV === 'production' ? rest : { stack, ...rest }
}


// 处理跨域
app.use(cors())
// 解析body
app.use(bodyParser({
  onerror:  (err, ctx) => ctx.throw('body parse error', 422)
}))
// 处理静态资源
app.use(koaStatic(path.join(__dirname, 'public')))
// 处理错误
app.use(error(options))
// 参数校验
app.use(parameter(app))
// 路由
routeing(app)

app.listen(4000)
