// 文件追加写入
const fs = require('fs');
// 异步追加
fs.appendFile('./info.txt', '\r\n哈哈哈追加内容下！', err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('追加内容成功！')
})
//同步追加内容
fs.appendFileSync('./infoSync.txt', '\r\n同步追加内容看看！');
// 异步追加内容
fs.writeFile('./info.txt', '\r\n哈哈哈writeFile追加！', {flag: 'a'}, err => {
    if (err) {
        console.error('追加错误：');
        console.error(err);
        return;
    }
    console.log('追加成功！')
})
