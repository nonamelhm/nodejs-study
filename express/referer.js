const express = require('express');
const app = express();
// 定义全局防盗链中间件 判断请求头referer
app.use((req, res, next) => {
    const referer = req.get('referer');
    if (referer) {
        // 实例化
        const url = new URL(referer);
        const hostname = url.hostname;
        console.log(hostname);
        if (hostname !== '127.0.0.1') {
            res.status(404).send('<h1>404 Not Found</h1>');
            return;
        }
    }
    next();
})
// 读取静态资源
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
    console.log('Express server listening on port 3000');
    console.log('http://localhost:3000');
})
