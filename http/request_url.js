// 请求报文之url

//引入http模块
const http = require("http");
const url = require("url");
//创建服务对象
const server = http.createServer((request, response) => {
    // ----url
    console.log('请求路径：')
    console.log(url.parse(request.url).pathname);
    console.log('查询字符串：')
    console.log(url.parse(request.url,true).query);
    console.log(url.parse(request.url,true).query.username);
    console.log(url.parse(request.url,true).query.password);
    console.log('---------------');
    response.end('hello world!');

})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})
