# node.js学习实操及笔记
> 温故node.js，node.js学习实操过程及笔记~
- [node.js学习视频](https://www.bilibili.com/video/BV1gM411W7ex?p=1&vd_source=4046650f4b6e75ab86067f7a5a418626)
- [node.js官网](https://node.js.org/en)
- [node.js中文网](https://node.js.cn)
- [实操笔记github](https://github.com/nonamelhm/nodejs-study.git)
- [csdn笔记](https://blog.csdn.net/enhenglhm/article/details/139600646?csdn_share_tail=%7B%22type%22%3A%22blog%22%2C%22rType%22%3A%22article%22%2C%22rId%22%3A%22139600646%22%2C%22source%22%3A%22enhenglhm%22%7D)

## 为什么学node.js
1. 可以让别人访问我们编写的网页
2. 为后续的框架学习打下基础，三大框架vue react angular离不开node.js
## node.js是什么
* 官网：node.js是一个开源的、跨平台的运行JavaScript的运行环境。 
* 通俗理解: 一款应用程序，一款软件，可以运行JavaScript
## node.js作用
1. 开发服务器应用
2. 开发工具类应用
3. 开发桌面类应用
## node.js安装
- [node.js官网](https://node.js.org/en/download/package-manager)
- [node.js中文网](https://node.js.cn/download/)
- [全部版本安装包淘宝镜像](https://registry.npmmirror.com/binary.html?path=node/v20.13.0/)
> 点击安装，傻瓜式安装。

- PS:推荐使用`nvm`方式安装`node.js`，这样可实现自由切换版本好。
> 因为有的老项目node.js可能是12版本的，新项目又是18或者20版本。具体安装自行查阅，目前这边已经安装，忘记哪个博主写的较好就不推荐了。

检测安装是否成功,输入以下命令到命令行，出来版本号代表安装成功
```shell
node -v
```
- 若安装失败，考虑大可能为环境变量配置问题影响

## node.js初体验
1. 当前目录新建hello.js
```javascript
console.log("hello node.js!");
```
2. 切换到当前目录，终端打开
3. 执行代码，看到 hello node.js
注意：运行命令为`node + 文件路径` =》hello.js是相对文件路径，这里省略了`./hello.js`
```shell
node hello.js
```

## node.js注意事项
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

* 异步删除fs.`rm`(path,callback) ps:node.js14.4版本以上才可用
* 同步删除fs.`rmSync`(path) ps:node.js14.4版本以上才可用

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

// rm删除 node.js14.4版本以上
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
* 异步查看语法：fs.`stat`(path[,option],callback)
* 同步查看语法： fs.`statSync`(path[,option])

参数说明：
* path 文件路径
* options 选项配置（可选）
* callback 操作后的回调

示例代码：fs_stat.js
```javascript
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
```
结果值对象结构：
* size 文件体积
* birthtime 创建时间
* mtime 最后修改时间
* isFile 检测是否为文件
* isDirectory 检测是否为文件夹
* ...

### 路径补充说明
> 路径分为`相对路径`和`绝对路径`两种写法

#### 相对路径
比如在当前根目录的info.txt
* 相对路径表达为`./info.txt`
#### 相对路径常遇到的bug与解决
> 相对路径参照的是命名行的工作目录！

**Bug:**

比如在 代码利用`相对路径创建文件./info.txt`：
- 在当前命令运行`node fs_writeFile.js`就在当前文件夹生成info.txt
- 在nodejs上层运行`node ./nodejs/fs_writeFile.js`就会在nodejs同级生成info.txt

结论：
- 相对路径的参照物 是在运行命令行的当前目录

**解决方法**
* 利用绝对路径：使用全局变量`__dirname`进行拼接：保存的是所在文件的所在目录的`绝对路径`

代码示例：
```javascript
//使用绝对路径：__dirname拼接方式 
//利用绝对路径：使用全局变量`__dirname`进行拼接：保存的是所在文件的所在目录的`绝对路径`
fs.writeFileSync(__dirname+'/index.html','写入内容哈哈哈哈')
```
#### 绝对路径
> 常会遇到权限的问题

比如在D盘下的info.txt
* 绝对路径表达为`D:/info.txt`
* linux操作系统下用的较多`/`开头，比如`/info.txt`

## fs练习_批量重命名
优化如下：
* 视频用的是split会拆分，这里我用的是正则表达式
* 视频用的是相对路径，这里我拼接了`__dirname`使用了绝对路径

**示例代码：**
```javascript
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
```
## path模块
>path模块提供了操作路径的功能。

* 常用API如下：

| API             | 说明             |
|-----------------|----------------|
| path.`resolve`  | 拼接规范的绝对路径 `常用` |
| path.`sep`      | 获得操作系统的路径分隔符   |
| path.`parse`    | 解析路径并返回对象      |
| path.`basename` | 获得路径基础名称       |
| path.`dirname`  | 获得路径目录名        |
| path.`extname`  | 获得路径扩展名        |

### resolve(重点掌握)
代码示例：
```javascript
// path模块
const fs = require('fs');
const path = require('path');
// 写入文件
// 建议绝对路径 +拼接+ 相对路径 写法 path.resolve(绝对路径+相对路径)
fs.writeFileSync(path.resolve(__dirname, './test.txt'), 'peace and love');
// 不建议这样写 最好不要 绝对路径＋绝对路径写法  /path为绝对路径
// 这样写的意思是 /path的绝对路径  +拼接+ ./test.txt
// fs.writeFileSync(path.resolve(__dirname, '/path', './test.txt'), 'peace and love');

```
运行命令
```shell
node ./path/path.js
```
### sep
> sep分隔符 ：不同操作系统的分隔符不同，获取不同操作系统下的分隔符

| 操作系统            | 分隔符 |
|-----------------|-----|
| windows         | \   |
| linux           | /   |
| macos           | /   |

代码示例：
```javascript
const path = require('path');
// sep分隔符 ：不同操作系统的分隔符不同，获取不同操作系统下的分隔符
console.log(path.sep);  //windows:\   linux:/    macos:/
```
### path
* 解析路径返回对象=》语法: path.`parse`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// parse  解析路径并返回对象
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 解析路径
console.log(path.parse(str));
```
### basename
* 获得文件名=》语法: path.`basename`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// basename  获取路径名称
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取的文件名
console.log(path.basename(str)); //path.js
```

### dirname
* 获得文件夹的目录名=》语法: path.`dirname`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// dirname  获取文件目录名
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取文件目录名
console.log(path.dirname(str)); //  /Users/lhm/Documents/nodejs/path
```

### extname
* 获得文件扩展名（即为后缀名）=》语法: path.`extname`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// extname  获取文件扩展名即为后缀名
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取文件扩展名
console.log(path.extname(str)); //  .js
```
## HTTP协议
### 初识
* 全称 `Hypertext Transfer Protocol` `超文本传输协议` 互联网应用最广泛的协议之一
* 协议：双方必须共同遵从的一组约定
* 浏览器 输入 url 给服务器发送 请求报文， 服务器 给 浏览器 发送响应报文 进行响应
### HTTP报文
* 安装软件fiddler 查看报文内容，自行下载摸索。

### 请求报文结构 
* 请求行 GET https://www.baidu.com
* 请求头
* 请求体
#### 请求行
> 如 GET https://www.baidu.com/ HTTP/1.1

构成
1. **请求方法** 
2. **URL**
3. **HTTP版本号**

- **请求方法**

常见方法如下：

  | 方法     | 作用             |
  |---------|----------------|
  | `GET`  | 主要用于获取数据 |
  | `POST` | 主要用于新增数据   |
  | `PUT/PATCH` |主要用于更新数据      |
  | `DELETE` | 主要用于删除数据       |
  | `HEAD/OPTIONS/CONNECT/TRACE` | 使用相对较少 |

- **URL**

> 全程 Uniform Resource Locator 统一资源定位符
比如：https://search.jd/com:443/search?keyword=oneplus&psort=12
 * 协议名 `https`
 * 主机名 `search.jd.com`
 * 端口号 `443`
 * 路径 `/search`
 * 查询字符串 `?keyword=oneplus&psort=12`

- **HTTP版本号**
常见版本号：

| 版本号 | 发布时间   |
  |-----|--------|
| `1.0` | 1996年  |
| `1.1` | 1999年  |
| `2`  | 2015年  |
| `3`  | 2018年  |

#### 请求头
> 很多键值对组成，主要是记录浏览器很多相关的信息，记录与浏览器交互的行为。

[点击跳转MDN查看请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
#### 请求体
> 用一个场景理解它。比如登录场景 ,发送post请求传过去的数据:username=111&password=asaj11212。这些即为请求体。

### 响应报文
* 响应行
* 响应头
* 响应体
#### 响应行
* HTTP版本号
* 响应状态码
* 响应状态的描述

- 响应状态码

| 状态码   | 含义      |
  |-------|---------|
| `200` | 请求成功    |
| `403` | 禁止请求    |
| `404` | 找不到资源   |
| `500` | 服务器内部错误 |

- 响应状态的描述
> 响应状态的描述通常与状态码相关

| 状态码   | 状态描述                  |
  |-------|-----------------------|
| `200` | OK                    |
| `403` | Forbidden             |
| `404` | Not Found             |
| `500` | Internal Server Error |

[点击查看更多状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
#### 响应头
> 跟请求头一样为键值对的形式，记录与服务器相关的一些内容。

[点击查看更多响应头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

#### 响应体
> 响应体即响应的内容

常见的响应体格式有：
1. HTML
2. CSS
3. JavaScript
4. 图片
5. 视频
6. JSON

## 网络基础概念
### IP
> IP也称为[IP地址]，本身是一个数字标识。例如 192.168.1.3。 通俗理解IP地址主要`用来寻找网络设备`，本身是32Bit的二进制数字。

作用：
* IP用来标识网络中的设备，实现设备间的通信

**IP的分类**

| 类型          | 说明                                                                                        |
  |-------------|-------------------------------------------------------------------------------------------|
| 本地回环IP地址    | 127.0.0.1 ~ 127.255.255.255                                                               |
| 局域网IP（私网IP) | 192.168.0.0 ~ 192.168.255.255<br/>172.16.0.0~172.31.255.255<br/>10.0.0.0 ~ 10.255.255.255 |
| 广域网（公网IP)   | 除上述之外                                                                                     |

### 端口
> 端口：应用程序的数字标识。一台现代计算机有65536个端口（0~65535）。一个应用程序可以使用一个或多个端口。
> 通俗理解： 赶集的摊位的 `编号` 好比 计算机理解的`端口`

作用：
* 实现不同主机应用程序之间的通信

## http模块
### 创建http服务端
代码示例：./http/createServer.js
```javascript
// 创建服务
// 1.导入http模块
const http = require('http');
// 2.创建服务对象
const server = http.createServer((request, response) => {
    //设置响应内容
    response.end('Hello World! Hello node.js Server!');
});
// 3.监听端口，启动服务
server.listen(9000, () => {
    console.log("Server started on port 9000...");
    console.log('http://localhost:9000/');
})
```
#### 注意事项
1. 命令行`ctrl + c`停止服务
2. 当服务启动后，更新代码`必须重启服务才能生效`
3. 响应内容中文乱码的解决方法
```javascript
response.setHeader('content-type','text/html;charset=utf-8')
```
4. 端口号被占用
* 关闭当前正在运行监听端口的服务`使用较多`
* 修改其他端口号

5. HTTP协议默认端口号是80。HTTP服务开发常用端口有3000,8080,8090,9000等


### 获取http请求报文
想要获取请求的数据，需要通过`request`对象

| 含义         | 语法                                                                       | 重点掌握 |
  |------------|--------------------------------------------------------------------------|----|
| 请求方法       | request.method                                                           | *  |
| 请求http协议版本 | request.httpVersion                                                      |    |
| 请求路径       | request.url                                                              | *  |
| 请求头        | request.headers                                                          | *  |
| 请求体        | request.on('data',function(chunk){})<br/>request.on('end',function(){}); |    |
| url请求路径    | const url = require('url'); url.parse(request.url).pathname;             | *  |
| url查询字符串   | const url = require('url'); url.parse(request.url,true).query;           |    |

**注意事项：**
1. request.ur;只能获取路径以及查询的字符串，无法获取URL中的域名以及协议的内容
2. request.headers将请求信息转化为一个对象，并将属性名都转换成了【小写】
3. 关于路径：如果访问网站的时候，只写了IP地址或者是域名信息，此时请求的路径为【/】
4. 关于favicon.ico：这个请求是属于浏览器自动发送的请求

#### 请求头
代码示例：./http/request_header.js

**ps:浏览器打开form.html输入提交进行测试**
**ps:当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。**
```javascript
// 请求报文之请求头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 1-----请求头
    //请求方法
    console.log('请求方法');
    console.log(request.method);
    // 请求http版本
    console.log('请求http版本');
    console.log(request.httpVersion);
    // 请求头
    console.log('请求url');
    console.log(request.headers.host);
    // 请求路径
    console.log('请求路径');
    console.log(request.url);
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

```
#### 请求体
代码示例：./http/request_content.js

**ps:浏览器打开form.html输入提交进行测试**
**ps:当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。**
```javascript
// 请求报文之请求体

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
  // ----请求体
  // 定义请求体内容
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  })
  request.on('end', () => {
    console.log('请求体内容：')
    console.log(body);
    console.log('--------end--------------')
    response.end('hello world!');
  })
})
//启动服务
server.listen(9000, () => {
  console.log('server listening on port 9000,');
  console.log("http://localhost:9000/");
})

```
#### 请求路径与查询关键字
1. 方式1：通过内置url解析
* 请求路径语法：url.parse(request.url).pathname)
* 查询字符串语法：url.parse(request.url,true).query

注意事项：
2. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：[点击跳转浏览器进行测试](http://localhost:9000/home?username=hhh&password=999)

代码示例：./http/request_url.js
````javascript
// 请求报文之url

//引入http模块
const http = require("http");
const url = require("url");
//创建服务对象
const server = http.createServer((request, response) => {
    // ----url
    console.log('请求路径：')
    console.log(url.parse(request.url).pathname);
    console.log('查询字符串：')
    console.log(url.parse(request.url,true).query);
    console.log(url.parse(request.url,true).query.username);
    console.log(url.parse(request.url,true).query.password);
    console.log('---------------');
    response.end('hello world!');
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

````
2. 方式2：通过new URL解析
* 语法：new URL(input[,base])

* [点击了解更多new URL英文](https://nodejs.org/docs/latest/api/url.html#new-urlinput-base)
* [点击了解更多new URL中文](https://nodejs.cn/api/url.html#new-urlinput-base)


**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：[点击跳转浏览器进行测试](http://localhost:9000/home?username=hhh&password=999)

代码示例：./http/request_newURL.js
````javascript
// 请求报文之url

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
  // 2- 通过new URL方式获取
  let url = new URL(request.url, 'http://localhost:9000');
  console.log(url);
  console.log('请求路径：')
  console.log(url.pathname);
  console.log('查询字符串');
  console.log(url.searchParams.get('username'));
  console.log('------------------')
})
//启动服务
server.listen(9000, () => {
  console.log('server listening on port 9000,');
  console.log("http://localhost:9000/");
})

````
### http请求练习

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：
  - [登录页面：点击跳转浏览器进行测试](http://localhost:9000/login?username=hhh&password=999)
  - [注册页面：点击跳转浏览器进行测试](http://localhost:9000/reg?username=hhh&password=999)
  - [不存在：点击跳转浏览器进行测试](http://localhost:9000/noFound?username=hhh&password=999)
```javascript
/** http练习
 * 需求
 * 请求类型 get 地址/login 返回 “登录页面” 四字
 * 请求类型 get 地址/reg 返回 “注册页面” 四字
 */
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let url = new URL(req.url, 'http://127.0.0.1:9000');
        //设置中文防止乱码
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        if (url.pathname === '/login') {
            res.end('登录页面');
        } else if (url.pathname === '/reg') {
            res.end('注册页面');
        } else {
            res.end('您当前访问页面不存在！');
        }
    } else {
        res.end('您当前访问页面不存在！');
    }
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000,');
})
```
### 设置http响应报文

| 作用       | 语法                                       | 
  |----------|------------------------------------------|
| 设置响应状态码  | response.statusCode                      |
| 设置响应状态描述 | response.statusMessage(用的非常少）            | 
| 设置响应头信息  | response.setHeader('头名','头值')            | 
| 设置响应体    | response.write('xx');response.end('xx'); | 

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入此url进行请求，打开浏览器——右键检查——查看网络：
- [点击跳转浏览器进行测试](http://localhost:9000/login)


代码示例：
```javascript
// 设置响应头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 设置响应
    //响应状态码
    response.statusCode = 200;
    //设置响应状态信息
    response.statusMessage = 'iloveyou';
    // 设置响应头
    // 设置编码格式 防止中文乱码
    response.setHeader('content-type', 'text/html; charset=utf-8');
    // 自定义响应头
    response.setHeader('myHeaders', 'Authorization');
    //响应体 write可有多个
    response.write('哈哈哈哈 响应体');
    response.write('哈哈哈哈2 响应体');
    // 响应体 end 只有一个
    response.end('bye!!')
});
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

```
### http响应练习

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入此url进行请求查看效果：
- [点击跳转浏览器进行测试](http://localhost:9000)

代码示例：res.pratice.html + res_pratice.js
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    const html = fs.readFileSync(__dirname+'/res_pratice.html');
    res.end(html);
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 网页资源加载的全部过程
* 1-先加载html
* 2-再根据html内容加载css、图片资源、js等

* 3-favicon.icon请求：浏览器默认行为：默认请求网站图标favicon.icon
* 4-ws请求：插件行为，使得网页实现自动刷新功能

### 实现网页引入外部资源
> 接回之前的响应练习，现在需求是将css js分离开，单独引入资源

代码示例: res_pratice.js => 读取res_practice.html res_pratice.css  pratice_click.js
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    //按路径区分 请求资源 进行 响应。不要都响应此html
    const {pathname} = new URL(req.url, 'http://127.0.0.1')
    if (pathname === '/') {
        //注意：此响应头得在html里，否则可能会没效果
        res.setHeader('content-type', 'text/html;charset=UTF-8');
        const html = fs.readFileSync(__dirname + '/res_pratice.html');
        res.end(html);
    } else if (pathname === '/res_pratice.css') {
        const css = fs.readFileSync(__dirname + '/res_pratice.css');
        res.end(css);
    } else if (pathname === '/pratice_click.js') {
        const js = fs.readFileSync(__dirname + '/pratice_click.js');
        res.end(js);
    } else {
        res.end('<h1>404 Not Found!</h1>');
    }

});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 静态资源与动态资源
* 静态资源：内容长时间不发生改变的资源，例如图片，视频，css文件，js文件，HTML文件，字体文件等
* 动态资源：内容经常更新的资源，例如百度首页，网易首页，京东搜索列表页面等。

### 搭建静态资源服务
对响应式练习的优化处理
* 利用`__dirname+pathname`进行拼接,无需多次请求

代码示例：
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    //按路径区分 请求资源 进行 响应。不要都响应此html
    // const {pathname} = new URL(req.url, 'http://127.0.0.1')
    // if (pathname === '/') {
    //     //注意：此响应头得在html里，否则可能会没效果
    //     res.setHeader('content-type', 'text/html;charset=UTF-8');
    //     const html = fs.readFileSync(__dirname + '/res_pratice.html');
    //     res.end(html);
    // } else if (pathname === '/res_pratice.css') {
    //     const css = fs.readFileSync(__dirname + '/res_pratice.css');
    //     res.end(css);
    // } else if (pathname === '/pratice_click.js') {
    //     const js = fs.readFileSync(__dirname + '/pratice_click.js');
    //     res.end(js);
    // } else {
    //     res.end('<h1>404 Not Found!</h1>');
    // }
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1')
    const filename = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
            console.error(err);
            return;
        }
        res.end(data);
    })
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 网页URL之绝对路径
绝对路径可靠性强，而且相对性容易理解，在项目中运用较多


| 形式                   | 特点                                   | 
  |----------------------|--------------------------------------|
| http://www.baidu.com | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式。        |
| //www.baidu.com      | 与页面URL的协议拼接形成完整URL再发送请求。大型网站用的比较多    | 
| /web                 | 与页面URL的协议、主机名、端口拼接形成完整URL再发送请求。中小型网站 | 

### 网页URL之相对路径
相对路径在发送请求时，需要与当前页面URL路径进行计算，得到完整URL后，再发送请求，学习阶段用的较多。
例如当前网页url为：http://www.atguigu.com/course/h5.html

| 形式              | 最终的URL                                    | 
  |-----------------|-------------------------------------------|
| ./css/app.css   | http://www.atguigu.com/course/css/app.css |
| js/app/js       | http://www.atguigu.com/course/js/app.js   | 
| ../img/logo.png | http://www.atguigu.com/img/logo.png       | 
| ../mp4/show.mp4 | http://www.atguigu.com/mp4/show.mp4       | 
 
### 网页中使用URL的场景小结
包括但不限于以下场景：
* a标签href
* link标签href
* script标签src
* img标签src
* video audio 标签 src
* form中的action
* AJAX请求中的URL

### 设置mime类型
`媒体类型` 通常称为`Multipurpose Internet Mail Extension` 或 `MIME` 类型）是一种标准，用来表示文档、文件或字节流的性质和格式。
```text
mime 类型结构： [type]/[subType]
例如： text/html images/jpeg  image/png application/json
```
HTTP服务可以设置响应头`Content-Type`来表明响应体的MIME类型，浏览器会根据该类型决定如何处理资源
下面是常见的文件对应的mime类型
```text
html: `text/html`
css:`text/css`
js:`text/javascript`
png:`images/png`
jpg:`images/jpeg`
gif:`images/gif`
mp4:`video/mp4`
mp3:`audio/mpeg`
json:`application/json`
```
> 对于未知的资源类型，可选择`application/actet-stream`类型，浏览器在遇到该类型响应时，会对该响应体类型进行独立存储，也就是我们常见的`下载`效果

代码示例：./http/mime.js
```javascript
// 设置mime
const http = require('http');
const path = require('path');
const server = http.createServer((req, res) => {
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1');
    const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    // 得到后缀名
    const extname = path.extname(filepath).slice(1);
    // 根据请求文件后缀名，设置相应的mime
    let mimes = {
        html: 'text/html',
        css: "text/css",
        js: 'text/javascript',
        png: 'images/png',
        jpg: 'images/jpeg',
        gif: 'images/gif',
        mp4: 'video/mp4',
        mp3: 'audio/mp3',
        json: 'application/json'
    }
    // 获取对应类型
    const type = mimes[extname];
    // 判断
    if (type) {
        //解决乱码问题 
        if(extname==='html'){
          res.setHeader('Content-Type', type+';charset=utf-8');
        }else{
          res.setHeader('Content-Type', type);
        }
    } else {
        res.setHeader('Content-Type', 'application/actet-stream');
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
            console.error(err);
            return;
        }
        res.end(data);
    })
});

server.listen(9000, () => {
    console.log('server started');
    console.log('http://localhost:9000/');
})
```
### 解决乱码问题
* html添加字符集`charset:utf-8`即可.
* 响应头的字符集优先于html的meta设置的字符集

代码示例：如上：./http/mime.js

### 完善错误处理
[点击node.js中文网查看错误代码具体含义](https://nodejs.cn/api/errors.html#nodejs-error-codes)

代码处理示例：error.js
```javascript
// 完善错误处理
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  // 优化
  const {pathname} = new URL(req.url, 'http://127.0.0.1');
  const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      switch (err.code) {
        case 'ENOENT':
          res.statusCode = 404;
          res.end('<h1>404 Not Found!</h1>');
        case 'EPERM':
          res.statusCode = 403;
          res.end('<h1>403 Forbidden!</h1>');
        default:
          res.statusCode = 500;
          res.end('<h1>Internal Server Error</h1>');
      }
      return;
    }
    res.end(data);
  })
});

server.listen(9000, () => {
  console.log('server started');
  console.log('http://localhost:9000/');
})

```
### GET和POST使用场景
GET请求场景：
* 在地址栏直接输入url访问
* 点击a链接
* link标签引入css
* script标签引入js
* video与audio引入多媒体
* img标签引入图片
* form标签中的method为get

POST请求中的请求
* form标签中的method为post
* AJAX中的post请求

### GET和POST请求区别
GET和POST是HTTP协议请求中的两种方式，主要有以下区别：
1. 作用：GET主要是用来获取数据，POST主要是用来提交数据
2. 参数位置：GET主要用来获取数据，POST主要用来提交数据
3. 安全性：POST请求相对GET安全一些，因为在浏览器中会暴露在地址栏
4. GET请求大小有限制，一般为2k,而POST请求则没有大小限制

## 模块化
### 什么是模块化
> 将一个复杂的程序文件依据一定规则（规范）拆分成多个文件的过程称之为模块化
> 其中拆分出的每个文件就是一个模块。模块内部的数据是私有的，不过模块可以暴露内部数据以使其它模块使用

**模块化项目：**
编码时按照模块一个个编码的，整个项目就是一个模块化的项目

**模块化好处：**
1. 防止命名冲突
2. 高复用性
3. 高维护性

### 模块化初体验
* Commonjs规范

代码示例：me.js
```javascript
// 声明函数
function tiemo(){
    console.log('timemo')
}
module.exports = tiemo;

```
代码示例：index.js
```javascript
//引入模块
const tiemo = require('./me');
// 调用
tiemo();

```
运行：
* ./module/index.js 是相对于当前打开终端的目录路径，根据自己路径找到index.js
```shell
node ./module/index.js
```
### 模块暴露数据
* 方式1：module.exports = value
* 方式2：module.exports = {value1,value2}
* 方式3：export.name = value

📢注意：不要直接exports = value ❎ 错误写法

代码示例： me.js
```javascript
// 声明函数
function tiemo() {
    console.log('timemo')
}

function niejiao() {
    console.log('niejiao');
}

// 暴露数据
// module.exports = tiemo;
// 暴露数据2
module.exports = {
    tiemo,
    niejiao
}
// 暴露数据3
// exports.niejiao = niejiao;
// exports.tiemo = tiemo;


// 注意：不能使用 exports=value的形式暴露数据
// 因为如下相等
// exports = module.exports = {tiemo: tiemo}
// exports.tiemo = tiemo;

```

代码示例：index.js 调用
```javascript
//引入模块
const me = require('./me');
// 调用
me.tiemo();
me.niejiao();
```
### 导入模块
在模块中使用`require`传入文件路径即可使用文件
```javascript
const test = require('./me.js');
```
**`require`使用的一些注意事项**
1. 对于自己创建的模块，导入时路径建议写相对路径，不能省略`./`和`../`
2. js和json文件导入时可以不用写后缀，c/c++编写的node扩展文件也可不写后缀，但一般用不到
3. 如果导入其他类型的文件，会以js文件进行处理
4. 如果导入路径为文件夹，首先会检测`package.json`文件中main属性对应的文件，如果main属性不存在，或者package.json不存在，则会检测文件夹下的index.js和index.json.如果还是没找到，就会报错
5. 导入node.js内置模块时，直接require模块的名字即可，无需加`./`和`../`

> Node.js实现了CommonJS模块化规范

### 导入模块的基本流程
介绍`require`导入自定义模块的基本流程
1. 将相对路径转为绝对路径，定位目标文件
2. 缓存检测
3. 读取目标文件代码
4. 包裹为一个函数并执行（自执行函数）。通过`arguments.callee.toString()`查看自执行函数
5. 缓存模块的值
6. 返回module.exports值

### CommonJS规范
* `module.exports` `exports` 以及`require` 这些都是CommonJS模块化规范中的内容
* Node.js是实现了CommonJS模块化规范，二者关系有点像JavaScript与ECMAScript

## 包管理工具
> 包管理工具就像`哆啦A梦`

### 介绍
> 【包】英文单词 package 代表了一组特定功能的源码集合

**包管理工具**
管理【包】的应用软件，可以对【包】进行下载安装，更新，删除，上传等操作

**常用的包管理工具**
* npm
* yarn
* cnpm

### npm安装与介绍
> node.js在安装时会自动安装npm,若你已经安装了node.js,可以直接使用npm
* 通过 `npm -v`查看版本号测试。显示版本号即为成功，反之失败
### npm初始化包
我在此新建了npm文件夹，并切换终端目录到npm，使用`cd npm`切换到npm文件夹也可。
1. npm init (根据问题回答~使用默认就回车)

📢注意：
* 中文和英文大写命名不允许，默认是文件夹的名称，所以文件夹也不能用中文和大写
* version版本号要求x.x.x形式定义，x必须是数字,默认值1.0.0
* ISC证书与MIT证书功能上是相同的，关于开源证书扩展阅读：[点击查看](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
* package.json可以手动创建以及修改
* 使用`npm init -y` 或者`npm init --yes` `极速`创建package.json

### 搜索包
方式2种
1. 命令行 【npm s/search 关键字】
2. 网站搜索 网址是：[https://www.npmjs.com](https://www.npmjs.com)
> 关于如何精准找到需要的包
> 这个事情需要在实践中不断积累，通过看文章，看项目去学习积累

### 下载依赖包
* `npm install` 简写 `npm i`

### require导入npm包基本流程
1. 在当前文件夹的node_modules中寻找同名的文件夹
2. 在上级目录下的node_modules中寻找同名的文件夹，直至找到磁盘根目录

### 生产环境与开发环境
* 开发环境是程序员 专门用来写代码 的环境，一般是指程序员的电脑，开发环境的项目一般只能是程序员自己访问
* 生产环境是项目代码正式运行的环境，一般是指正式的服务器电脑，生产环境的项目一般每个客户都可以访问

### 生产依赖与开发依赖
我们可以在安装时设置区分依赖的类型，目前分为两类


| 类型              | 命令                                      | 补充                                                                |
  |-----------------|-----------------------------------------|-------------------------------------------------------------------|
| 生产依赖            | npm i -S uniq<br/>npm i --save uniq     | -S等效于--save -S是默认选项<br/>包信息保存在package.json中的dependencies属性        |
| 开发依赖            | npm i -D less<br/>npm i --save-dev less | -D等效于--save-dev -S是默认选项<br/>包信息保存在package.json中的devDependencies属性 |

> 比如蛋炒饭需要 大米 油 葱 鸡蛋 锅 煤气 铲子
> 其中 锅 煤气 铲子 属于开发依赖，只在制作阶段使用
> 而大米 有 葱 鸡蛋属于生产依赖 在制作与最终食用都会用
> 所以开发依赖是只在开发阶段使用的依赖包，而生产依赖是开发阶段和最终上线运行阶段都用到的依赖包

### npm全局安装
```shell
npm i -g nodemon
```
全局安装完成之后就可以在命令行的任何位置运行nodemon命令
该命令作用是自动重启node应用程序。【修改文件代码后不需关闭终端，重新运行，会自动监测编译】
使用nodemon运行即可
```shell
nodemon ./fs/fs_writeFile.js
```
与此同时修改./fs/fs_writeFile.js文件会自动编译，不需要关闭重新运行

📢注意：
* 全局安装命令不受工作目录位置影响
* 可以通过`npm root -g` 查看全局安装包位置
* 只有全局类的工具才适合全局安装

### 环境变量path
> 命令行输入命令会在当前目录寻找.exe或者.cmd后缀可执行文件执行，找到执行，找不到则报错。
> 比如输入QQ 会在当前文件夹寻找 QQ.exe或者QQ.cmd的可执行文件。找不到就去`环境变量`中找，所以路径需配置在`环境变量`中。

### 安装所有依赖
* npm i / npm install
```shell
npm i
```
###  npm安装指定版本的包
* 语法：`npm i <包名@版本包>`
示例：
```shell
npm i jquery@1.11.2
```
### npm删除包
* `npm remove `  /  `npm r`
* `npm uninstall`  / `npm uni`
全局删除示例：
````shell
npm remove -g modemon
````
局部删除示例：
```shell
npm remove uniq
```
```shell
npm uninstall juery
```
### npm命令配置别名
1. 通过package.json中配置script
> * npm start 是项目中常用命令，用来启动命令。可不加 run
> * npm run 有自动向上级目录查找的特性，跟require函数一样默认
> * 对于陌生项目，我们可以先通过查看scripts属性来参考项目的一些操作。可看到怎么运行项目、打包项目等


示例如：（配置了start启动命令）
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "学习npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./test.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "uniq": "^1.0.1"
  }
}
```
2.运行
```shell
npm run start
```
### cnpm
#### 介绍
* cnpm淘宝搭建的`npmjs.com`的完整镜像，也称为【淘宝镜像】，[网址](https://npmmirror.com/)
* cnpm服务部署在国内`阿里云服务器上`，可以提高的下载速度
* 官网也提供了一个全局工具包`cnpm`,操作命令与npm大体相同

#### 安装
```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```
#### 操作命令
* 基本跟npm相同

| 功能     | 命令                                                                      |
|--------|-------------------------------------------------------------------------|
| 初始化    | cnpm init                                                               |
| 安装包    | cnpm i uniq<br/>cnpm i -S uniq<br/>cnpm i -D uniq<br/>cnpm i -g nodemon |
| 安装项目依赖 | cnpm i                                                                  |
| 删除     | cnpm r uniq<br/>cnpm uni uniq                                           |

### 配置淘宝镜像
用npm可直接下载淘宝镜像，配置方式有两种
* 直接配置
* 工具配置
#### 直接配置
```shell
npm config set registry https://registry.npmmirror.com/
```
#### 工具配置
1. 安装nrm
```shell
npm i -g nrm
```
2. 修改镜像
```shell
nrm use taobao
```
3. 检查是否配置成功
```shell
npm config list
```
PS:  检查registry地址是否为https://reggistry/npmmirror.com/ 如果是则表明成功
> 补充说明:
> 1. 建议使用第二种方式进行镜像配置，因为后续修改起来会比较方便
> 2. 虽然cnpm可以提高速度，但是npm也可以通过淘宝镜像进行加速，所以npm使用率还是高于cnpm
### yarn
#### 介绍
> yarn是Facebook在2016年推出的JavaScript推出的包管理工具 [官网网址](https://yarnpkg.com/)

**特点**
* 速度超快:yam 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快
* 超级安全:在执行代码之前，yarn 会通过算法校验每个安装包的完整性
* 超级可靠:使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的工作
#### 安装
```shell
npm i -g yarn
```
#### yarn常用命令

| 功能     | 命令                                                                               |
|--------|----------------------------------------------------------------------------------|
| 初始化    | yarn init  /  yarn init -y                                                       |
| 安装包    | yarn add uniq 生产依赖<br/>yarn add less --dev 开发依赖<br/>yarn global add nodemon 全局安装 |
| 安装项目依赖 | yarn                                                                        |
| 删除     | yarn remove uniq 删除项目依赖包<br/>yarn global remove nodemon  全局删除包        |
| 运行命令别名 | yarn <别名>                                                                 |

###  npm 和 yarn 选择
大家可以根据不同场景进行选择
1. 个人项目，根据个人喜好选择
2. 公司项目：根据项目代码选择，可以选择通过锁文件判断项目的包管理工具
  - npm 锁文件是 package-lock.json
  - yarn 锁文件是 yarn.lock
> 包管理工具不要混用，切记，切记，切记

### npm发布一个包
#### 创建与发布
> 将自己开发的工具包发布到npm服务上，方便自己和其它开发者进行使用，操作步骤如下：
1. 创建文件夹，并创建文件main中index.js入口文件，在文件中声明删除，使用module.exports暴露

代码示例：
```javascript
function add(a, b) {
    return a + b;
}

module.exports = {
    add
}
```
2. npm初始化工具包`npm init`，package.json填写包的信息（包名必须唯一）
3. [注册账号](https://www.npmjs.com/registry)
4. 激活账号（一定要激活账号）
5. 修改为官方镜像
* 之前使用了别的镜像，比如淘宝镜像加速，不切回官方镜像很可能会上传失败.
  - 通过nrm方式切回官方镜像：

     **没安装的先安装：**
     ```shell
     npm i -g nrm
     ```
     **切回官方镜像:**
     ```shell
     nrm use npm
     ```
6. 登录npm,按照要求登录
```shell
npm login
```
7. 提交发布包
```shell
npm publish
```
### 更新包
1. 更新包中代码
2. 测试代码是否可用
3. 修改package.json中版本号
4. 发布更新
```shell
npm publish
```
### 删除包
```shell
npm unpublish
```
不成功加上`--force`强制删除
```shell
npm unpublish --force
```
删除包需要一定条件，[查看条件](https://docs.npmjs.com/policies/unpublish)
* 你是包作者
* 发布小于24小时
* 大于24小时后，没有其他包依赖，并且每周小于300下载量，并且只有一个维护者

### 包管理工具扩展介绍
> 很多语言都有包管理工具。除了编程语言，操作系统层面也存在包管理工具。

| 语言         | 包管理工具               |
|------------|---------------------|
| PHP        | composer            |
| Python     | pip                 |
| Java       | maven               |
| Go         | go mod              |
| JavaScript | npm/yarn/cnpm/other |
| Ruby       | rubyGems            |

操作系统也存在包管理工具，不过这个包指的是软件包:

| 操作系统       | 包管理工具         | 网址  |
|------------|---------------------|---------|
| Centos     | composer            |  https://package.debian.org/stabel/ |
| Ubuntu    | apt                 |https://package.ubuntu.com /|
| MacOS       |homeview               |https://brew.sh /|
| Windows         | chocolatey             |https://chocolatey.org |

### nvm介绍与使用
#### 介绍
> nvm 全称 Node Version Manager 顾名思义用来管理node版本工具。方便切换不用版本的Node.js。一般项目中，新旧项目要求的node版本不同，建议使用nvm安装node.js,方便切换
#### 下载安装
> 安装太久，不知道哪个博文好使了，可以去网上寻找细致教程

* [windows的github下载地址](https://github.com/coreybutler/nvm-windoes/releases.)
* 选择 `nvm-setup.exe` 下载即可

#### 常用命令

| 命令                    | 说明                  |
|-----------------------|---------------------|
| nvm use available     | 显示可下载的Node.js版本     |
| nvm list              | 显示已安装的版本            |
| nvm install 18.12.1   | 安装18.12.1版本的Node.js |
| nvm install latest    | 安装最新版本的Node.js      |
| nvm uninstall 18.12.1 | 删除18.12.1版本的Node.js |
| nvm use 18.12.1       | 切换18.12.1的Node.js   |

## express
### express介绍
> 官网介绍：expresss是一个基于Node.js平台的极简、灵活的WEB应用开发框架。[官网网址](https://www.express.com.cn/).简单来说，express是一个封装好的工具包，封装了很多功能，便于我们开发WEB应用。（HTTP服务）
> http模块帮助我们搭建http服务，给浏览器做出相应服务端的功能，直接使用还是不太方面，于是我们借助express框架.

### express路由
> 路由确定了应用程序如何响应客户对特定端点的请求。
* express依旧兼容之前的http的获取请求及其响应方法！


#### 路由基本使用
一个路由有请求方法、路径和回调函数组成
express中提供了一系列方法，可以很方便的使用路由 使用格式如下：
```text
app.<method>(path,callback)
```

PS:代码中1-4方法使用，知识点

代码示例：startlearn.js
```javascript
// 初认识express
// 引入模块
const express = require('express');
// 创建应用对象
const app = express();
const port = 3000;
// 1-创建路由 get方法
app.get('/home', (req, res) => {
  res.end('hello world');
})

// 2-创建路由 get方法
app.post('/login', (req, res) => {
  res.end('hello login');
})

//3- 无论get或post方法
app.all('/test', (req, res) => {
  res.end('no matter methods');
})

//4-上面匹配不上的路由规则
app.all('*', (req, res) => {
  res.end('404 No Found');
})

//监听端口 启动服务
app.listen(port, () => {
  console.log('Express server started');
  console.log('http://localhost:9000/');
})

```
### 获取请求报文参数

| 说明         | 原生http获取                                                                                                                  | express框架获取     |
|------------|---------------------------------------------------------------------------------------------------------------------------|-----------------|
| 获取请求路径path | const url = require('url'); <br/>url.parse(request.url).pathname; /<br/> new URL(req.url,'http://localhost:9000').pathname | req.path        |
| 获取请求参数     | const url = require('url'); url.parse(request.url,true).query;                                                            | req.query       |
| 获取ip       | req.connection.remoteAddress                                                                                              | req.ip          |
| 获取请求头      | req.headers['host']                                                                                                       | req.get('host') |

### 获取路由参数
* 语法eg=》路径`/:id` 通过`req.params.id`获取路由参数

代码示例：
```html
const express = require('express');
const app = express();
//通配符  通过http://localhost:3000/login/1212121访问即可知
app.get('/login/:id', (req, res) => {
// 获取id
console.log(req.params.id);
res.end('login success!');
})
app.get('/', (req, res) => {
res.end('hello');
})
//监听端口 启动服务
app.listen(3000, () => {
console.log('Express server started');
console.log('http://localhost:3000');
})
```
### 路由参数练习

[运行后点击测试](http://localhost:3000/singer/2)
代码示例如下：singer.json + params_pratice.js
```javascript
/** 需求
 * 通过路由id返回歌手名称及其它名称
 */
const express = require('express');
const app = express();
const fs = require('fs');
// 读取歌手假数据json文件
const singersData = fs.readFileSync(__dirname + '/singers.json').toString();
app.get('/singer/:id', (req, res) => {
  const {id} = req.params;
  const matchData = JSON.parse(singersData).singers.find(item => item.id === Number(id));
  res.setHeader('content-type', 'text/html; charset=utf-8');
  if (matchData) {
    res.end(`名称：${matchData.singer_name},其它名称:${matchData.other_name}`);
  } else {
    res.end('No Such a Singer');
  }
})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
})

```
### 一般响应设置
* 设置响应状态码：res.status(200)
* 设置请求头：res.set('asas','aaa')
* 设置响应内容： res.send('你好')
* 连贯操作：res.status(200).set('hahaha~', 'hhh').send('你好 express');

代码示例如下：
```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
//     //原生响应也兼容
//     res.statusCode = 200;
//     res.statusMessage = 'asasa';
//     res.setHeader('hahha', 'hhh');
//     res.write('hello world!');
//     res.end('res content');

// express设置状态码
// res.status(200);
// // express设置请求头
// res.setset('hahaha~', 'hhh');
// // express响应内容 做了封装 中文不乱码
// res.send('你好');

// 连贯操作
  res.status(200).set('hahaha~', 'hhh').send('你好 express');
})

app.listen(3000, () => {
  console.log('server started on port 3000');
  console.log('http://localhost:3000');
});

```
### 其它响应设置
* 设置重定向：res.redirect('http://www.baidu.com')
* 下载响应：res.download('路径')
* 响应json: res.json({内容)
* 响应文件内容：res.sendFile(__dirname+'/home.html')

```javascript
// 其它响应
app.get('/other', (req, res) => {
    //1-设置重定向
    // res.redirect('http://www.baidu.com');
    // 2-下载响应
    // res.download(__dirname + '/singers.json');
    // 3-响应json
    // res.json({
    //     "singer_name": "林俊杰",
    //     "other_name": " JJ Lin",
    //     "id": 2
    // });
    //4-响应文件内容
    res.sendFile(__dirname + '/test.html');
})
```
### 中间件
#### 中间件介绍
* 本质是一个回调函数
* 可以像回调喊出一样访问 请求对象，响应对象
#### 中间件作用
* 中间件作用就是使用函数封装公共操作，简化代码
### 中间件类型
* 全局中间件
* 路由中间件
#### 全局中间价
* 每一个请求到达服务端之后都会执行全局中间件代码

代码示例：middleware.js
```javascript
// 认识中间件
/** 需求
 * 追加日志记录，写入log.txt文件
 */
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 全局中间件
// 定义
function recordMiddleWare(req, res, next) {
  // 判断是否有文件 没有就创建
  const filePath = path.resolve(__dirname, './log.txt');
  //  判断文件是否存在，如果不存在就创建一个空文件
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
  // 获取url和ip地址
  const {url, ip} = req;
  // 每个请求过来的路由信息都保存到日志记录文件
  fs.appendFileSync(path.resolve(__dirname, `./log.txt`), `${url}    ${ip}\r\n`);
  // 调用next
  next();
}

// 调用中间件函数
app.use(recordMiddleWare);

app.get('/login', (req, res) => {
  res.send('login success!');
})

app.listen(3000, () => {
  console.log('server started at port 3000');
  console.log('http://localhost:3000');
})

```
#### 路由中间件实践
* [运行点击测试1](http://localhost:3000/setting?code=521)
* [运行点击测试2](http://localhost:3000/admin?code=521)
* [运行点击测试3](http://localhost:3000/registry)

代码示例：middleware_pratice.js
```javascript
// 中间件实践
/** 需求
 *  针对/admin /setting的请求，要求URL携带code=521参数，如未携带提示【暗号错误】
 */
const express = require('express');
const app = express();

// 定义中间件
function checkCodeMiddleWare(req, res, next) {
  // 获取code
  const {code} = req.query;
  if (Number(code) === 521) {
    next();
  } else {
    next("【暗号错误】");
  }
}


//调用中间件
app.get('/admin', checkCodeMiddleWare, (req, res) => {
  res.send('admin success!');
})
//调用中间件
app.get('/setting', checkCodeMiddleWare, (req, res) => {
  res.send('setting success!');
})
app.get('/registry', (req, res) => {
  res.send('registry success!');
})
app.get('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>');
})
app.listen(3000, () => {
  console.log('server started at port 3000');
  console.log('http://localhost:3000');
})

```
#### 静态资源中间件
1. 根目录下新建public文件夹=》新建index.html文件+新建index.css文件
2. 代码如下：
```javascript
//静态资源中间件请求
app.use(express.static(__dirname + '/public'));
```
3. 运行代码 staticMiddleware.js,下面路径express/staticMiddleware.js为自己运行的文件路径
```shell
node express/staticMiddleware.js
```
4. 验证
- [默认打开index.html](http://localhost:3000/)
- [可直接查看css文件](http://localhost:3000/index.css)

完整代码示例：
```javascript
// 静态资源中间件
const express = require('express');
const app = express();
//静态资源中间件请求
app.use(express.static(__dirname + '/public'));

// 监听端口 启动服务
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log('http://localhost:3000');
})
```
**静态资源中间件注意事项**
1. index.html为默认打开的资源
2. 静态文件与路由规则app.get('/',()=>{})同时匹配，谁先匹配谁就响应，看代码顺序
3. 路由响应动态资源，静态资源中间件响应静态资源

### 获取请求体数据body-parser
1. 安装
```shell
npm i body-parser
```
2. 获取中间件函数
* 处理queryString格式的请求体:const urlParser = bodyParser.urlencoded({extended: false});
* 处理json格式的请求体:const jsonParser = bodyParser.json();
```javascript
// 获取中间件函数
//处理queryString格式的请求体
const urlParser = bodyParser.urlencoded({extended: false});
//处理json格式的请求体
const jsonParser = bodyParser.json();
```
3. 使用中间件
```javascript
//获取请求体数据
app.post('/login', urlParser, (req, res) => {
    // 获取请求体数据
    console.log(req.body);
    res.send('用户名:' + req.body.username + '<br/>密码:' + req.body.password);
})
```
完整代码示例：bodyParser.js
```javascript
// body-parse获取请求体
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 获取中间件函数
//处理queryString格式的请求体
const urlParser = bodyParser.urlencoded({extended: false});
//处理json格式的请求体
const jsonParser = bodyParser.json();

//响应login页面
app.get('/login', urlParser, (req, res) => {
  res.sendFile(__dirname + '/login.html');
})
//获取请求体数据
app.post('/login', urlParser, (req, res) => {
  // 获取请求体数据
  console.log(req.body);
  res.send('用户名:' + req.body.username + '<br/>密码:' + req.body.password);
})
app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
})

```
### 防盗链
#### 介绍
> 比如有的图片，直接复制地址显示到img是拿不到的，说明这个网站做了防盗链处理。判断源是请求头里的`referer`参数会携带当前域名和协议及其端口进行请求。
#### 实践
完整代码示例：
1. referer.js
```javascript
const express = require('express');
const app = express();
// 定义全局防盗链中间件 判断请求头referer
app.use((req, res, next) => {
  const referer = req.get('referer');
  if (referer) {
    // 实例化
    const url = new URL(referer);
    const hostname = url.hostname;
    console.log(hostname);
    if (hostname !== '127.0.0.1') {
      res.status(404).send('<h1>404 Not Found</h1>');
      return;
    }
  }
  next();
})
// 读取静态资源
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
  console.log('http://localhost:3000');
})

```
2. public=>index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试！！</h1>
<img src="http://127.0.0.1:3000/images/logo.jpeg" alt="logo">
</body>
</html>

```
### 路由模块化(***)
> 路由功能代码进行拆分

1. 新建文件夹routes
2. 新建homeRouter.js
3. 创建单独的路由规则

- routermodule.js
**代码示例：**
```javascript
const express = require("express");
const userRouter = require(__dirname + "/routes/userRouter.js");
const adminRouter = require(__dirname + "/routes/adminRouter.js");
const app = express();

app.use(userRouter);
app.use(adminRouter);

app.all("*", function (req, res) {
  res.send('404 Not Found');
})

app.listen(3000, () => {
  console.log("server started");
  console.log('http://localhost:3000');
})

```
- userRouter.js
```javascript
// user routes
const express = require('express');
const router = express.Router();
router.get('/login', (req, res) => {
  res.send('login登录');
})
router.get('/registry', (req, res) => {
  res.send('registry注册');
})
module.exports = router;

```
- adminRouter.js
```javascript
// admin routes
const express = require('express');
const router = express.Router();
router.get('/setting', (req, res) => {
  res.send('设置setting');
})
router.get('/modify', (req, res) => {
  res.send('修改setting');
})
module.exports = router;

```
### 模版引擎
#### 简单介绍
* 模版引擎是分离用户界面和业务数据的一种技术
#### ejs
> 分离HTML和JS的，ejs是一个高效的JavaScript模版引擎。主要了解ejs,现在不多用了。

1. 安装
```shell
npm i ejs
```
2. 导入ejs
```javascript
const ejs = require('ejs');
```
3. 使用ejs渲染

- 代码示例：ejs.js
```javascript
// ejs初体验
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();
// 读取静态资源
app.use(express.static(path.join(__dirname, './public')));

const china = '中国';
// 读取html文件
const htmlData = fs.readFileSync(__dirname + '/public/index.html','utf-8').toString();
//使用ejs渲染
const result = ejs.render(htmlData, {china: china});
console.log(result);

```
- 代码示例：index.html
* <h2><%= china %></h2>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试！！</h1>
<img src="http://127.0.0.1:3000/images/logo.jpeg" alt="logo">

<h1>读出来了吗？</h1>
<h2><%= china %></h2>

</body>
</html>

```
### ejs列表渲染
代码如下：ejs_xiyou.js
```javascript
// ejs列表渲染
/** 需求
 * 渲染ul li 西游数组
 */

const ejs = require('ejs');
const fs = require('fs');

const xiyou = ['唐僧', '孙悟空', '沙僧', '猪八戒'];
const htmlData = fs.readFileSync(__dirname + '/ejs_xiyou.html').toString()

const result = ejs.render(htmlData, {xiyou: xiyou});
console.log(result);

```
代码如下：ejs_xiyou.html
```html
<ul>
    <% xiyou.forEach(item=>{ %>
    <li> <%= item %></li>
    <% }) %>
</ul>
```
### ejs条件渲染
* js如上
* html如下
代码示例：
```html
<% if(isLogin){ %>
<span>登录成功</span>
<% }else{ %>
<span>登录失败</span>
<% } %>
```
### express中使用ejs
1. 设置模板引擎
```javascript
app.set('view engine', 'ejs');
```
2. 设置模板文件存放位置 新建view文件夹=》views新建.ejs文件，比如home.ejs
```javascript
app.set('views',path.resolve(__dirname,'./views'))
```
3. render响应
```javascript
res.render('home',{title})
```
4. 创建模版文件 其实就是.ejs文件，但其实就是类html文件,主要得含有如下代码：
```html
<%= title %>
```
完整代码示例：express_ejs.js
```javascript
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
// 1-设置模版引擎
app.set("view engine", "ejs");
// 2-设置模版文件存放位置
app.set("views", path.resolve(__dirname, "./views"));

app.get('/home', (req, res) => {
  const title = 'Home页面';
  // 3-render响应
  res.render("home", {title});
  // 创建模版文件 home.ejs
})

app.all('*', (req, res) => {
  res.send('404 Not Found');
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log('http://localhost:3000');
});

```
完整代码：views=>home.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试：</h1>
<h1><%= title %> </h1>
</body>
</html>

```
### express-generator工具
* 通过应用生成器express-generator快速创建一个应用骨架
1. 安装
- npx命令来运行（包含Node.js8.2.0及更高的版本中）
```shell
npx express-generator
```
- npm方式
```shell
npm i -g express-generator
```
2. 创建文件夹
* 语法 express -e <文件夹名称>
```shell
express -e generator
```

**查看相关命令**
```shell
express -h
```

### 查看文件上传报文
1. 代码示例 portrait.js
```javascript
const express = require('express');
const path = require('path');
const app = express();
//设置模板引擎
app.set('view engine', 'ejs');
//设置模板引擎存放文件位置
app.set('views', path.resolve(__dirname, './views'));

// render响应
app.get('/portrait', (req, res) => {
  res.render('portrait');
})

app.post('/portrait', (req, res) => {
  console.log(req);
  res.send('成功！');
})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
});

```
2. 完整代码portrait.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>查看文件上传报文</title>
</head>
<body>
<form action="/portrait" method="post" enctype="multipart/form-data">
    用户名：<input type="text" name="username"><br>
    头像 <input type="file" name="portrait">
    <button>点击提交</button>
</form>
</body>
</html>

```
### 处理文件上传
* 借助库formidable [使用参考](https://www.npmjs.com/package/formidable)
* 注意：Commonjs 使用`require`引入需要安装`V2`版本的，V3的只能使用import 引入
* 创建public文件夹=》images文件夹

代码示例：
```javascript
const express = require('express');
const path = require('path');
const formidable = require('formidable').formidable;

const app = express();
//设置模板引擎
app.set('view engine', 'ejs');
//设置模板引擎存放文件位置
app.set('views', path.resolve(__dirname, './views'));

// render响应
app.get('/portrait', (req, res) => {
  res.render('portrait');
})
// 响应静态资源——方便访问上传的图片
app.use(express.static(path.resolve(__dirname, './public')));

app.post('/portrait', (req, res) => {
  const form = formidable({
    multiple: true,
    // 设置上传文件的保存目录
    uploadDir: path.join(__dirname, './public/images'),
    // 保持文件后缀
    keepExtensions: true
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // 存放非文件的字段
    // console.log(fields);
    // 存放文件
    // console.log(files);
    // 服务器保存存放的照片的访问url
    const url = '/images/' + files.portrait.newFilename;
    res.send(url);
  });

})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
});

