// ejs列表渲染
/** 需求
 * 渲染ul li 西游数组
 */

const ejs = require('ejs');
const fs = require('fs');

const xiyou = ['唐僧', '孙悟空', '沙僧', '猪八戒'];
const isLogin = true;
const htmlData = fs.readFileSync(__dirname + '/ejs_xiyou.html').toString()

const result = ejs.render(htmlData, {isLogin: isLogin, xiyou: xiyou});
console.log(result);
