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
