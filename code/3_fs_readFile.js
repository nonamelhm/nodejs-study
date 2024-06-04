// 文件读取
const fs = require('fs');
// 异步读取
fs.readFile('./info.txt', (err, data) => {
    if (err) {
        console.error('读取错误：');
        console.error(err);
        return;
    }
    console.log('读取成功！')
    console.log(data.toString());
})
console.log('-----------------');
// 同步读取
const readDataSync = fs.readFileSync('./infoSync.txt');
console.log('同步读取：')
console.log(readDataSync.toString());
console.log('-----------------');
// 流式读取
// 创建视频流对象
const rs = fs.createReadStream('./writeStream.txt');
// 绑定data事件 chunk 块
rs.on('data', chunk => {
    console.log('---------!!----------');
    // 字符串类文件读取可以，要是读取的的mp4文件，用toString输出将会乱码，直接console.log(chunk)即可
    console.log(chunk.toString());
    console.log('---------!!----------');
})
// end可选事件
rs.on('end', () => {
    console.log('流式读取完成！');
})
