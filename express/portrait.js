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
