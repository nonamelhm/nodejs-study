/** 需求
 * 新建一个文件夹为座右铭.txt（info.txt)
 * 写入内容为 三人行，必有我师焉。
 */
const fs = require("fs");
//写入文件 异步写入
fs.writeFile('./info.txt', '三人行，必有我师焉！', (err) => {
    if (err) {
        console.error("写入错误：")
        console.error(err);
        return;
    }
    console.log("写入成功！")
})

//写入文件
// 同步写入
fs.writeFileSync('./infoSync.txt', '测试同步写入');

// 流式写入
const ws = fs.createWriteStream('./writeStream.txt');
ws.write('床前明月光\r\n');
ws.write('疑是地上霜\r\n');
ws.write('举头望明月\r\n');
ws.write('低头思故乡\r\n');
//关闭
ws.end();