```
## mongoDB
#### 介绍
> 基于分布式文件存储的数据库，[官方网址](https://www.mongodb.com/)

**相比于纯文件管理数据，数据库管理数据优点：**
1. 速度更快
2. 扩展性更强
3. 安全性更强
#### 核心概念
* 数据库：又称数据仓库，可存放很多集合
* 集合：类似于JS中的数据，在集合中可以存放很多文档
* 文档：数据库中的最小单位，类似JS中的对象

#### 下载安装与启动
[下载地址](https://www.mongodb.com/try/download/community)
这边记录下自己的mac安装教程，可根据直接的电脑系统去搜搜安装
* [参考mac安装mongoDB数据库](https://blog.csdn.net/weixin_50268501/article/details/136853814?ops_request_misc=&request_id=&biz_id=102&utm_term=mac%20mongodb%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-136853814.nonecase&spm=1018.2226.3001.4187)

**具体步骤：**
1. 进入[MongoDB官网](https://www.mongodb.com/try/download/community)进行下载
2. 下载完毕并且解压，重新命名为 【mongodb】文件夹
3. 打开访达 按住快捷键command+shift+g 前往/usr/local路径
4. 将解压并命名好的【mongodb】文件夹拖入到这个路径下
5. 配置环境变量，在根目录输入open -e .zshrc打开.zshrc文件夹。（注意：我的终端是zsh，如果你们的终端是bash的话应该输入open .bash_profile）
6. 在里面添加一下代码
```text
export PATH=${PATH}:/usr/local/mongodb/bin
```
7. 保存好了文件后，需要执行改文件,在根目录输入 source .zshrc 来进行执行。（注意：我的终端是zsh，如果你们的终端是bash的话应该输入source .bash_profile）
8. 在此执行一下命令（确保是在根目录 不确定就执行 cd ~）
```shell
mongod --version
```
9. 安装mongodb成功了后，那存的数据和日志记录放哪呢。这就需要建立data和log文件夹了。进入到mongodb文件夹的目录下

- 进行mongodb文件夹下
```shell
cd /usr/local/mongodb
```
- 创建
```shell
mkdir data log
```
- 给这data文件夹赋予读写权限，输入电脑开机密码，密码输入的时候看不见。
```shell
sudo chown [你的用户名] /usr/local/mongodb/data
```
- 给这log文件夹赋予读写权限，输入电脑开机密码，密码输入的时候看不见。
```shell
sudo chown [你的用户名] /usr/local/mongodb/log
```

10. 在mongondb路径下启动mongoDB：mongod --fork --dbpath data --logpath log/mongo.log --logappend 这句命令，看到child process started successfully, parent exiting这句话就成功启动服务了
```shell
mongod --fork --dbpath data --logpath log/mongo.log --logappend
```
11. 使用mongo指令
12. 浏览器进入http://127.0.0.1:27017/

13. 关闭数据库服务 （直接关闭）针对于（mac zsh）
```shell
sudo pkill -f mongod
```
14. 再次访问上面网址就会失败

#### mac zsh配置启动脚本
创建一个启动脚本文件，以确保命令在正确的目录中运行：
1. 创建脚本文件：
```zsh
touch start_mongo.sh
```
2. 编辑脚本文件：
```zsh
nano start_mongo.sh
```
3. 添加以下内容：
```zsh
#!/bin/zsh
cd /usr/local/mongodb
mongod --fork --dbpath data --logpath log/mongo.log --logappend

