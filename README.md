# nodejs学习实操及笔记
## 为什么学nodejs
1. 可以让别人访问我们编写的网页
2. 为后续的框架学习打下基础，三大框架vue react angular离不开nodejs
## nodejs是什么
* 官网：nodejs是一个开源的、跨平台的运行JavaScript的运行环境。 
* 通俗理解: 一款应用程序，一款软件，可以运行JavaScript
## nodejs作用
1. 开发服务器应用
2. 开发工具类应用
3. 开发桌面类应用
## nodejs安装
- [nodejs官网](https://nodejs.org/en/download/package-manager)
- [nodejs中文网](https://nodejs.cn/download/)
- [全部版本安装包淘宝镜像](https://registry.npmmirror.com/binary.html?path=node/v20.13.0/)
> 点击安装，傻瓜式安装。

- PS:推荐使用`nvm`方式安装`nodejs`，这样可实现自由切换版本好。
> 因为有的老项目nodejs可能是12版本的，新项目又是18或者20版本。具体安装自行查阅，目前这边已经安装，忘记哪个博主写的较好就不推荐了。

检测安装是否成功,输入以下命令到命令行，出来版本号代表安装成功
```shell
node -v
```
- 若安装失败，考虑大可能为环境变量配置问题影响

## nodejs初体验
1. 新建hello.js
```javascript
console.log("hello nodejs!");
```
2. 切换到当前目录，终端打开
3. 执行代码，看到 hello nodejs
```shell
node hello.js
```
## nodejs注意事项
* node.js不能使用BOM、DOM的API，可以使用console和定时器API
* node.js中顶级对象为global,也可以用globalThis访问顶级对象
```javascript
// BOM不可用
console.log(window);
console.log(history);
console.log(navigator);
console.log(location)
//DOM不可用
console.log(document);
//global可用 globalthis可用
console.log(global)
//定时器可用
setTimeout(()=>{
    console.log('hello~')
})
```
## Buffer缓冲器
### Buffer概念
1. 概念
* Buffer是一个类似数组的对象，用于固定长度的字节序列
* Buffer本质是一段内存空间，专门用来处理二进制数据
2. 特点
* Buffer大小固定且无法调整
* Buffer性能较好，可以直接对计算机内存进行操作 
* 每个元素的大小为1字节
3.创建Buffer
* alloc
* allocUnsafe
* from
> node.js内置模块Buffer,不需引入，理解为全局变量
```javascript
//1.alloc
let buf = Buffer.alloc(10);
console.log(buf);
console.log('-------')
// 2.allocUnsafe;
let buf_2 = Buffer.allocUnsafe(10000);
console.log(buf_2);
console.log('-------')
//3.from
//打印出ASCII码字符代码表的值
let buf_3 = Buffer.from('hello');
console.log(buf_3);
console.log('-------');
//打印出二进制的值
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);
console.log('-------');
```
### Buffer操作以及注意点
1. 字符串转换（默认采用utf-8方式转换）
```javascript
let buf_4 = Buffer.from([105, 108, 111, 118, 101, 121, 111, 117]);
console.log(buf_4);
console.log('-------');
//1-字符串转换 默认采用utf-8方式转换
const str = buf_4.toString();
console.log(str);
```
2. 元素的读取以及修改
* []进行单个元素的读取以及修改
* 大于255的值，溢出，舍弃高位，留下后8位二进制
* utf-8编码方式，1个汉字对应3个字节
```javascript
let buf_5 = Buffer.from('hello');
//1-[]括号方式进行单个元素的查看 二进制转换的查看
console.log(buf_5[0]);//打印出十进制
console.log(buf_5[0].toString(2));//实际上是01101000
//2-单个元素的修改
// 直接修改
buf_5[0] = 95;
//查看修改后的字符串的值
console.log(buf_5.toString());//输出_ello
//溢出
buf_5[0] = 361;//舍弃高位超出8位的数字 0001 0110 1001
console.log(buf_5);//69  0001被舍弃，留下0110 1001
//中文
let buf_6 = Buffer.from('你好');//utf-8编码方式 1个汉字对应3个中文
console.log(buf_6);//输出<Buffer e4 bd a0 e5 a5 bd>
```
## 计算机基础
### 计算机基本组成
* CPU  中央处理器，运算与控制的核心。工作时会产生大量热量，一般连接一个散热器进行散热。
* 内存  读写速度较快，断电丢失数据
* 硬盘  读写速度较慢，断电不丢失数据
* 主板  CPU 内存 硬盘 通过主板连接在一起
* 显卡  负责处理视频信号，有信息需要在显示器呈现，就会将信号传递到显卡，显卡处理完毕再将信号传递给显示器，显示器最终显示
### 程序运行基本流程
安装好上面CPU等，还需安装操作系统方可运行。 操作系统：
> 操作系统也是一种应用程序，用来管理和调度硬件资源。将操作系统安装到硬盘，电脑即可开机运行。
常见操作系统
* Windows
* Linux
* MacOs
总结：
* 程序一般保存到硬盘中，软件安装的过程就是将程序写入硬盘的过程。
* 程序在运行时会加载进入内存，然后由CPU读取并执行程序
### 进程与线程
> 进程包含一个或多个线程。进程>线程
#### 进程
* 通俗理解为进行中的程序
* 进程是程序的一次执行过程
### 线程
* 线程是一个进程中执行的一个执行流
* 一个线程是属于某个进程的
## fs模块
> 全称：file system 文件系统。fs模块可以实现与硬盘的交互。
> 例如文件的创建、删除、重命名、移动，还有文件内容的写入、读取，以及文件夹的操作。
### 写入文件
* 语法： fs.`writeFile`(file,data[,option],callback)

同步与异步
> 异步：情况比如做饭，按下了煮饭键就去炒菜。同步：类似排队，一个完成接着一个。对效率要求高的基本都是用异步API。
* 异步写入语法： fs.`writeFile`(file,data[,option],callback)
* 同步写入语法： fs.`writeFileSync`(file,data[,option])

```javascript
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

```
### 文件追加写入
> 文件追加多用于`程序日志`，不断往文件追加内容

| 方法 | 说明                        |
|--|---------------------------|
| fs.`appendFile`(file,data[,option],callback) | 异步追加                      |
| fs.`appendFileSync`(file,data[,option]) | 同步追加                      |
| fs.`writeFile`(file,data[,option],callback) | 添加标识异步追加option为`{flag:'a'}` |
```javascript
// 文件追加写入
const fs = require('fs');
// 异步追加
fs.appendFile('./info.txt', '\r\n哈哈哈追加内容下！', err => {
    if (err) {
        console.error(err);
        return;
    }
    console.log('追加内容成功！')
})
//同步追加内容
fs.appendFileSync('./infoSync.txt', '\r\n同步追加内容看看！');
// 异步追加内容
fs.writeFile('./info.txt', '\r\n哈哈哈writeFile追加！', {flag: 'a'}, err => {
    if (err) {
        console.error('追加错误：');
        console.error(err);
        return;
    }
    console.log('追加成功！')
})

```
### 流式写入
> `程序打开一个文件需要消耗资源`，流式写入可以减少文件的次数。
> 流式写入方式适用于`大文件写入或者频繁写入`的场景，writeFile适用于写入`频率较低的场景`。
* 流式读取（减少连接次数，连接后不断开）语法：fs.createWriteStream(path[,option])

参数说明：
* path 文件路径
* options选项配置

返回值 Object

代码示例：
```javascript
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
```
### 文件写入应用场景
`当需要持久化保存数据`的时候，应该想到文件写入
* 下载文件
* 安装软件
* 保存程序日志，如Git
* 编辑器保存文件
* 视频录制
### 文件读取
> 程序从文件中取出其中的数据。

| 方法                                                 | 说明   |
|----------------------------------------------------|------|
| fs.`readFile`(file,data[,option],callback)         | 异步读取 |
| fs.`readFileSync`(file,data[,option])              | 同步读取 |
| fs.`createReadStream`(file,data[,option],callback) | 流式读取 |

代码示例：
```javascript
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

```
### 读取文件应用场景
* 电脑开机
* 程序运行
* 编辑器打开文件
* 查看图片
* 播放视频
* 播放音乐
* Git查看日志
* 上传文件
* 查看聊天记录

### fs练习_复制文件

代码示例：
```javascript
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
```
### 文件重命名和移动
* 异步移动语法 fs.`rename`(oldPath,newPath,callback)
* 同步移动语法fs.`renameSync`(oldPath,newPath)

参数说明
* oldPath:文件当前路径
* newPath:文件新的路径
* callback：操作后的回调

代码示例：

```javascript
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

```
### 文件删除
* 异步删除语法 fs.`unlink`(path,callback)
* 同步删除语法fs.`unlinkSync`(path)

* 异步删除fs.`rm`(path,callback) ps:nodejs14.4版本以上才可用
* 同步删除fs.`rmSync`(path) ps:nodejs14.4版本以上才可用

参数说明:
* path:文件路径
* callback：操作后的回调

代码示例：
```javascript
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

```
### 文件夹操作
* 创建文件夹`mkdir/mkdirSync`
* 读取文件夹`readdir/readdirSync`
* 删除文件夹`rmdir/rmdirSync`

| 方法                  | 说明    |
|---------------------|-------|
| mkdir/mkdirSync     | 创建文件夹 |
| readdir/readdirSync | 读取文件夹 |
| rmdir/rmdirSync     | 删除文件夹 |

PS:判断文件夹是否存在
* 同步判断语法 fs.existsSync(path[,option])

参数说明:
* path:文件路径

#### 创建文件夹
* 异步创建语法：fs.`mkdir`(path,callback)
* 同步创建语法：fs.`mkdirSync`(path)

代码示例：
```javascript
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
```
#### 读取文件夹
* 异步读取语法：fs.`readdir`(path,callback)
* 同步读取语法：fs.`readdirSync`(path)

参数说明：
* path:路径

代码示例
```javascript
// 文件夹操作——读取文件夹
const fs = require('fs');
// 创建文件
fs.readdir('./newFile', (err, data) => {
    if (err) {
        console.log('读取文件夹失败：');
        console.error(err);
        return;
    }
    console.log('读取文件夹成功');
    console.log(data);
})
// 读取文件夹
fs.readdir('./file', (err, data) => {
    if (err) {
        console.log('读取文件夹失败2：');
        console.error(err);
        return;
    }
    console.log('读取文件夹成功2');
    console.log(data);
})
const readfileData = fs.readdirSync('./test2');
console.log('同步读取文件夹');
console.log(readfileData);
```
#### 删除文件夹
不推荐使用`rmdir`
* 异步删除语法：fs.`rmdir`(path,callback)
* 同步删除语法：fs.`rmdirSync`(path)

推荐使用`rm`:
* 异步删除语法：fs.`rm`(path,callback)
* 同步删除语法：fs.`rmSync`(path)

参数说明：
* path:路径

代码示例：
```javascript
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

```
### 查看资源状态
