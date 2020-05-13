const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    key:String,
    title:{type:String,required:[true,"title 是必须的"]},
    remark:String,
  },{collection:'category'})

  // 定义一个模型类
module.exports = mongoose.model('category', categorySchema)