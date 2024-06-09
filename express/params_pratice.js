/** 需求
 * 通过路由id返回歌手名称及其它名称
 */
const express = require('express');
const app = express();
const fs = require('fs');
// 读取歌手假数据json文件
const singersData = fs.readFileSync(__dirname + '/singers.json').toString();
app.get('/singer/:id', (req, res) => {
    const {id} = req.params;
    const matchData = JSON.parse(singersData).singers.find(item => item.id === Number(id));
    res.setHeader('content-type', 'text/html; charset=utf-8');
    if (matchData) {
        res.end(`名称：${matchData.singer_name},其它名称:${matchData.other_name}`);
    } else {
        res.end('No Such a Singer');
    }
})

app.listen(3000, () => {
    console.log('Express server started');
    console.log('http://localhost:3000');
})
