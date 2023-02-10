const express = require('express');
const router = express.Router();

// อย่าลืมลบนี้
router.get('/', (req, res) =>{
    res.redirect("/dorm");
});

// 👍
router.get('/dorm', (req, res) =>{
    res.redirect("/dorm/home");
});
module.exports= router;