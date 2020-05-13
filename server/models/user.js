const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    username: String,
    password: String,
    // isAdmin: {
    //   type: Boolean,
    //   default: false
    // }
  },{collection:'user'})

  // 定义一个模型类
module.exports = mongoose.model('user', userSchema)