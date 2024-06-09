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