```
保存并退出：
保存文件并退出编辑器（按Ctrl+X退出，按Y保存，回车enter退出）。

PS:同理建立了关闭mongods脚本。
命令为：
```zsh
sudo pkill -f mongod
```
4. 赋予执行权限：
```zsh
chmod +x start_mongo.sh
```
5. 运行脚本：
现在你可以运行脚本来启动MongoDB：
```zsh
./start_mongo.sh
```
#### mac下载可视化工具Robomongo(studio3T)
* [下载地址](https://studio3t.com/download/)
* [参考可视化工具Robomongo(studio3T)安装使用](https://blog.csdn.net/weixin_38245947/article/details/124588765?ops_request_misc=&request_id=&biz_id=102&utm_term=mac%20mongodb%E5%91%BD%E4%BB%A4&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-124588765.142^v100^pc_search_result_base6&spm=1018.2226.3001.4187)

#### 文档命令
1. 插入文档
* 语法：db.集合名.insert(文档对象)
```javascript
db.user.insert({username:'ll',age:18})
```
2. 查询文档
* 语法：db.集合名.find(查询条件)
```javascript
db.user.find({age:20})
```
3. 更新文档
* 语法：db.集合名.update(查询条件,新的文档)
```javascript
db.user.find({name:'张三'},{$set:{age:20}})
```
4. 删除文档
* 语法：db.集合名.remove(查询条件)
```javascript
db.user.remove({name:'张三'})
```
### mongoose
#### 连接数据库
代码及说明如下：
```javascript
// mongoose使用 前提得启动mongoose
// 1-安装依赖
// 2-引入依赖
const mongoose = require('mongoose');

