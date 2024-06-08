// 初认识express
// 引入模块
const express = require('express');
// 创建应用对象
const app = express();
const port = 3000;
// 创建路由
app.get('/home', (req, res) => {
    res.end('hello world');
})
//监听端口 启动服务
app.listen(port, () => {
    console.log('Express server started');
    console.log('http://localhost:9000/');
})
