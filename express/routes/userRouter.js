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
