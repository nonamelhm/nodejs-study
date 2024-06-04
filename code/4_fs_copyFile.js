/** fs练习_复制文件
 * 将writeSteam.txt内容复制，新建writeStreamCopy.txt
 */
// 思路
// 1- readFile读取内容
// 2- writeFile新建文件
// 1、同步读取写入
const fs = require('fs');
// 读取
const readDataCopy = fs.readFileSync('./writeStream.txt');
// 写入
fs.writeFileSync('./writeStreamCopy.txt', readDataCopy);
console.log('测试内存：');
// PS:注释下面流式读取 得出内存
console.log(process.memoryUsage());// 28119040字节 ➗1024  约等于 281366.25kb ➗1024  约等于 274.78Mb
console.log('------------------------');
// 2、流式读取写入
//创建读取流对象
const rsCopy = fs.createReadStream('./writeStream.txt');
// 创建写入流对象
const wsCopy = fs.createWriteStream('./writeStreamCopyStream.txt');
// 1-绑定data事件
rsCopy.on('data', chunk => {
    wsCopy.write(chunk);
})

// 2-on('data')方法复制或直接使用 管道 直接复制
// rsCopy.pipe(wsCopy);

// rsCopy.on('end', () => {
//     console.log('测试内存：');
//     // PS:注释上面直接读取 得出内存
//     console.log(process.memoryUsage());//  28434432字节 ➗1024  约等于 27768kb ➗1024  约等于 27.117Mb
//     console.log('------------------------');
// })
