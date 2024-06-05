// 完善错误处理
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1');
    const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            console.error(err);
            switch (err.code) {
                case 'ENOENT':
                    res.statusCode = 404;
                    res.end('<h1>404 Not Found!</h1>');
                case 'EPERM':
                    res.statusCode = 403;
                    res.end('<h1>403 Forbidden!</h1>');
                default:
                    res.statusCode = 500;
                    res.end('<h1>Internal Server Error</h1>');
            }
            return;
        }
        res.end(data);
    })
});

server.listen(9000, () => {
    console.log('server started');
    console.log('http://localhost:9000/');
})
