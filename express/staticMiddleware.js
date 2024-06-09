// 静态资源中间件
const express = require('express');
const app = express();
//静态资源中间件请求
app.use(express.static(__dirname + '/public'));

// 监听端口 启动服务
app.listen(3000, () => {
    console.log("Server running on port 3000");
    console.log('http://localhost:3000');
})
