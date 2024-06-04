/**  查看资源状态
 *  fs.stat()
 */
const fs = require('fs');
// 异步获取状态
fs.stat('./info.txt', (err, data) => {
    if(err){
        console.log('查看资源失败：')
        console.log(err);
        return;
    }
    console.log('异步查看资源成功！详细信息如下：')
    console.log(data);
    //判断是否是一个文件方法 isFile()
    console.log('是文件吗？')
    console.log(data.isFile());
    // 判断是否是一个文件夹方法 isDirectory()
    console.log("是文件夹吗？")
    console.log(data.isDirectory());
})
// 同步获取状态
const data = fs.statSync('./info.txt');
console.log('同步查看资源成功！详细信息如下：')
console.log(data);
