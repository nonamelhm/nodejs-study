// 创建服务
// 1.导入http模块
const http = require('http');
// 2.创建服务对象
const server = http.createServer((request, response) => {
    //设置响应内容
    response.end('Hello World! Hello node.js Server!');
});
// 3.监听端口，启动服务
server.listen(9000, () => {
    console.log("Server started on port 9000...");
    console.log('http://localhost:9000/');
})
