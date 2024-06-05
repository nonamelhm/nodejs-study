# node.js学习实操及笔记
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