// 3-连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/user');
// 补充说明：1-设置strictQuery为true
mongoose.set('strictQuery', true);

// 设置回调
// 连接成功的回调  补充说明：2-once：事件回调函数只执行一次
mongoose.connection.on('open', () => {
  console.log('连接成功!');
})
// 连接错误的回调
mongoose.connection.on('error', (err) => {
  console.log('连接错误：')
  console.error(err);
})
// 连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
})

// 关闭连接
setTimeout(function () {
  console.log('连接关闭');
  mongoose.disconnect();
}, 2000)

```
......mongoose大致学到这里，需要的在看文档好了....

## 会话控制
#### 介绍
> 所谓会话控制是对会话进行控制。
> 因为HTTP是一个无状态的协议，它没有办法区分多次的请求是否来自同一客户端，无法区分用户，而产品中又大量存在这样的需求，所以我们需要通过会话控制解决该问题。

**常见的会话控制方式：**
* Cookie
* Session
* Token

### Cookie
> cookie是HTTP服务器发送到用户浏览器并保存在本地的一小块数据
* cookie是保存在浏览器的一小块数据
* cookie是按照域名划分保存的

**特点：**
* 浏览器向服务器发送请求时，会自动将当前域名可用的cookie设置在请求头中，然后传递给服务器。
* 请求头的名字也叫cookie 所以将cookie理解为一个http的请求头也是可以的

#### 浏览器Cookie
1. 禁用cookie
> 这个操作一般不做

* 网站——隐私设置和安全性设置——常规设置——阻止所有cookie

2. 删除cookie
* 网站——隐私设置和安全性设置——清除相应网站数据

3. 查看cookie
* edge浏览器查看——输入cookie查询——cookie和网站数据——点击下拉查看
* 谷歌浏览器查看——网站链接旁的左上方小锁——cookie和网站数据——点击查看

#### express Cookie
1. 设置cookie
*  eg:res.`cookie`('name','lhm',{})
```javascript
const express = require('express');
const app = express();
app.get('/set-cookie',(req,res)=>{
    res.cookie('name','lhm');//会在浏览器关闭的时候，销毁
    res.cookie('name','lhm',{maxAge:60 * 1000}); //maxAge最大存活时间 单位毫秒 但是浏览器中存的是秒s
    res.send('home');
})
```
2. 删除cookie
* eg:res.`clearCookie`('name')
```javascript
const express = require('express');
const app = express();
app.get('/remove-cookie',(req,res)=>{
    res.clearCookie('name');
    res.send('remove');
})
```
3. 读取cookie
* 工具库cookie-parse,使用这个为一个cookie解析中间件
1. 安装依赖
```shell
npm i cookie-parse
```
2. 引入使用
```javascript
const express = require('express');
const cookieParse = require('cookie-parse');
const app = express();
app.use(cookieParse());
```
3. 获取cookie值
* `req.cookies`获取到cookie值
```javascript
app.get('/get-cookie',(req,res)=>{
  console.log(req.cookies);
  console.log(res.cookies.name);
})
```
### session
> 保存到服务器的一块儿数据，保存当前访问的用户的相关信息

**作用：**
> 实现会话控制，可以识别用户的身份，快速获取当前用户的相关信息

**运行流程：**
1. 填写账号和密码校验身份，校验填入通过后创建session信息，然后通过session_id的值通过响应头返回给浏览器
2. 有了cookie,下载发送请求会自动携带cookie,服务器通过cookie和session_id的值确定用户的身份

### session与cookie区别
* 存在位置不同。cookie存在浏览器，session 服务端
* 安全性。cookie明文存在客户端，session是存在服务器，安全性相对较好
* 网络传输量。 cookie设置内容过多会增加保温体积，影响传输效率。session数据存储在服务器，只是通过cookie传递id,所以不影响传输效率
* 存储限制# node.js学习实操及笔记
> 温故node.js，node.js学习实操过程及笔记~
- [node.js学习视频](https://www.bilibili.com/video/BV1gM411W7ex?p=1&vd_source=4046650f4b6e75ab86067f7a5a418626)
- [node.js官网](https://node.js.org/en)
- [node.js中文网](https://node.js.cn)

## 为什么学node.js
1. 可以让别人访问我们编写的网页
2. 为后续的框架学习打下基础，三大框架vue react angular离不开node.js
## node.js是什么
* 官网：node.js是一个开源的、跨平台的运行JavaScript的运行环境。
* 通俗理解: 一款应用程序，一款软件，可以运行JavaScript
## node.js作用
1. 开发服务器应用
2. 开发工具类应用
3. 开发桌面类应用
## node.js安装
- [node.js官网](https://node.js.org/en/download/package-manager)
- [node.js中文网](https://node.js.cn/download/)
- [全部版本安装包淘宝镜像](https://registry.npmmirror.com/binary.html?path=node/v20.13.0/)
> 点击安装，傻瓜式安装。

- PS:推荐使用`nvm`方式安装`node.js`，这样可实现自由切换版本好。
> 因为有的老项目node.js可能是12版本的，新项目又是18或者20版本。具体安装自行查阅，目前这边已经安装，忘记哪个博主写的较好就不推荐了。

检测安装是否成功,输入以下命令到命令行，出来版本号代表安装成功
```shell
node -v
```
- 若安装失败，考虑大可能为环境变量配置问题影响

## node.js初体验
1. 当前目录新建hello.js
```javascript
console.log("hello node.js!");
```
2. 切换到当前目录，终端打开
3. 执行代码，看到 hello node.js
   注意：运行命令为`node + 文件路径` =》hello.js是相对文件路径，这里省略了`./hello.js`
```shell
node hello.js
```

## node.js注意事项
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

* 异步删除fs.`rm`(path,callback) ps:node.js14.4版本以上才可用
* 同步删除fs.`rmSync`(path) ps:node.js14.4版本以上才可用

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

// rm删除 node.js14.4版本以上
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
* 异步查看语法：fs.`stat`(path[,option],callback)
* 同步查看语法： fs.`statSync`(path[,option])

参数说明：
* path 文件路径
* options 选项配置（可选）
* callback 操作后的回调

示例代码：fs_stat.js
```javascript
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
```
结果值对象结构：
* size 文件体积
* birthtime 创建时间
* mtime 最后修改时间
* isFile 检测是否为文件
* isDirectory 检测是否为文件夹
* ...

### 路径补充说明
> 路径分为`相对路径`和`绝对路径`两种写法

#### 相对路径
比如在当前根目录的info.txt
* 相对路径表达为`./info.txt`
#### 相对路径常遇到的bug与解决
> 相对路径参照的是命名行的工作目录！

**Bug:**

比如在 代码利用`相对路径创建文件./info.txt`：
- 在当前命令运行`node fs_writeFile.js`就在当前文件夹生成info.txt
- 在nodejs上层运行`node ./nodejs/fs_writeFile.js`就会在nodejs同级生成info.txt

结论：
- 相对路径的参照物 是在运行命令行的当前目录

**解决方法**
* 利用绝对路径：使用全局变量`__dirname`进行拼接：保存的是所在文件的所在目录的`绝对路径`

代码示例：
```javascript
//使用绝对路径：__dirname拼接方式 
//利用绝对路径：使用全局变量`__dirname`进行拼接：保存的是所在文件的所在目录的`绝对路径`
fs.writeFileSync(__dirname+'/index.html','写入内容哈哈哈哈')
```
#### 绝对路径
> 常会遇到权限的问题

比如在D盘下的info.txt
* 绝对路径表达为`D:/info.txt`
* linux操作系统下用的较多`/`开头，比如`/info.txt`

## fs练习_批量重命名
优化如下：
* 视频用的是split会拆分，这里我用的是正则表达式
* 视频用的是相对路径，这里我拼接了`__dirname`使用了绝对路径

**示例代码：**
```javascript
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
```
## path模块
>path模块提供了操作路径的功能。

* 常用API如下：

| API             | 说明             |
|-----------------|----------------|
| path.`resolve`  | 拼接规范的绝对路径 `常用` |
| path.`sep`      | 获得操作系统的路径分隔符   |
| path.`parse`    | 解析路径并返回对象      |
| path.`basename` | 获得路径基础名称       |
| path.`dirname`  | 获得路径目录名        |
| path.`extname`  | 获得路径扩展名        |

### resolve(重点掌握)
代码示例：
```javascript
// path模块
const fs = require('fs');
const path = require('path');
// 写入文件
// 建议绝对路径 +拼接+ 相对路径 写法 path.resolve(绝对路径+相对路径)
fs.writeFileSync(path.resolve(__dirname, './test.txt'), 'peace and love');
// 不建议这样写 最好不要 绝对路径＋绝对路径写法  /path为绝对路径
// 这样写的意思是 /path的绝对路径  +拼接+ ./test.txt
// fs.writeFileSync(path.resolve(__dirname, '/path', './test.txt'), 'peace and love');

