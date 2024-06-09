// 中间件实践
/** 需求
 *  针对/admin /setting的请求，要求URL携带code=521参数，如未携带提示【暗号错误】
 */
const express = require('express');
const app = express();

// 定义中间件
function checkCodeMiddleWare(req, res, next) {
    // 获取code
    const {code} = req.query;
    if (Number(code) === 521) {
        next();
    } else {
        next("【暗号错误】");
    }
}


//调用中间件
app.get('/admin', checkCodeMiddleWare, (req, res) => {
    res.send('admin success!');
})
//调用中间件
app.get('/setting', checkCodeMiddleWare, (req, res) => {
    res.send('setting success!');
})
app.get('/registry', (req, res) => {
    res.send('registry success!');
})
app.get('*', (req, res) => {
    res.send('<h1>404 Not Found</h1>');
})
app.listen(3000, () => {
    console.log('server started at port 3000');
    console.log('http://localhost:3000');
})
