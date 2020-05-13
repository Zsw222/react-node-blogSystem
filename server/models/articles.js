const mongoose = require('mongoose');
const articleSchema = new mongoose.Schema({
    title:{type:String,required:[true,"title 是必须的"]},
    author:{type:String,required:[true,"author 是必须的"]},
    link:{type:String,required:[true,"link 是必须的"]},
    category:{type:String,required:[true,"category 是必须的"]},
    label:{type:Array,required:[true,"labels 是必须的"]},
    remark:String,
    article:String,
  },{collection:'article'})

  // 定义一个模型类
module.exports = mongoose.model('article', articleSchema)