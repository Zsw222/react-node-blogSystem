const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/classWeb');

// 为这次连接绑定事件
const db = mongoose.connection;
db.once('error',() => console.log('Mongo connection error'));
db.once('open',() => console.log('Mongo connection successed'));


const userSchema = new mongoose.Schema({
    password: String,
    username: String,
})


const Models = {
    User: mongoose.model('user', userSchema),
}

module.exports = Models;