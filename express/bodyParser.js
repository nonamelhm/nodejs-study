// body-parse获取请求体
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 获取中间件函数
//处理queryString格式的请求体
const urlParser = bodyParser.urlencoded({extended: false});
//处理json格式的请求体
const jsonParser = bodyParser.json();

//响应login页面
app.get('/login', urlParser, (req, res) => {
    res.sendFile(__dirname + '/login.html');
})
//获取请求体数据
app.post('/login', urlParser, (req, res) => {
    // 获取请求体数据
    console.log(req.body);
    res.send('用户名:' + req.body.username + '<br/>密码:' + req.body.password);
})
app.listen(3000, () => {
    console.log('Express server started');
    console.log('http://localhost:3000');
})
