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
