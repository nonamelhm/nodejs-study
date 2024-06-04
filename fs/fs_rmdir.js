// 删除文件夹
const fs = require('fs');
//递归删除 不推荐使用rmdir 推荐使用rm
fs.rmdir('./a',{ recursive: true }, (err) => {
    if(err){
        console.log('删除文件夹出错');
        console.error(err);
        return;
    }
    console.log('删除文件夹成功！');
})
fs.rmdirSync('./test2', {recursive: true});

//rm删除
fs.rm('./newFile',{ recursive: true }, (err) => {
    if(err){
        console.log('删除文件夹出错2：');
        console.error(err);
        return;
    }
    console.log('删除文件夹成功2！');
})
fs.rmSync('./test', {recursive: true});
