/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    const html = fs.readFileSync(__dirname+'/res_pratice.html');
    res.end(html);
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})
