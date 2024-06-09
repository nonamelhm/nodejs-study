// 初认识express
// 引入模块
const express = require('express');
// 创建应用对象
const app = express();
const port = 3000;
// 1-创建路由 get方法
app.get('/home', (req, res) => {
    res.end('hello world');
})

// 2-创建路由 get方法
app.post('/login', (req, res) => {
    res.end('hello login');
})

//3- 无论get或post方法
app.all('/test', (req, res) => {
    res.end('no matter methods');
})

//4-上面匹配不上的路由规则
app.all('*', (req, res) => {
    res.end('404 No Found');
})
//监听端口 启动服务
app.listen(port, () => {
    console.log('Express server started');
    console.log('http://localhost:9000/');
})