```
运行命令
```shell
node ./path/path.js
```
### sep
> sep分隔符 ：不同操作系统的分隔符不同，获取不同操作系统下的分隔符

| 操作系统            | 分隔符 |
|-----------------|-----|
| windows         | \   |
| linux           | /   |
| macos           | /   |

代码示例：
```javascript
const path = require('path');
// sep分隔符 ：不同操作系统的分隔符不同，获取不同操作系统下的分隔符
console.log(path.sep);  //windows:\   linux:/    macos:/
```
### path
* 解析路径返回对象=》语法: path.`parse`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// parse  解析路径并返回对象
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 解析路径
console.log(path.parse(str));
```
### basename
* 获得文件名=》语法: path.`basename`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// basename  获取路径名称
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取的文件名
console.log(path.basename(str)); //path.js
```

### dirname
* 获得文件夹的目录名=》语法: path.`dirname`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// dirname  获取文件目录名
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取文件目录名
console.log(path.dirname(str)); //  /Users/lhm/Documents/nodejs/path
```

### extname
* 获得文件扩展名（即为后缀名）=》语法: path.`extname`(path)

参数说明：
* path:文件解析路径

代码示例：
```javascript
// extname  获取文件扩展名即为后缀名
// 查看当前文件路径
console.log(__filename);
//定义路径
let str = '/Users/lhm/Documents/nodejs/path/path.js'
// 获取文件扩展名
console.log(path.extname(str)); //  .js
```
## HTTP协议
### 初识
* 全称 `Hypertext Transfer Protocol` `超文本传输协议` 互联网应用最广泛的协议之一
* 协议：双方必须共同遵从的一组约定
* 浏览器 输入 url 给服务器发送 请求报文， 服务器 给 浏览器 发送响应报文 进行响应
### HTTP报文
* 安装软件fiddler 查看报文内容，自行下载摸索。

### 请求报文结构
* 请求行 GET https://www.baidu.com
* 请求头
* 请求体
#### 请求行
> 如 GET https://www.baidu.com/ HTTP/1.1

构成
1. **请求方法**
2. **URL**
3. **HTTP版本号**

- **请求方法**

常见方法如下：

| 方法     | 作用             |
  |---------|----------------|
| `GET`  | 主要用于获取数据 |
| `POST` | 主要用于新增数据   |
| `PUT/PATCH` |主要用于更新数据      |
| `DELETE` | 主要用于删除数据       |
| `HEAD/OPTIONS/CONNECT/TRACE` | 使用相对较少 |

- **URL**

> 全程 Uniform Resource Locator 统一资源定位符
比如：https://search.jd/com:443/search?keyword=oneplus&psort=12
* 协议名 `https`
* 主机名 `search.jd.com`
* 端口号 `443`
* 路径 `/search`
* 查询字符串 `?keyword=oneplus&psort=12`

- **HTTP版本号**
  常见版本号：

| 版本号 | 发布时间   |
  |-----|--------|
| `1.0` | 1996年  |
| `1.1` | 1999年  |
| `2`  | 2015年  |
| `3`  | 2018年  |

#### 请求头
> 很多键值对组成，主要是记录浏览器很多相关的信息，记录与浏览器交互的行为。

[点击跳转MDN查看请求头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)
#### 请求体
> 用一个场景理解它。比如登录场景 ,发送post请求传过去的数据:username=111&password=asaj11212。这些即为请求体。

### 响应报文
* 响应行
* 响应头
* 响应体
#### 响应行
* HTTP版本号
* 响应状态码
* 响应状态的描述

- 响应状态码

| 状态码   | 含义      |
  |-------|---------|
| `200` | 请求成功    |
| `403` | 禁止请求    |
| `404` | 找不到资源   |
| `500` | 服务器内部错误 |

- 响应状态的描述
> 响应状态的描述通常与状态码相关

| 状态码   | 状态描述                  |
  |-------|-----------------------|
| `200` | OK                    |
| `403` | Forbidden             |
| `404` | Not Found             |
| `500` | Internal Server Error |

[点击查看更多状态码](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Status)
#### 响应头
> 跟请求头一样为键值对的形式，记录与服务器相关的一些内容。

[点击查看更多响应头](https://developer.mozilla.org/zh-CN/docs/Web/HTTP/Headers)

#### 响应体
> 响应体即响应的内容

常见的响应体格式有：
1. HTML
2. CSS
3. JavaScript
4. 图片
5. 视频
6. JSON

## 网络基础概念
### IP
> IP也称为[IP地址]，本身是一个数字标识。例如 192.168.1.3。 通俗理解IP地址主要`用来寻找网络设备`，本身是32Bit的二进制数字。

作用：
* IP用来标识网络中的设备，实现设备间的通信

**IP的分类**

| 类型          | 说明                                                                                        |
  |-------------|-------------------------------------------------------------------------------------------|
| 本地回环IP地址    | 127.0.0.1 ~ 127.255.255.255                                                               |
| 局域网IP（私网IP) | 192.168.0.0 ~ 192.168.255.255<br/>172.16.0.0~172.31.255.255<br/>10.0.0.0 ~ 10.255.255.255 |
| 广域网（公网IP)   | 除上述之外                                                                                     |

### 端口
> 端口：应用程序的数字标识。一台现代计算机有65536个端口（0~65535）。一个应用程序可以使用一个或多个端口。
> 通俗理解： 赶集的摊位的 `编号` 好比 计算机理解的`端口`

作用：
* 实现不同主机应用程序之间的通信

## http模块
### 创建http服务端
代码示例：./http/createServer.js
```javascript
// 创建服务
// 1.导入http模块
const http = require('http');
// 2.创建服务对象
const server = http.createServer((request, response) => {
    //设置响应内容
    response.end('Hello World! Hello node.js Server!');
});
// 3.监听端口，启动服务
server.listen(9000, () => {
    console.log("Server started on port 9000...");
    console.log('http://localhost:9000/');
})
```
#### 注意事项
1. 命令行`ctrl + c`停止服务
2. 当服务启动后，更新代码`必须重启服务才能生效`
3. 响应内容中文乱码的解决方法
```javascript
response.setHeader('content-type','text/html;charset=utf-8')
```
4. 端口号被占用
* 关闭当前正在运行监听端口的服务`使用较多`
* 修改其他端口号

5. HTTP协议默认端口号是80。HTTP服务开发常用端口有3000,8080,8090,9000等


### 获取http请求报文
想要获取请求的数据，需要通过`request`对象

| 含义         | 语法                                                                       | 重点掌握 |
  |------------|--------------------------------------------------------------------------|----|
| 请求方法       | request.method                                                           | *  |
| 请求http协议版本 | request.httpVersion                                                      |    |
| 请求路径       | request.url                                                              | *  |
| 请求头        | request.headers                                                          | *  |
| 请求体        | request.on('data',function(chunk){})<br/>request.on('end',function(){}); |    |
| url请求路径    | const url = require('url'); url.parse(request.url).pathname;             | *  |
| url查询字符串   | const url = require('url'); url.parse(request.url,true).query;           |    |

**注意事项：**
1. request.ur;只能获取路径以及查询的字符串，无法获取URL中的域名以及协议的内容
2. request.headers将请求信息转化为一个对象，并将属性名都转换成了【小写】
3. 关于路径：如果访问网站的时候，只写了IP地址或者是域名信息，此时请求的路径为【/】
4. 关于favicon.ico：这个请求是属于浏览器自动发送的请求

#### 请求头
代码示例：./http/request_header.js

**ps:浏览器打开form.html输入提交进行测试**
**ps:当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。**
```javascript
// 请求报文之请求头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 1-----请求头
    //请求方法
    console.log('请求方法');
    console.log(request.method);
    // 请求http版本
    console.log('请求http版本');
    console.log(request.httpVersion);
    // 请求头
    console.log('请求url');
    console.log(request.headers.host);
    // 请求路径
    console.log('请求路径');
    console.log(request.url);
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

```
#### 请求体
代码示例：./http/request_content.js

**ps:浏览器打开form.html输入提交进行测试**
**ps:当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。**
```javascript
// 请求报文之请求体

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
  // ----请求体
  // 定义请求体内容
  let body = '';
  request.on('data', (chunk) => {
    body += chunk;
  })
  request.on('end', () => {
    console.log('请求体内容：')
    console.log(body);
    console.log('--------end--------------')
    response.end('hello world!');
  })
})
//启动服务
server.listen(9000, () => {
  console.log('server listening on port 9000,');
  console.log("http://localhost:9000/");
})

```
#### 请求路径与查询关键字
1. 方式1：通过内置url解析
* 请求路径语法：url.parse(request.url).pathname)
* 查询字符串语法：url.parse(request.url,true).query

