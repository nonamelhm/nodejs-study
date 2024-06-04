// path模块
const fs = require('fs');
const path = require('path');


// resolve模块  写入文件
// 建议绝对路径 +拼接+ 相对路径 写法 path.resolve(绝对路径+相对路径)
fs.writeFileSync(path.resolve(__dirname, './test.txt'), 'peace and love');
// 不建议这样写 最好不要 绝对路径＋绝对路径写法  /path为绝对路径
// 这样写的意思是 /path的绝对路径  +拼接+ ./test.txt
// fs.writeFileSync(path.resolve(__dirname, '/path', './test.txt'), 'peace and love');


// sep分隔符 ：不同操作系统的分隔符不同，获取不同操作系统下的分隔符
console.log(path.sep);  //windows  / linux \  macos /

// parse  解析路径并返回对象
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 解析路径
console.log(path.parse(str));  // {...}

// basename  获取的文件名
console.log(path.basename(str)); //path.js

// dirname 获取文件目录名
console.log(path.dirname(str)); //  /Users/lhm/Documents/nodejs/path

// extname 获取文件扩展名
console.log(path.extname(str)); //  .js

