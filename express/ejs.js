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
