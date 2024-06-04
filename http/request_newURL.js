// 请求报文之url

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 2- 通过new URL方式获取
    let url = new URL(request.url, 'http://localhost:9000');
    console.log(url);
    console.log('请求路径：')
    console.log(url.pathname);
    console.log('查询字符串');
    console.log(url.searchParams.get('username'));
    console.log('------------------')
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})
