const express = require('express');
const app = express();
//通配符  通过http://localhost:3000/login/1212121访问即可知
app.get('/login/:id', (req, res) => {
    // 获取id
    console.log(req.params.id);
    res.end('login success!');
})
app.get('/', (req, res) => {
    res.end('hello');
})
//监听端口 启动服务
app.listen(3000, () => {
    console.log('Express server started');
    console.log('http://localhost:3000');
})
