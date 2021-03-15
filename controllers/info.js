const Info = require('../mongodb/schema/info')
const User = require('../mongodb/schema/user')

class InfoController {
  async info(ctx) {
    const { _id } = ctx.state.user
    const info = await User.findOne({ _id }).populate({
      path: 'info'
    })
    console.log(info)
    ctx.body = 1
  }
}

module.exports = new InfoController()
