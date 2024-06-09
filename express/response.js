const express = require('express');
const app = express();
app.get('/', (req, res) => {
//     //原生响应也兼容
//     res.statusCode = 200;
//     res.statusMessage = 'asasa';
//     res.setHeader('hahha', 'hhh');
//     res.write('hello world!');
//     res.end('res content');

// express设置状态码
// res.status(200);
// // express设置请求头
// res.setset('hahaha~', 'hhh');
// // express响应内容 做了封装 中文不乱码
// res.send('你好');

// 连贯操作
    res.status(200).set('hahaha~', 'hhh').send('你好 express');
})
// 其它响应
app.get('/other', (req, res) => {
    //1-设置重定向
    // res.redirect('http://www.baidu.com');
    // 2-下载响应
    // res.download(__dirname + '/singers.json');
    // 3-响应json
    // res.json({
    //     "singer_name": "林俊杰",
    //     "other_name": " JJ Lin",
    //     "id": 2
    // });
    //4-响应文件内容
    res.sendFile(__dirname + '/test.html');
})

app.listen(3000, () => {
    console.log('server started on port 3000');
    console.log('http://localhost:3000');
});
