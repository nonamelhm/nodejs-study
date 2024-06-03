// 文件夹操作_创建文件夹
const fs = require('fs');
// 创建文件
//先判断是否存在
if (!fs.existsSync('./newFile')) {
    fs.mkdir('./newFile', err => {
        if (err) {
            console.log('创建失败：');
            console.error(err);
            return;
        }
        console.log('创建成功');
    })
}
//先判断是否存在
if (!fs.existsSync('./a/b/c', {recursive: true})) {
// 递归创建文件夹
    fs.mkdir('./a/b/c', {recursive: true}, err => {
        if (err) {
            console.log('创建失败2：');
            console.error(err);
            return;
        }
        console.log('创建成功2');
    })
}
//先判断是否存在
if (!fs.existsSync('./test2/d/e', {recursive: true})) {
    fs.mkdirSync('./test2/d/e', {recursive: true});
}


