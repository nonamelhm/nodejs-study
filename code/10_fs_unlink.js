// 文件删除
const fs = require('fs');
//unlink删除
fs.unlink('./info.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('删除成功！');
})
fs.unlinkSync('./infoSync.txt');

// rm删除 nodejs14.4版本以上
fs.rm('./writeStream.txt', (err) => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('删除成功2！');
})
fs.rmSync('./writeStreamCopyStream.txt');
