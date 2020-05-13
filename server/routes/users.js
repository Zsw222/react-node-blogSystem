// import app from '../app';
var express = require('express');
var router = express.Router();
var jwt = require('jwt-simple');

// var handle=require('./dbhandle.js') var db=require('../models/model.js')
const User = require('../models/user.js')
var crypto = require('crypto')
const secretkey='ZSW_SHUAIGE'//token秘钥
const tokenExpiresTime = 1000 * 60 * 60 * 24 * 7//token过期时间
router.post("/login", (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    // 空数据
    if (!username || !password) {
        res.json(formate(2000, '', '姓名或密码不能为空'))
        return
    }
    // 查询数据库
    User
        .findOne(req.body)
        .then((resData) => {
            if (!resData) {
                res.json(formate(2000, '', '用户名或密码错误！'))
                return
            }
            let token = jwt.encode({
              iss: username,
              expires: Date.now() + tokenExpiresTime
          }, secretkey);
            res.json({
                token: token,
                code:200
            });
            // res.json(formate(200,'','登录成功'))
        })
})
router.post("/user", (req, res, next) => {
    const username = req.body.username
    const password = req.body.password
    // 空数据
    if (!username || !password) {
        res.json(formate(2000, '', '姓名或密码不能为空'))
        return
    }
    let resp = {
        username: username,
        password: password
    }
    User.create(resp, function (err, response) {
        if (err){
            res.json(formate(2000, '', err.message));
            return
        }
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
