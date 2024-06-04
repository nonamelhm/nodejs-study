// 设置响应头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 设置响应
    //响应状态码
    response.statusCode = 200;
    //设置响应状态信息
    response.statusMessage = 'iloveyou';
    // 设置响应头
    // 设置编码格式 防止中文乱码
    response.setHeader('content-type', 'text/html; charset=utf-8');
    // 自定义响应头
    response.setHeader('myHeaders', 'Authorization');
    //响应体 write可有多个
    response.write('哈哈哈哈 响应体');
    response.write('哈哈哈哈2 响应体');
    // 响应体 end 只有一个
    response.end('bye!!')
});
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})
