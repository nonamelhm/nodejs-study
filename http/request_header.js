// 请求报文之请求头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 1-----请求头
    //请求方法
    console.log('请求方法');
    console.log(request.method);
    // 请求http版本
    console.log('请求http版本');
    console.log(request.httpVersion);
    // 请求头
    console.log('请求url');
    console.log(request.headers.host);
    // 请求路径
    console.log('请求路径');
    console.log(request.url);
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})
