const jwt = require('jwt-simple');
const UserModel = require('../models/user');
module.exports = function(req, res, next) {
  if(req.method==='OPTIONS'){
    next();
    return
  }
    // code goes here
    let token = (req.body && req.body.access_token) || (req.query && req.query.access_token) || req.headers['x-access-token'];
    if (token) {
        try {
          var decoded = jwt.decode(token, 'ZSW_SHUAIGE');
          // handle token here
          if (decoded.exp <= Date.now()) {
            res.json({msg:'token失效',code:401})
            return
          }
          UserModel.findOne({ username: decoded.iss }, function(err, user) {
            if(!user){
                res.json({msg:'用户不存在',code:401})
                return
            }
            next()
          });
      
        } catch (err) {
            res.json({msg:'token失效',code:401})
        }
      } else {
        res.json({msg:'没有权限',code:401})
        // next();
      }
};