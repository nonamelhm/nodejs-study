/** 批量重命名
 * 需求：将code文件夹里面的文件
 * 名称为前面为1-9的命名为01-09
 */
// 思路
// 1-读取readdirSync里面的文件名称  fs.readdirSync(path,callback)
// 2-重命名renameSync fs.renameSync(path,callback)
const fs = require('fs');
const files = fs.readdirSync(__dirname + '/code');
console.log('名称为：');
console.log(files);
// 读取文件修改
files.forEach(file => {
    const oldPath = __dirname + '/code/' + file;
    // 利用正则表达式_前面是一位数的补0
    const newFileName = file.replace(/^(\d)_(.+)$/i, "0$1_$2");
    const newPath = __dirname + '/code/' + newFileName;
    //重命名
    fs.renameSync(oldPath, newPath);
})


