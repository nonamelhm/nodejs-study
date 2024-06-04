// 文件夹操作——读取文件夹
const fs = require('fs');
// 创建文件
fs.readdir('./newFile', (err, data) => {
    if (err) {
        console.log('读取文件夹失败：');
        console.error(err);
        return;
    }
    console.log('读取文件夹成功');
    console.log(data);
})
// 读取文件夹
fs.readdir('./file', (err, data) => {
    if (err) {
        console.log('读取文件夹失败2：');
        console.error(err);
        return;
    }
    console.log('读取文件夹成功2');
    console.log(data);
})
const readfileData = fs.readdirSync('./test2');
console.log('同步读取文件夹');
console.log(readfileData);


