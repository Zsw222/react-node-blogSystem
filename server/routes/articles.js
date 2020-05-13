var express = require('express');
var router = express.Router();
var jwtauth = require('../auth/jwtAuth')
const Article = require('../models/articles.js')
const Category = require('../models/category.js')
const Labels = require('../models/labels.js')
router.use(jwtauth).get("/list", async (req, res, next) => {

    let articleData = () => {
        return new Promise((resolve, reject) => {
            // 查询数据库
            Article.find({}).then((resData) => {
                    if (!resData) {
                        res.json(formate(2000, '', 'err'))
                        return
                    }
                    resolve(resData)
                })
        })
    }
    let resData = await articleData()
    let categoryData = (item) => {//查询分类id返回分类名
        return new Promise((resolve, reject) => {
            Category.find({
                '_id': item.category
            }).then((res) => {
                item.category = res[0].title
                Labels.find({
                    '_id': {$in:item.label}
                }).then((res) => {
                    item.label = res.map(i=>i.title)
                    resolve(item)
                })
                // resolve(item)
            })
            
        })
    }
    let returnDatas = []
    for(let item of resData){
        let resultData = await categoryData(item)
        // let resultData2 = await labelData(item)
        returnDatas.push(resultData)
        // returnDatas.push(resultData2)
    }

    res.json(formate(200, returnDatas, 'ok'))
})
// 增
router.use(jwtauth).post("/list", (req, res, next) => {
    let resp = req.body
    console.log(req.body)
    Article.create(req.body, function (err, response) {
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