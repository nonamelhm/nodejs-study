// fs重命名
const fs = require('fs');

//重命名：将文件1重命名为infoRename.txt
fs.rename('./info.txt', './infoRename.txt', err => {
    if (err) {
        console.error('重命名失败：');
        console.error(err);
        return;
    }
    console.log('重命名成功！');
})

// 确保目标目录存在
if (!fs.existsSync('./file')) {
    fs.mkdirSync('./file');
}

// 移动：将重命名后的文件1移动到file文件夹，命名为info.txt
fs.rename('./infoSync.txt', './file/infoMove.txt', err => {
    if (err) {
        console.error('移动失败：');
        console.error(err);
        return;
    }
    console.log('移动成功！');
})
