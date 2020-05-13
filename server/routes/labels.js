
var express = require('express');
var router = express.Router();
var jwtauth = require('../auth/jwtAuth')
const labels = require('../models/labels.js')
// 查
router.use(jwtauth).get("/list", (req, res, next) => {
    // 查询数据库
    labels
        .find({})
        .then((resData) => {
            if (!resData) {
                res.json(formate(2000, '', 'error'))
                return
            }
            let newRes=[]
            for(let i=0;i<resData.length;i++){
                let temp=JSON.parse(JSON.stringify(resData[i]))
                temp['key']=i+1
                newRes.push(temp)
            }
            res.json(formate(200, newRes, 'ok'))
        })
})
// 增
router.use(jwtauth).post("/list", (req, res, next) => {
    if (!req.body.title || req.body.title === '') {
        res.json(formate(2000, '', 'error'))
        return;
    }
    let resp = {
        title: req.body.title,
        remark: req.body.remark,
        color:req.body.color
    }
    labels.create(resp, function (err, response) {
        if (err){
            res.json(formate(2000, '', err.message));
            return
        }
        res.json(formate(200, '', 'ok'))
    })
})
// 改
router.use(jwtauth).put("/list", (req, res, next) => {
    // 查询数据库
    if (!req.body.title || req.body.title === '') {
        res.json(formate(2000, '', 'error'))
        return;
    }
    let resp = {
        title: req.body.title,
        remark: req.body.remark,
        color:req.body.color
    }
    labels.update({_id:req.body._id},{$set:resp}, function (err, response) {
        if (err) throw err;
        res.json(formate(200, '', 'ok'))
    })
})
// 删
router.use(jwtauth).delete("/list", (req, res, next) => {
    // 查询数据库
    if (!req.body._id) {
        res.json(formate(2000, '', 'error'))
        return;
    }
    labels.find({_id:req.body._id}).remove({},function(err,response){
        if (err) throw err;
        res.json(formate(200, '', 'ok'))
    })
})




function formate(code, data, msg) {
    let datas = {
        "data": data,
        "code": code,
        "msg": msg
    }
    return datas
}
module.exports = router;