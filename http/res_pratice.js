/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    //按路径区分 请求资源 进行 响应。不要都响应此html
    // const {pathname} = new URL(req.url, 'http://127.0.0.1')
    // if (pathname === '/') {
    //     //注意：此响应头得在html里，否则可能会没效果
    //     res.setHeader('content-type', 'text/html;charset=UTF-8');
    //     const html = fs.readFileSync(__dirname + '/res_pratice.html');
    //     res.end(html);
    // } else if (pathname === '/res_pratice.css') {
    //     const css = fs.readFileSync(__dirname + '/res_pratice.css');
    //     res.end(css);
    // } else if (pathname === '/pratice_click.js') {
    //     const js = fs.readFileSync(__dirname + '/pratice_click.js');
    //     res.end(js);
    // } else {
    //     res.end('<h1>404 Not Found!</h1>');
    // }
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1')
    const filename = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
            console.error(err);
            return;
        }
        res.end(data);
    })
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})
