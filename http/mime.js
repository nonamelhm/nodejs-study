// 设置mime
const http = require('http');
const path = require('path');
const server = http.createServer((req, res) => {
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1');
    const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    // 得到后缀名
    const extname = path.extname(filepath).slice(1);
    // 根据请求文件后缀名，设置相应的mime
    let mimes = {
        html: 'text/html',
        css: "text/css",
        js: 'text/javascript',
        png: 'images/png',
        jpg: 'images/jpeg',
        gif: 'images/gif',
        mp4: 'video/mp4',
        mp3: 'audio/mp3',
        json: 'application/json'
    }
    // 获取对应类型
    const type = mimes[extname];
    // 判断
    if (type) {
        if (extname === 'html') {
            res.setHeader('Content-Type', type + ';charset=utf-8');
        } else {
            res.setHeader('Content-Type', type);
        }
    } else {
        res.setHeader('Content-Type', 'application/actet-stream');
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
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
