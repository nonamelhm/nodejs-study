// mongoose使用 前提得启动mongoose
// 1-安装依赖
// 2-引入依赖
const mongoose = require('mongoose');

// 3-连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/user');
// 补充说明：1-设置strictQuery为true
mongoose.set('strictQuery', true);

// 设置回调
// 连接成功的回调  补充说明：2-once：事件回调函数只执行一次
mongoose.connection.on('open', () => {
    console.log('连接成功!');
})
// 连接错误的回调
mongoose.connection.on('error', (err) => {
    console.log('连接错误：')
    console.error(err);
})
// 连接关闭的回调
mongoose.connection.on('close', () => {
    console.log('连接关闭');
})

// 关闭连接
setTimeout(function () {
    console.log('连接关闭');
    mongoose.disconnect();
}, 2000)
