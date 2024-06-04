// 请求报文之请求体

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // ----请求体
    // 定义请求体内容
    let body = '';
    request.on('data', (chunk) => {
        body += chunk;
    })
    request.on('end', () => {
        console.log('请求体内容：')
        console.log(body);
        console.log('--------end--------------')
        response.end('hello world!');
    })
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})
