const mongoose = require('mongoose');
const categorySchema = new mongoose.Schema({
    title:{type:String,required:[true,"title 是必须的"]},
    remark:String,
    color:{type:String,required:[true,"color 是必须的"]},
  },{collection:'labels'})

  // 定义一个模型类
module.exports = mongoose.model('labels', categorySchema)