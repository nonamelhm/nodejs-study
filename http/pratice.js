/** http练习
 * 需求
 * 请求类型 get 地址/login 返回 “登录页面” 四字
 * 请求类型 get 地址/reg 返回 “注册页面” 四字
 */
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let url = new URL(req.url, 'http://127.0.0.1:9000');
        //设置中文防止乱码
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        if (url.pathname === '/login') {
            res.end('登录页面');
        } else if (url.pathname === '/reg') {
            res.end('注册页面');
        } else {
            res.end('您当前访问页面不存在！');
        }
    } else {
        res.end('您当前访问页面不存在！');
    }
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000');
})