注意事项：
2. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：[点击跳转浏览器进行测试](http://localhost:9000/home?username=hhh&password=999)

代码示例：./http/request_url.js
````javascript
// 请求报文之url

//引入http模块
const http = require("http");
const url = require("url");
//创建服务对象
const server = http.createServer((request, response) => {
    // ----url
    console.log('请求路径：')
    console.log(url.parse(request.url).pathname);
    console.log('查询字符串：')
    console.log(url.parse(request.url,true).query);
    console.log(url.parse(request.url,true).query.username);
    console.log(url.parse(request.url,true).query.password);
    console.log('---------------');
    response.end('hello world!');
})
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

````
2. 方式2：通过new URL解析
* 语法：new URL(input[,base])

* [点击了解更多new URL英文](https://nodejs.org/docs/latest/api/url.html#new-urlinput-base)
* [点击了解更多new URL中文](https://nodejs.cn/api/url.html#new-urlinput-base)


**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：[点击跳转浏览器进行测试](http://localhost:9000/home?username=hhh&password=999)

代码示例：./http/request_newURL.js
````javascript
// 请求报文之url

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
  // 2- 通过new URL方式获取
  let url = new URL(request.url, 'http://localhost:9000');
  console.log(url);
  console.log('请求路径：')
  console.log(url.pathname);
  console.log('查询字符串');
  console.log(url.searchParams.get('username'));
  console.log('------------------')
})
//启动服务
server.listen(9000, () => {
  console.log('server listening on port 9000,');
  console.log("http://localhost:9000/");
})

````
### http请求练习

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入进行测试观察终端打印日志：
- [登录页面：点击跳转浏览器进行测试](http://localhost:9000/login?username=hhh&password=999)
- [注册页面：点击跳转浏览器进行测试](http://localhost:9000/reg?username=hhh&password=999)
- [不存在：点击跳转浏览器进行测试](http://localhost:9000/noFound?username=hhh&password=999)
```javascript
/** http练习
 * 需求
 * 请求类型 get 地址/login 返回 “登录页面” 四字
 * 请求类型 get 地址/reg 返回 “注册页面” 四字
 */
const http = require('http');
const server = http.createServer((req, res) => {
    if (req.method === 'GET') {
        let url = new URL(req.url, 'http://127.0.0.1:9000');
        //设置中文防止乱码
        res.setHeader('Content-Type', 'text/html; charset=UTF-8');
        if (url.pathname === '/login') {
            res.end('登录页面');
        } else if (url.pathname === '/reg') {
            res.end('注册页面');
        } else {
            res.end('您当前访问页面不存在！');
        }
    } else {
        res.end('您当前访问页面不存在！');
    }
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000,');
})
```
### 设置http响应报文

| 作用       | 语法                                       | 
  |----------|------------------------------------------|
| 设置响应状态码  | response.statusCode                      |
| 设置响应状态描述 | response.statusMessage(用的非常少）            | 
| 设置响应头信息  | response.setHeader('头名','头值')            | 
| 设置响应体    | response.write('xx');response.end('xx'); | 

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入此url进行请求，打开浏览器——右键检查——查看网络：
- [点击跳转浏览器进行测试](http://localhost:9000/login)


代码示例：
```javascript
// 设置响应头

//引入http模块
const http = require("http");
//创建服务对象
const server = http.createServer((request, response) => {
    // 设置响应
    //响应状态码
    response.statusCode = 200;
    //设置响应状态信息
    response.statusMessage = 'iloveyou';
    // 设置响应头
    // 设置编码格式 防止中文乱码
    response.setHeader('content-type', 'text/html; charset=utf-8');
    // 自定义响应头
    response.setHeader('myHeaders', 'Authorization');
    //响应体 write可有多个
    response.write('哈哈哈哈 响应体');
    response.write('哈哈哈哈2 响应体');
    // 响应体 end 只有一个
    response.end('bye!!')
});
//启动服务
server.listen(9000, () => {
    console.log('server listening on port 9000,');
    console.log("http://localhost:9000/");
})

```
### http响应练习

**注意事项：**
1. 运行：当端口被占用，关闭其它运行9000端口的终端，或者修改运行端口号。
2. 在浏览器输入此url进行请求查看效果：
- [点击跳转浏览器进行测试](http://localhost:9000)

代码示例：res.pratice.html + res_pratice.js
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    res.setHeader('content-type', 'text/html;charset=UTF-8');
    const html = fs.readFileSync(__dirname+'/res_pratice.html');
    res.end(html);
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 网页资源加载的全部过程
* 1-先加载html
* 2-再根据html内容加载css、图片资源、js等

* 3-favicon.icon请求：浏览器默认行为：默认请求网站图标favicon.icon
* 4-ws请求：插件行为，使得网页实现自动刷新功能

### 实现网页引入外部资源
> 接回之前的响应练习，现在需求是将css js分离开，单独引入资源

代码示例: res_pratice.js => 读取res_practice.html res_pratice.css  pratice_click.js
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    //按路径区分 请求资源 进行 响应。不要都响应此html
    const {pathname} = new URL(req.url, 'http://127.0.0.1')
    if (pathname === '/') {
        //注意：此响应头得在html里，否则可能会没效果
        res.setHeader('content-type', 'text/html;charset=UTF-8');
        const html = fs.readFileSync(__dirname + '/res_pratice.html');
        res.end(html);
    } else if (pathname === '/res_pratice.css') {
        const css = fs.readFileSync(__dirname + '/res_pratice.css');
        res.end(css);
    } else if (pathname === '/pratice_click.js') {
        const js = fs.readFileSync(__dirname + '/pratice_click.js');
        res.end(js);
    } else {
        res.end('<h1>404 Not Found!</h1>');
    }

});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 静态资源与动态资源
* 静态资源：内容长时间不发生改变的资源，例如图片，视频，css文件，js文件，HTML文件，字体文件等
* 动态资源：内容经常更新的资源，例如百度首页，网易首页，京东搜索列表页面等。

### 搭建静态资源服务
对响应式练习的优化处理
* 利用`__dirname+pathname`进行拼接,无需多次请求

代码示例：
```javascript
/** http响应练习
 * 需求
 * 搭建http服务，响应一个4行3列的表格
 * 并且要求表格有 隔行换色效果，且点击单元格能高亮显示
 */
const fs = require('fs');
const http = require('http');
const server = http.createServer((req, res) => {
    //按路径区分 请求资源 进行 响应。不要都响应此html
    // const {pathname} = new URL(req.url, 'http://127.0.0.1')
    // if (pathname === '/') {
    //     //注意：此响应头得在html里，否则可能会没效果
    //     res.setHeader('content-type', 'text/html;charset=UTF-8');
    //     const html = fs.readFileSync(__dirname + '/res_pratice.html');
    //     res.end(html);
    // } else if (pathname === '/res_pratice.css') {
    //     const css = fs.readFileSync(__dirname + '/res_pratice.css');
    //     res.end(css);
    // } else if (pathname === '/pratice_click.js') {
    //     const js = fs.readFileSync(__dirname + '/pratice_click.js');
    //     res.end(js);
    // } else {
    //     res.end('<h1>404 Not Found!</h1>');
    // }
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1')
    const filename = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    fs.readFile(filename, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
            console.error(err);
            return;
        }
        res.end(data);
    })
});
server.listen(9000, () => {
    console.log('Server started on port 9000,');
    console.log('http://localhost:9000/');
})

```
### 网页URL之绝对路径
绝对路径可靠性强，而且相对性容易理解，在项目中运用较多


| 形式                   | 特点                                   | 
  |----------------------|--------------------------------------|
| http://www.baidu.com | 直接向目标资源发送请求，容易理解。网站的外链会用到此形式。        |
| //www.baidu.com      | 与页面URL的协议拼接形成完整URL再发送请求。大型网站用的比较多    | 
| /web                 | 与页面URL的协议、主机名、端口拼接形成完整URL再发送请求。中小型网站 | 

### 网页URL之相对路径
相对路径在发送请求时，需要与当前页面URL路径进行计算，得到完整URL后，再发送请求，学习阶段用的较多。
例如当前网页url为：http://www.atguigu.com/course/h5.html

| 形式              | 最终的URL                                    | 
  |-----------------|-------------------------------------------|
| ./css/app.css   | http://www.atguigu.com/course/css/app.css |
| js/app/js       | http://www.atguigu.com/course/js/app.js   | 
| ../img/logo.png | http://www.atguigu.com/img/logo.png       | 
| ../mp4/show.mp4 | http://www.atguigu.com/mp4/show.mp4       | 

### 网页中使用URL的场景小结
包括但不限于以下场景：
* a标签href
* link标签href
* script标签src
* img标签src
* video audio 标签 src
* form中的action
* AJAX请求中的URL

### 设置mime类型
`媒体类型` 通常称为`Multipurpose Internet Mail Extension` 或 `MIME` 类型）是一种标准，用来表示文档、文件或字节流的性质和格式。
```text
mime 类型结构： [type]/[subType]
例如： text/html images/jpeg  image/png application/json
```
HTTP服务可以设置响应头`Content-Type`来表明响应体的MIME类型，浏览器会根据该类型决定如何处理资源
下面是常见的文件对应的mime类型
```text
html: `text/html`
css:`text/css`
js:`text/javascript`
png:`images/png`
jpg:`images/jpeg`
gif:`images/gif`
mp4:`video/mp4`
mp3:`audio/mpeg`
json:`application/json`
```
> 对于未知的资源类型，可选择`application/actet-stream`类型，浏览器在遇到该类型响应时，会对该响应体类型进行独立存储，也就是我们常见的`下载`效果

代码示例：./http/mime.js
```javascript
// 设置mime
const http = require('http');
const path = require('path');
const server = http.createServer((req, res) => {
    // 优化
    const {pathname} = new URL(req.url, 'http://127.0.0.1');
    const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
    // 得到后缀名
    const extname = path.extname(filepath).slice(1);
    // 根据请求文件后缀名，设置相应的mime
    let mimes = {
        html: 'text/html',
        css: "text/css",
        js: 'text/javascript',
        png: 'images/png',
        jpg: 'images/jpeg',
        gif: 'images/gif',
        mp4: 'video/mp4',
        mp3: 'audio/mp3',
        json: 'application/json'
    }
    // 获取对应类型
    const type = mimes[extname];
    // 判断
    if (type) {
        //解决乱码问题 
        if(extname==='html'){
          res.setHeader('Content-Type', type+';charset=utf-8');
        }else{
          res.setHeader('Content-Type', type);
        }
    } else {
        res.setHeader('Content-Type', 'application/actet-stream');
    }
    fs.readFile(filepath, 'utf8', (err, data) => {
        if (err) {
            res.end('<h1>404 Not Found!</h1>');
            console.error(err);
            return;
        }
        res.end(data);
    })
});

server.listen(9000, () => {
    console.log('server started');
    console.log('http://localhost:9000/');
})
```
### 解决乱码问题
* html添加字符集`charset:utf-8`即可.
* 响应头的字符集优先于html的meta设置的字符集

代码示例：如上：./http/mime.js

### 完善错误处理
[点击node.js中文网查看错误代码具体含义](https://nodejs.cn/api/errors.html#nodejs-error-codes)

代码处理示例：error.js
```javascript
// 完善错误处理
const http = require('http');
const fs = require('fs');
const server = http.createServer((req, res) => {
  // 优化
  const {pathname} = new URL(req.url, 'http://127.0.0.1');
  const filepath = pathname === '/' ? __dirname + '/res_pratice.html' : __dirname + pathname;
  fs.readFile(filepath, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      switch (err.code) {
        case 'ENOENT':
          res.statusCode = 404;
          res.end('<h1>404 Not Found!</h1>');
        case 'EPERM':
          res.statusCode = 403;
          res.end('<h1>403 Forbidden!</h1>');
        default:
          res.statusCode = 500;
          res.end('<h1>Internal Server Error</h1>');
      }
      return;
    }
    res.end(data);
  })
});

server.listen(9000, () => {
  console.log('server started');
  console.log('http://localhost:9000/');
})

```
### GET和POST使用场景
GET请求场景：
* 在地址栏直接输入url访问
* 点击a链接
* link标签引入css
* script标签引入js
* video与audio引入多媒体
* img标签引入图片
* form标签中的method为get

POST请求中的请求
* form标签中的method为post
* AJAX中的post请求

### GET和POST请求区别
GET和POST是HTTP协议请求中的两种方式，主要有以下区别：
1. 作用：GET主要是用来获取数据，POST主要是用来提交数据
2. 参数位置：GET主要用来获取数据，POST主要用来提交数据
3. 安全性：POST请求相对GET安全一些，因为在浏览器中会暴露在地址栏
4. GET请求大小有限制，一般为2k,而POST请求则没有大小限制

## 模块化
### 什么是模块化
> 将一个复杂的程序文件依据一定规则（规范）拆分成多个文件的过程称之为模块化
> 其中拆分出的每个文件就是一个模块。模块内部的数据是私有的，不过模块可以暴露内部数据以使其它模块使用

**模块化项目：**
编码时按照模块一个个编码的，整个项目就是一个模块化的项目

**模块化好处：**
1. 防止命名冲突
2. 高复用性
3. 高维护性

### 模块化初体验
* Commonjs规范

代码示例：me.js
```javascript
// 声明函数
function tiemo(){
    console.log('timemo')
}
module.exports = tiemo;

```
代码示例：index.js
```javascript
//引入模块
const tiemo = require('./me');
// 调用
tiemo();

```
运行：
* ./module/index.js 是相对于当前打开终端的目录路径，根据自己路径找到index.js
```shell
node ./module/index.js
```
### 模块暴露数据
* 方式1：module.exports = value
* 方式2：module.exports = {value1,value2}
* 方式3：export.name = value

📢注意：不要直接exports = value ❎ 错误写法

代码示例： me.js
```javascript
// 声明函数
function tiemo() {
    console.log('timemo')
}

function niejiao() {
    console.log('niejiao');
}

// 暴露数据
// module.exports = tiemo;
// 暴露数据2
module.exports = {
    tiemo,
    niejiao
}
// 暴露数据3
// exports.niejiao = niejiao;
// exports.tiemo = tiemo;


// 注意：不能使用 exports=value的形式暴露数据
// 因为如下相等
// exports = module.exports = {tiemo: tiemo}
// exports.tiemo = tiemo;

```

代码示例：index.js 调用
```javascript
//引入模块
const me = require('./me');
// 调用
me.tiemo();
me.niejiao();
```
### 导入模块
在模块中使用`require`传入文件路径即可使用文件
```javascript
const test = require('./me.js');
```
**`require`使用的一些注意事项**
1. 对于自己创建的模块，导入时路径建议写相对路径，不能省略`./`和`../`
2. js和json文件导入时可以不用写后缀，c/c++编写的node扩展文件也可不写后缀，但一般用不到
3. 如果导入其他类型的文件，会以js文件进行处理
4. 如果导入路径为文件夹，首先会检测`package.json`文件中main属性对应的文件，如果main属性不存在，或者package.json不存在，则会检测文件夹下的index.js和index.json.如果还是没找到，就会报错
5. 导入node.js内置模块时，直接require模块的名字即可，无需加`./`和`../`

> Node.js实现了CommonJS模块化规范

### 导入模块的基本流程
介绍`require`导入自定义模块的基本流程
1. 将相对路径转为绝对路径，定位目标文件
2. 缓存检测
3. 读取目标文件代码
4. 包裹为一个函数并执行（自执行函数）。通过`arguments.callee.toString()`查看自执行函数
5. 缓存模块的值
6. 返回module.exports值

### CommonJS规范
* `module.exports` `exports` 以及`require` 这些都是CommonJS模块化规范中的内容
* Node.js是实现了CommonJS模块化规范，二者关系有点像JavaScript与ECMAScript

## 包管理工具
> 包管理工具就像`哆啦A梦`

### 介绍
> 【包】英文单词 package 代表了一组特定功能的源码集合

**包管理工具**
管理【包】的应用软件，可以对【包】进行下载安装，更新，删除，上传等操作

**常用的包管理工具**
* npm
* yarn
* cnpm

### npm安装与介绍
> node.js在安装时会自动安装npm,若你已经安装了node.js,可以直接使用npm
* 通过 `npm -v`查看版本号测试。显示版本号即为成功，反之失败
### npm初始化包
我在此新建了npm文件夹，并切换终端目录到npm，使用`cd npm`切换到npm文件夹也可。
1. npm init (根据问题回答~使用默认就回车)

📢注意：
* 中文和英文大写命名不允许，默认是文件夹的名称，所以文件夹也不能用中文和大写
* version版本号要求x.x.x形式定义，x必须是数字,默认值1.0.0
* ISC证书与MIT证书功能上是相同的，关于开源证书扩展阅读：[点击查看](http://www.ruanyifeng.com/blog/2011/05/how_to_choose_free_software_licenses.html)
* package.json可以手动创建以及修改
* 使用`npm init -y` 或者`npm init --yes` `极速`创建package.json

### 搜索包
方式2种
1. 命令行 【npm s/search 关键字】
2. 网站搜索 网址是：[https://www.npmjs.com](https://www.npmjs.com)
> 关于如何精准找到需要的包
> 这个事情需要在实践中不断积累，通过看文章，看项目去学习积累

### 下载依赖包
* `npm install` 简写 `npm i`

### require导入npm包基本流程
1. 在当前文件夹的node_modules中寻找同名的文件夹
2. 在上级目录下的node_modules中寻找同名的文件夹，直至找到磁盘根目录

### 生产环境与开发环境
* 开发环境是程序员 专门用来写代码 的环境，一般是指程序员的电脑，开发环境的项目一般只能是程序员自己访问
* 生产环境是项目代码正式运行的环境，一般是指正式的服务器电脑，生产环境的项目一般每个客户都可以访问

### 生产依赖与开发依赖
我们可以在安装时设置区分依赖的类型，目前分为两类


| 类型              | 命令                                      | 补充                                                                |
  |-----------------|-----------------------------------------|-------------------------------------------------------------------|
| 生产依赖            | npm i -S uniq<br/>npm i --save uniq     | -S等效于--save -S是默认选项<br/>包信息保存在package.json中的dependencies属性        |
| 开发依赖            | npm i -D less<br/>npm i --save-dev less | -D等效于--save-dev -S是默认选项<br/>包信息保存在package.json中的devDependencies属性 |

> 比如蛋炒饭需要 大米 油 葱 鸡蛋 锅 煤气 铲子
> 其中 锅 煤气 铲子 属于开发依赖，只在制作阶段使用
> 而大米 有 葱 鸡蛋属于生产依赖 在制作与最终食用都会用
> 所以开发依赖是只在开发阶段使用的依赖包，而生产依赖是开发阶段和最终上线运行阶段都用到的依赖包

### npm全局安装
```shell
npm i -g nodemon
```
全局安装完成之后就可以在命令行的任何位置运行nodemon命令
该命令作用是自动重启node应用程序。【修改文件代码后不需关闭终端，重新运行，会自动监测编译】
使用nodemon运行即可
```shell
nodemon ./fs/fs_writeFile.js
```
与此同时修改./fs/fs_writeFile.js文件会自动编译，不需要关闭重新运行

📢注意：
* 全局安装命令不受工作目录位置影响
* 可以通过`npm root -g` 查看全局安装包位置
* 只有全局类的工具才适合全局安装

### 环境变量path
> 命令行输入命令会在当前目录寻找.exe或者.cmd后缀可执行文件执行，找到执行，找不到则报错。
> 比如输入QQ 会在当前文件夹寻找 QQ.exe或者QQ.cmd的可执行文件。找不到就去`环境变量`中找，所以路径需配置在`环境变量`中。

### 安装所有依赖
* npm i / npm install
```shell
npm i
```
###  npm安装指定版本的包
* 语法：`npm i <包名@版本包>`
  示例：
```shell
npm i jquery@1.11.2
```
### npm删除包
* `npm remove `  /  `npm r`
* `npm uninstall`  / `npm uni`
  全局删除示例：
````shell
npm remove -g modemon
````
局部删除示例：
```shell
npm remove uniq
```
```shell
npm uninstall juery
```
### npm命令配置别名
1. 通过package.json中配置script
> * npm start 是项目中常用命令，用来启动命令。可不加 run
> * npm run 有自动向上级目录查找的特性，跟require函数一样默认
> * 对于陌生项目，我们可以先通过查看scripts属性来参考项目的一些操作。可看到怎么运行项目、打包项目等


示例如：（配置了start启动命令）
```json
{
  "name": "test",
  "version": "1.0.0",
  "description": "学习npm",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "node ./test.js"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "uniq": "^1.0.1"
  }
}
```
2.运行
```shell
npm run start
```
### cnpm
#### 介绍
* cnpm淘宝搭建的`npmjs.com`的完整镜像，也称为【淘宝镜像】，[网址](https://npmmirror.com/)
* cnpm服务部署在国内`阿里云服务器上`，可以提高的下载速度
* 官网也提供了一个全局工具包`cnpm`,操作命令与npm大体相同

#### 安装
```shell
npm install -g cnpm --registry=https://registry.npmmirror.com
```
#### 操作命令
* 基本跟npm相同

| 功能     | 命令                                                                      |
|--------|-------------------------------------------------------------------------|
| 初始化    | cnpm init                                                               |
| 安装包    | cnpm i uniq<br/>cnpm i -S uniq<br/>cnpm i -D uniq<br/>cnpm i -g nodemon |
| 安装项目依赖 | cnpm i                                                                  |
| 删除     | cnpm r uniq<br/>cnpm uni uniq                                           |

### 配置淘宝镜像
用npm可直接下载淘宝镜像，配置方式有两种
* 直接配置
* 工具配置
#### 直接配置
```shell
npm config set registry https://registry.npmmirror.com/
```
#### 工具配置
1. 安装nrm
```shell
npm i -g nrm
```
2. 修改镜像
```shell
nrm use taobao
```
3. 检查是否配置成功
```shell
npm config list
```
PS:  检查registry地址是否为https://reggistry/npmmirror.com/ 如果是则表明成功
> 补充说明:
> 1. 建议使用第二种方式进行镜像配置，因为后续修改起来会比较方便
> 2. 虽然cnpm可以提高速度，但是npm也可以通过淘宝镜像进行加速，所以npm使用率还是高于cnpm
### yarn
#### 介绍
> yarn是Facebook在2016年推出的JavaScript推出的包管理工具 [官网网址](https://yarnpkg.com/)

**特点**
* 速度超快:yam 缓存了每个下载过的包，所以再次使用时无需重复下载。 同时利用并行下载以最大化资源利用率，因此安装速度更快
* 超级安全:在执行代码之前，yarn 会通过算法校验每个安装包的完整性
* 超级可靠:使用详细、简洁的锁文件格式和明确的安装算法，yarn 能够保证在不同系统上无差异的工作
#### 安装
```shell
npm i -g yarn
```
#### yarn常用命令

| 功能     | 命令                                                                               |
|--------|----------------------------------------------------------------------------------|
| 初始化    | yarn init  /  yarn init -y                                                       |
| 安装包    | yarn add uniq 生产依赖<br/>yarn add less --dev 开发依赖<br/>yarn global add nodemon 全局安装 |
| 安装项目依赖 | yarn                                                                        |
| 删除     | yarn remove uniq 删除项目依赖包<br/>yarn global remove nodemon  全局删除包        |
| 运行命令别名 | yarn <别名>                                                                 |

###  npm 和 yarn 选择
大家可以根据不同场景进行选择
1. 个人项目，根据个人喜好选择
2. 公司项目：根据项目代码选择，可以选择通过锁文件判断项目的包管理工具
- npm 锁文件是 package-lock.json
- yarn 锁文件是 yarn.lock
> 包管理工具不要混用，切记，切记，切记

### npm发布一个包
#### 创建与发布
> 将自己开发的工具包发布到npm服务上，方便自己和其它开发者进行使用，操作步骤如下：
1. 创建文件夹，并创建文件main中index.js入口文件，在文件中声明删除，使用module.exports暴露

代码示例：
```javascript
function add(a, b) {
    return a + b;
}

module.exports = {
    add
}
```
2. npm初始化工具包`npm init`，package.json填写包的信息（包名必须唯一）
3. [注册账号](https://www.npmjs.com/registry)
4. 激活账号（一定要激活账号）
5. 修改为官方镜像
* 之前使用了别的镜像，比如淘宝镜像加速，不切回官方镜像很可能会上传失败.
  - 通过nrm方式切回官方镜像：

    **没安装的先安装：**
     ```shell
     npm i -g nrm
     ```
    **切回官方镜像:**
     ```shell
     nrm use npm
     ```
6. 登录npm,按照要求登录
```shell
npm login
```
7. 提交发布包
```shell
npm publish
```
### 更新包
1. 更新包中代码
2. 测试代码是否可用
3. 修改package.json中版本号
4. 发布更新
```shell
npm publish
```
### 删除包
```shell
npm unpublish
```
不成功加上`--force`强制删除
```shell
npm unpublish --force
```
删除包需要一定条件，[查看条件](https://docs.npmjs.com/policies/unpublish)
* 你是包作者
* 发布小于24小时
* 大于24小时后，没有其他包依赖，并且每周小于300下载量，并且只有一个维护者

### 包管理工具扩展介绍
> 很多语言都有包管理工具。除了编程语言，操作系统层面也存在包管理工具。

| 语言         | 包管理工具               |
|------------|---------------------|
| PHP        | composer            |
| Python     | pip                 |
| Java       | maven               |
| Go         | go mod              |
| JavaScript | npm/yarn/cnpm/other |
| Ruby       | rubyGems            |

操作系统也存在包管理工具，不过这个包指的是软件包:

| 操作系统       | 包管理工具         | 网址  |
|------------|---------------------|---------|
| Centos     | composer            |  https://package.debian.org/stabel/ |
| Ubuntu    | apt                 |https://package.ubuntu.com /|
| MacOS       |homeview               |https://brew.sh /|
| Windows         | chocolatey             |https://chocolatey.org |

### nvm介绍与使用
#### 介绍
> nvm 全称 Node Version Manager 顾名思义用来管理node版本工具。方便切换不用版本的Node.js。一般项目中，新旧项目要求的node版本不同，建议使用nvm安装node.js,方便切换
#### 下载安装
> 安装太久，不知道哪个博文好使了，可以去网上寻找细致教程

* [windows的github下载地址](https://github.com/coreybutler/nvm-windoes/releases.)
* 选择 `nvm-setup.exe` 下载即可

#### 常用命令

| 命令                    | 说明                  |
|-----------------------|---------------------|
| nvm use available     | 显示可下载的Node.js版本     |
| nvm list              | 显示已安装的版本            |
| nvm install 18.12.1   | 安装18.12.1版本的Node.js |
| nvm install latest    | 安装最新版本的Node.js      |
| nvm uninstall 18.12.1 | 删除18.12.1版本的Node.js |
| nvm use 18.12.1       | 切换18.12.1的Node.js   |

## express
### express介绍
> 官网介绍：expresss是一个基于Node.js平台的极简、灵活的WEB应用开发框架。[官网网址](https://www.express.com.cn/).简单来说，express是一个封装好的工具包，封装了很多功能，便于我们开发WEB应用。（HTTP服务）
> http模块帮助我们搭建http服务，给浏览器做出相应服务端的功能，直接使用还是不太方面，于是我们借助express框架.

### express路由
> 路由确定了应用程序如何响应客户对特定端点的请求。
* express依旧兼容之前的http的获取请求及其响应方法！


#### 路由基本使用
一个路由有请求方法、路径和回调函数组成
express中提供了一系列方法，可以很方便的使用路由 使用格式如下：
```text
app.<method>(path,callback)
```

PS:代码中1-4方法使用，知识点

代码示例：startlearn.js
```javascript
// 初认识express
// 引入模块
const express = require('express');
// 创建应用对象
const app = express();
const port = 3000;
// 1-创建路由 get方法
app.get('/home', (req, res) => {
  res.end('hello world');
})

// 2-创建路由 get方法
app.post('/login', (req, res) => {
  res.end('hello login');
})

//3- 无论get或post方法
app.all('/test', (req, res) => {
  res.end('no matter methods');
})

//4-上面匹配不上的路由规则
app.all('*', (req, res) => {
  res.end('404 No Found');
})

//监听端口 启动服务
app.listen(port, () => {
  console.log('Express server started');
  console.log('http://localhost:9000/');
})

```
### 获取请求报文参数

| 说明         | 原生http获取                                                                                                                  | express框架获取     |
|------------|---------------------------------------------------------------------------------------------------------------------------|-----------------|
| 获取请求路径path | const url = require('url'); <br/>url.parse(request.url).pathname; /<br/> new URL(req.url,'http://localhost:9000').pathname | req.path        |
| 获取请求参数     | const url = require('url'); url.parse(request.url,true).query;                                                            | req.query       |
| 获取ip       | req.connection.remoteAddress                                                                                              | req.ip          |
| 获取请求头      | req.headers['host']                                                                                                       | req.get('host') |

### 获取路由参数
* 语法eg=》路径`/:id` 通过`req.params.id`获取路由参数

代码示例：
```html
const express = require('express');
const app = express();
//通配符  通过http://localhost:3000/login/1212121访问即可知
app.get('/login/:id', (req, res) => {
// 获取id
console.log(req.params.id);
res.end('login success!');
})
app.get('/', (req, res) => {
res.end('hello');
})
//监听端口 启动服务
app.listen(3000, () => {
console.log('Express server started');
console.log('http://localhost:3000');
})
```
### 路由参数练习

[运行后点击测试](http://localhost:3000/singer/2)
代码示例如下：singer.json + params_pratice.js
```javascript
/** 需求
 * 通过路由id返回歌手名称及其它名称
 */
const express = require('express');
const app = express();
const fs = require('fs');
// 读取歌手假数据json文件
const singersData = fs.readFileSync(__dirname + '/singers.json').toString();
app.get('/singer/:id', (req, res) => {
  const {id} = req.params;
  const matchData = JSON.parse(singersData).singers.find(item => item.id === Number(id));
  res.setHeader('content-type', 'text/html; charset=utf-8');
  if (matchData) {
    res.end(`名称：${matchData.singer_name},其它名称:${matchData.other_name}`);
  } else {
    res.end('No Such a Singer');
  }
})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
})

```
### 一般响应设置
* 设置响应状态码：res.status(200)
* 设置请求头：res.set('asas','aaa')
* 设置响应内容： res.send('你好')
* 连贯操作：res.status(200).set('hahaha~', 'hhh').send('你好 express');

代码示例如下：
```javascript
const express = require('express');
const app = express();
app.get('/', (req, res) => {
//     //原生响应也兼容
//     res.statusCode = 200;
//     res.statusMessage = 'asasa';
//     res.setHeader('hahha', 'hhh');
//     res.write('hello world!');
//     res.end('res content');

// express设置状态码
// res.status(200);
// // express设置请求头
// res.setset('hahaha~', 'hhh');
// // express响应内容 做了封装 中文不乱码
// res.send('你好');

// 连贯操作
  res.status(200).set('hahaha~', 'hhh').send('你好 express');
})

app.listen(3000, () => {
  console.log('server started on port 3000');
  console.log('http://localhost:3000');
});

```
### 其它响应设置
* 设置重定向：res.redirect('http://www.baidu.com')
* 下载响应：res.download('路径')
* 响应json: res.json({内容)
* 响应文件内容：res.sendFile(__dirname+'/home.html')

```javascript
// 其它响应
app.get('/other', (req, res) => {
    //1-设置重定向
    // res.redirect('http://www.baidu.com');
    // 2-下载响应
    // res.download(__dirname + '/singers.json');
    // 3-响应json
    // res.json({
    //     "singer_name": "林俊杰",
    //     "other_name": " JJ Lin",
    //     "id": 2
    // });
    //4-响应文件内容
    res.sendFile(__dirname + '/test.html');
})
```
### 中间件
#### 中间件介绍
* 本质是一个回调函数
* 可以像回调喊出一样访问 请求对象，响应对象
#### 中间件作用
* 中间件作用就是使用函数封装公共操作，简化代码
### 中间件类型
* 全局中间件
* 路由中间件
#### 全局中间价
* 每一个请求到达服务端之后都会执行全局中间件代码

代码示例：middleware.js
```javascript
// 认识中间件
/** 需求
 * 追加日志记录，写入log.txt文件
 */
const express = require('express');
const app = express();
const fs = require('fs');
const path = require('path');

// 全局中间件
// 定义
function recordMiddleWare(req, res, next) {
  // 判断是否有文件 没有就创建
  const filePath = path.resolve(__dirname, './log.txt');
  //  判断文件是否存在，如果不存在就创建一个空文件
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '');
  }
  // 获取url和ip地址
  const {url, ip} = req;
  // 每个请求过来的路由信息都保存到日志记录文件
  fs.appendFileSync(path.resolve(__dirname, `./log.txt`), `${url}    ${ip}\r\n`);
  // 调用next
  next();
}

// 调用中间件函数
app.use(recordMiddleWare);

app.get('/login', (req, res) => {
  res.send('login success!');
})

app.listen(3000, () => {
  console.log('server started at port 3000');
  console.log('http://localhost:3000');
})

```
#### 路由中间件实践
* [运行点击测试1](http://localhost:3000/setting?code=521)
* [运行点击测试2](http://localhost:3000/admin?code=521)
* [运行点击测试3](http://localhost:3000/registry)

代码示例：middleware_pratice.js
```javascript
// 中间件实践
/** 需求
 *  针对/admin /setting的请求，要求URL携带code=521参数，如未携带提示【暗号错误】
 */
const express = require('express');
const app = express();

// 定义中间件
function checkCodeMiddleWare(req, res, next) {
  // 获取code
  const {code} = req.query;
  if (Number(code) === 521) {
    next();
  } else {
    next("【暗号错误】");
  }
}


//调用中间件
app.get('/admin', checkCodeMiddleWare, (req, res) => {
  res.send('admin success!');
})
//调用中间件
app.get('/setting', checkCodeMiddleWare, (req, res) => {
  res.send('setting success!');
})
app.get('/registry', (req, res) => {
  res.send('registry success!');
})
app.get('*', (req, res) => {
  res.send('<h1>404 Not Found</h1>');
})
app.listen(3000, () => {
  console.log('server started at port 3000');
  console.log('http://localhost:3000');
})

```
#### 静态资源中间件
1. 根目录下新建public文件夹=》新建index.html文件+新建index.css文件
2. 代码如下：
```javascript
//静态资源中间件请求
app.use(express.static(__dirname + '/public'));
```
3. 运行代码 staticMiddleware.js,下面路径express/staticMiddleware.js为自己运行的文件路径
```shell
node express/staticMiddleware.js
```
4. 验证
- [默认打开index.html](http://localhost:3000/)
- [可直接查看css文件](http://localhost:3000/index.css)

完整代码示例：
```javascript
// 静态资源中间件
const express = require('express');
const app = express();
//静态资源中间件请求
app.use(express.static(__dirname + '/public'));

// 监听端口 启动服务
app.listen(3000, () => {
  console.log("Server running on port 3000");
  console.log('http://localhost:3000');
})
```
**静态资源中间件注意事项**
1. index.html为默认打开的资源
2. 静态文件与路由规则app.get('/',()=>{})同时匹配，谁先匹配谁就响应，看代码顺序
3. 路由响应动态资源，静态资源中间件响应静态资源

### 获取请求体数据body-parser
1. 安装
```shell
npm i body-parser
```
2. 获取中间件函数
* 处理queryString格式的请求体:const urlParser = bodyParser.urlencoded({extended: false});
* 处理json格式的请求体:const jsonParser = bodyParser.json();
```javascript
// 获取中间件函数
//处理queryString格式的请求体
const urlParser = bodyParser.urlencoded({extended: false});
//处理json格式的请求体
const jsonParser = bodyParser.json();
```
3. 使用中间件
```javascript
//获取请求体数据
app.post('/login', urlParser, (req, res) => {
    // 获取请求体数据
    console.log(req.body);
    res.send('用户名:' + req.body.username + '<br/>密码:' + req.body.password);
})
```
完整代码示例：bodyParser.js
```javascript
// body-parse获取请求体
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// 获取中间件函数
//处理queryString格式的请求体
const urlParser = bodyParser.urlencoded({extended: false});
//处理json格式的请求体
const jsonParser = bodyParser.json();

//响应login页面
app.get('/login', urlParser, (req, res) => {
  res.sendFile(__dirname + '/login.html');
})
//获取请求体数据
app.post('/login', urlParser, (req, res) => {
  // 获取请求体数据
  console.log(req.body);
  res.send('用户名:' + req.body.username + '<br/>密码:' + req.body.password);
})
app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
})

```
### 防盗链
#### 介绍
> 比如有的图片，直接复制地址显示到img是拿不到的，说明这个网站做了防盗链处理。判断源是请求头里的`referer`参数会携带当前域名和协议及其端口进行请求。
#### 实践
完整代码示例：
1. referer.js
```javascript
const express = require('express');
const app = express();
// 定义全局防盗链中间件 判断请求头referer
app.use((req, res, next) => {
  const referer = req.get('referer');
  if (referer) {
    // 实例化
    const url = new URL(referer);
    const hostname = url.hostname;
    console.log(hostname);
    if (hostname !== '127.0.0.1') {
      res.status(404).send('<h1>404 Not Found</h1>');
      return;
    }
  }
  next();
})
// 读取静态资源
app.use(express.static(__dirname + '/public'));

app.listen(3000, () => {
  console.log('Express server listening on port 3000');
  console.log('http://localhost:3000');
})

```
2. public=>index.html
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试！！</h1>
<img src="http://127.0.0.1:3000/images/logo.jpeg" alt="logo">
</body>
</html>

```
### 路由模块化(***)
> 路由功能代码进行拆分

1. 新建文件夹routes
2. 新建homeRouter.js
3. 创建单独的路由规则

- routermodule.js
  **代码示例：**
```javascript
const express = require("express");
const userRouter = require(__dirname + "/routes/userRouter.js");
const adminRouter = require(__dirname + "/routes/adminRouter.js");
const app = express();

app.use(userRouter);
app.use(adminRouter);

app.all("*", function (req, res) {
  res.send('404 Not Found');
})

app.listen(3000, () => {
  console.log("server started");
  console.log('http://localhost:3000');
})

```
- userRouter.js
```javascript
// user routes
const express = require('express');
const router = express.Router();
router.get('/login', (req, res) => {
  res.send('login登录');
})
router.get('/registry', (req, res) => {
  res.send('registry注册');
})
module.exports = router;

```
- adminRouter.js
```javascript
// admin routes
const express = require('express');
const router = express.Router();
router.get('/setting', (req, res) => {
  res.send('设置setting');
})
router.get('/modify', (req, res) => {
  res.send('修改setting');
})
module.exports = router;

```
### 模版引擎
#### 简单介绍
* 模版引擎是分离用户界面和业务数据的一种技术
#### ejs
> 分离HTML和JS的，ejs是一个高效的JavaScript模版引擎。主要了解ejs,现在不多用了。

1. 安装
```shell
npm i ejs
```
2. 导入ejs
```javascript
const ejs = require('ejs');
```
3. 使用ejs渲染

- 代码示例：ejs.js
```javascript
// ejs初体验
const express = require('express');
const ejs = require('ejs');
const fs = require('fs');
const path = require('path');

const app = express();
// 读取静态资源
app.use(express.static(path.join(__dirname, './public')));

const china = '中国';
// 读取html文件
const htmlData = fs.readFileSync(__dirname + '/public/index.html','utf-8').toString();
//使用ejs渲染
const result = ejs.render(htmlData, {china: china});
console.log(result);

```
- 代码示例：index.html
* <h2><%= china %></h2>
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试！！</h1>
<img src="http://127.0.0.1:3000/images/logo.jpeg" alt="logo">

<h1>读出来了吗？</h1>
<h2><%= china %></h2>

</body>
</html>

```
### ejs列表渲染
代码如下：ejs_xiyou.js
```javascript
// ejs列表渲染
/** 需求
 * 渲染ul li 西游数组
 */

const ejs = require('ejs');
const fs = require('fs');

const xiyou = ['唐僧', '孙悟空', '沙僧', '猪八戒'];
const htmlData = fs.readFileSync(__dirname + '/ejs_xiyou.html').toString()

const result = ejs.render(htmlData, {xiyou: xiyou});
console.log(result);

```
代码如下：ejs_xiyou.html
```html
<ul>
    <% xiyou.forEach(item=>{ %>
    <li> <%= item %></li>
    <% }) %>
</ul>
```
### ejs条件渲染
* js如上
* html如下
  代码示例：
```html
<% if(isLogin){ %>
<span>登录成功</span>
<% }else{ %>
<span>登录失败</span>
<% } %>
```
### express中使用ejs
1. 设置模板引擎
```javascript
app.set('view engine', 'ejs');
```
2. 设置模板文件存放位置 新建view文件夹=》views新建.ejs文件，比如home.ejs
```javascript
app.set('views',path.resolve(__dirname,'./views'))
```
3. render响应
```javascript
res.render('home',{title})
```
4. 创建模版文件 其实就是.ejs文件，但其实就是类html文件,主要得含有如下代码：
```html
<%= title %>
```
完整代码示例：express_ejs.js
```javascript
const express = require("express");
const ejs = require("ejs");
const path = require("path");
const app = express();
// 1-设置模版引擎
app.set("view engine", "ejs");
// 2-设置模版文件存放位置
app.set("views", path.resolve(__dirname, "./views"));

app.get('/home', (req, res) => {
  const title = 'Home页面';
  // 3-render响应
  res.render("home", {title});
  // 创建模版文件 home.ejs
})

app.all('*', (req, res) => {
  res.send('404 Not Found');
})

app.listen(3000, () => {
  console.log("Server is running on port 3000");
  console.log('http://localhost:3000');
});

```
完整代码：views=>home.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Title</title>
</head>
<body>
<h1>测试：</h1>
<h1><%= title %> </h1>
</body>
</html>

```
### express-generator工具
* 通过应用生成器express-generator快速创建一个应用骨架
1. 安装
- npx命令来运行（包含Node.js8.2.0及更高的版本中）
```shell
npx express-generator
```
- npm方式
```shell
npm i -g express-generator
```
2. 创建文件夹
* 语法 express -e <文件夹名称>
```shell
express -e generator
```

**查看相关命令**
```shell
express -h
```

### 查看文件上传报文
1. 代码示例 portrait.js
```javascript
const express = require('express');
const path = require('path');
const app = express();
//设置模板引擎
app.set('view engine', 'ejs');
//设置模板引擎存放文件位置
app.set('views', path.resolve(__dirname, './views'));

// render响应
app.get('/portrait', (req, res) => {
  res.render('portrait');
})

app.post('/portrait', (req, res) => {
  console.log(req);
  res.send('成功！');
})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
});

```
2. 完整代码portrait.ejs
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>查看文件上传报文</title>
</head>
<body>
<form action="/portrait" method="post" enctype="multipart/form-data">
    用户名：<input type="text" name="username"><br>
    头像 <input type="file" name="portrait">
    <button>点击提交</button>
</form>
</body>
</html>

```
### 处理文件上传
* 借助库formidable [使用参考](https://www.npmjs.com/package/formidable)
* 注意：Commonjs 使用`require`引入需要安装`V2`版本的，V3的只能使用import 引入
* 创建public文件夹=》images文件夹

代码示例：
```javascript
const express = require('express');
const path = require('path');
const formidable = require('formidable').formidable;

const app = express();
//设置模板引擎
app.set('view engine', 'ejs');
//设置模板引擎存放文件位置
app.set('views', path.resolve(__dirname, './views'));

// render响应
app.get('/portrait', (req, res) => {
  res.render('portrait');
})
// 响应静态资源——方便访问上传的图片
app.use(express.static(path.resolve(__dirname, './public')));

app.post('/portrait', (req, res) => {
  const form = formidable({
    multiple: true,
    // 设置上传文件的保存目录
    uploadDir: path.join(__dirname, './public/images'),
    // 保持文件后缀
    keepExtensions: true
  })
  form.parse(req, (err, fields, files) => {
    if (err) {
      next(err);
      return;
    }
    // 存放非文件的字段
    // console.log(fields);
    // 存放文件
    // console.log(files);
    // 服务器保存存放的照片的访问url
    const url = '/images/' + files.portrait.newFilename;
    res.send(url);
  });

})

app.listen(3000, () => {
  console.log('Express server started');
  console.log('http://localhost:3000');
});

```
## mongoDB
#### 介绍
> 基于分布式文件存储的数据库，[官方网址](https://www.mongodb.com/)

**相比于纯文件管理数据，数据库管理数据优点：**
1. 速度更快
2. 扩展性更强
3. 安全性更强
#### 核心概念
* 数据库：又称数据仓库，可存放很多集合
* 集合：类似于JS中的数据，在集合中可以存放很多文档
* 文档：数据库中的最小单位，类似JS中的对象

#### 下载安装与启动
[下载地址](https://www.mongodb.com/try/download/community)
这边记录下自己的mac安装教程，可根据直接的电脑系统去搜搜安装
* [参考mac安装mongoDB数据库](https://blog.csdn.net/weixin_50268501/article/details/136853814?ops_request_misc=&request_id=&biz_id=102&utm_term=mac%20mongodb%E5%AE%89%E8%A3%85%E6%95%99%E7%A8%8B&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-136853814.nonecase&spm=1018.2226.3001.4187)

**具体步骤：**
1. 进入[MongoDB官网](https://www.mongodb.com/try/download/community)进行下载
2. 下载完毕并且解压，重新命名为 【mongodb】文件夹
3. 打开访达 按住快捷键command+shift+g 前往/usr/local路径
4. 将解压并命名好的【mongodb】文件夹拖入到这个路径下
5. 配置环境变量，在根目录输入open -e .zshrc打开.zshrc文件夹。（注意：我的终端是zsh，如果你们的终端是bash的话应该输入open .bash_profile）
6. 在里面添加一下代码
```text
export PATH=${PATH}:/usr/local/mongodb/bin
```
7. 保存好了文件后，需要执行改文件,在根目录输入 source .zshrc 来进行执行。（注意：我的终端是zsh，如果你们的终端是bash的话应该输入source .bash_profile）
8. 在此执行一下命令（确保是在根目录 不确定就执行 cd ~）
```shell
mongod --version
```
9. 安装mongodb成功了后，那存的数据和日志记录放哪呢。这就需要建立data和log文件夹了。进入到mongodb文件夹的目录下

- 进行mongodb文件夹下
```shell
cd /usr/local/mongodb
```
- 创建
```shell
mkdir data log
```
- 给这data文件夹赋予读写权限，输入电脑开机密码，密码输入的时候看不见。
```shell
sudo chown [你的用户名] /usr/local/mongodb/data
```
- 给这log文件夹赋予读写权限，输入电脑开机密码，密码输入的时候看不见。
```shell
sudo chown [你的用户名] /usr/local/mongodb/log
```

10. 在mongondb路径下启动mongoDB：mongod --fork --dbpath data --logpath log/mongo.log --logappend 这句命令，看到child process started successfully, parent exiting这句话就成功启动服务了
```shell
mongod --fork --dbpath data --logpath log/mongo.log --logappend
```
11. 使用mongo指令
12. 浏览器进入http://127.0.0.1:27017/

13. 关闭数据库服务 （直接关闭）针对于（mac zsh）
```shell
sudo pkill -f mongod
```
14. 再次访问上面网址就会失败

#### mac zsh配置启动脚本
创建一个启动脚本文件，以确保命令在正确的目录中运行：
1. 创建脚本文件：
```zsh
touch start_mongo.sh
```
2. 编辑脚本文件：
```zsh
nano start_mongo.sh
```
3. 添加以下内容：
```zsh
#!/bin/zsh
cd /usr/local/mongodb
mongod --fork --dbpath data --logpath log/mongo.log --logappend

```
保存并退出：
保存文件并退出编辑器（按Ctrl+X退出，按Y保存，回车enter退出）。

PS:同理建立了关闭mongods脚本。
命令为：
```zsh
sudo pkill -f mongod
```
4. 赋予执行权限：
```zsh
chmod +x start_mongo.sh
```
5. 运行脚本：
   现在你可以运行脚本来启动MongoDB：
```zsh
./start_mongo.sh
```
#### mac下载可视化工具Robomongo(studio3T)
* [下载地址](https://studio3t.com/download/)
* [参考可视化工具Robomongo(studio3T)安装使用](https://blog.csdn.net/weixin_38245947/article/details/124588765?ops_request_misc=&request_id=&biz_id=102&utm_term=mac%20mongodb%E5%91%BD%E4%BB%A4&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-2-124588765.142^v100^pc_search_result_base6&spm=1018.2226.3001.4187)

#### 文档命令
1. 插入文档
* 语法：db.集合名.insert(文档对象)
```javascript
db.user.insert({username:'ll',age:18})
```
2. 查询文档
* 语法：db.集合名.find(查询条件)
```javascript
db.user.find({age:20})
```
3. 更新文档
* 语法：db.集合名.update(查询条件,新的文档)
```javascript
db.user.find({name:'张三'},{$set:{age:20}})
```
4. 删除文档
* 语法：db.集合名.remove(查询条件)
```javascript
db.user.remove({name:'张三'})
```
### mongoose
#### 连接数据库
代码及说明如下：
```javascript
// mongoose使用 前提得启动mongoose
// 1-安装依赖
// 2-引入依赖
const mongoose = require('mongoose');

// 3-连接mongodb服务
mongoose.connect('mongodb://127.0.0.1:27017/user');
// 补充说明：1-设置strictQuery为true
mongoose.set('strictQuery', true);

// 设置回调
// 连接成功的回调  补充说明：2-once：事件回调函数只执行一次
mongoose.connection.on('open', () => {
  console.log('连接成功!');
})
// 连接错误的回调
mongoose.connection.on('error', (err) => {
  console.log('连接错误：')
  console.error(err);
})
// 连接关闭的回调
mongoose.connection.on('close', () => {
  console.log('连接关闭');
})

// 关闭连接
setTimeout(function () {
  console.log('连接关闭');
  mongoose.disconnect();
}, 2000)

```
......mongoose大致学到这里，需要的在看文档好了....

## 会话控制
#### 介绍
> 所谓会话控制是对会话进行控制。
> 因为HTTP是一个无状态的协议，它没有办法区分多次的请求是否来自同一客户端，无法区分用户，而产品中又大量存在这样的需求，所以我们需要通过会话控制解决该问题。

**常见的会话控制方式：**
* Cookie
* Session
* Token

### Cookie
> cookie是HTTP服务器发送到用户浏览器并保存在本地的一小块数据
* cookie是保存在浏览器的一小块数据
* cookie是按照域名划分保存的

**特点：**
* 浏览器向服务器发送请求时，会自动将当前域名可用的cookie设置在请求头中，然后传递给服务器。
* 请求头的名字也叫cookie 所以将cookie理解为一个http的请求头也是可以的

#### 浏览器Cookie
1. 禁用cookie
> 这个操作一般不做

* 网站——隐私设置和安全性设置——常规设置——阻止所有cookie

2. 删除cookie
* 网站——隐私设置和安全性设置——清除相应网站数据

3. 查看cookie
* edge浏览器查看——输入cookie查询——cookie和网站数据——点击下拉查看
* 谷歌浏览器查看——网站链接旁的左上方小锁——cookie和网站数据——点击查看

#### express Cookie
1. 设置cookie
*  eg:res.`cookie`('name','lhm',{})
```javascript
const express = require('express');
const app = express();
app.get('/set-cookie',(req,res)=>{
    res.cookie('name','lhm');//会在浏览器关闭的时候，销毁
    res.cookie('name','lhm',{maxAge:60 * 1000}); //maxAge最大存活时间 单位毫秒 但是浏览器中存的是秒s
    res.send('home');
})
```
2. 删除cookie
* eg:res.`clearCookie`('name')
```javascript
const express = require('express');
const app = express();
app.get('/remove-cookie',(req,res)=>{
    res.clearCookie('name');
    res.send('remove');
})
```
3. 读取cookie
* 工具库cookie-parse,使用这个为一个cookie解析中间件
1. 安装依赖
```shell
npm i cookie-parse
```
2. 引入使用
```javascript
const express = require('express');
const cookieParse = require('cookie-parse');
const app = express();
app.use(cookieParse());
```
3. 获取cookie值
* `req.cookies`获取到cookie值
```javascript
app.get('/get-cookie',(req,res)=>{
  console.log(req.cookies);
  console.log(res.cookies.name);
})
```
### session
> 保存到服务器的一块儿数据，保存当前访问的用户的相关信息

**作用：**
> 实现会话控制，可以识别用户的身份，快速获取当前用户的相关信息

**运行流程：**
1. 填写账号和密码校验身份，校验填入通过后创建session信息，然后通过session_id的值通过响应头返回给浏览器
2. 有了cookie,下载发送请求会自动携带cookie,服务器通过cookie和session_id的值确定用户的身份

### session与cookie区别
* 存在位置不同。cookie存在浏览器，session 服务端
* 安全性。cookie明文存在客户端，session是存在服务器，安全性相对较好
* 网络传输量。 cookie设置内容过多会增加保温体积，影响传输效率。session数据存储在服务器，只是通过cookie传递id,所以不影响传输效率
* 存储限制。cookie保存的数据不超过4k 且单个域名下的存储数量有限。session数据存储在服务器，没有限制。


视频的基础知识大致学到这里，下面似乎涉及用处小，需要的时候还有机会的话再更新吧...

完结撒花~~~
。cookie保存的数据不超过4k 且单个域名下的存储数量有限。session数据存储在服务器，没有限制。


视频的基础知识大致学到这里，下面似乎涉及用处小，需要的时候还有机会的话再更新吧...

完结撒花~~~
