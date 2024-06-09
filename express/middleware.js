// 认识中间件
/** 需求
 * 追加日志记录，写入log.txt文件
 */
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 全局中间件
// 定义
function recordMiddleWare(req, res, next) {
    // 判断是否有文件 没有就创建
    const filePath = path.resolve(__dirname, './log.txt');
    //  判断文件是否存在，如果不存在就创建一个空文件
    if (!fs.existsSync(filePath)) {
        fs.writeFileSync(filePath, '');
    }
    // 获取url和ip地址
    const {url, ip} = req;
    // 每个请求过来的路由信息都保存到日志记录文件
    fs.appendFileSync(path.resolve(__dirname, `./log.txt`), `${url}    ${ip}\r\n`);
    // 调用next
    next();
}

// 调用中间件函数
app.use(recordMiddleWare);

app.get('/login', (req, res) => {
    res.send('login success!');
})

app.listen(3000, () => {
    console.log('server started at port 3000');
    console.log('http://localhost:3000');
})
