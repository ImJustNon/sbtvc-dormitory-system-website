const express = require('express');
const router = express.Router();
const { query } = require('../database/postgreSQL/connect.js');
const { get_ip } = require('../utils/get_Ip.js');
const { split_post_data } = require('../utils/split_post_data');
const { get_date } = require('../utils/get_Date.js');
const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});

router.get('/dorm/contact', async(req, res) =>{

    // ดึงข้อม฿ลการ Login เเละ เช็คสถานะ
    const checkIP = await query({
        sql: `SELECT * FROM login_ip WHERE ip='${await get_ip(req)}'`,
    });
    // หากไม่พบการ login ให้ ไปที่หน้า Login 
    if(checkIP.rows.length === 0){
        return res.redirect("/dorm/login");
    }

    // หาก login เเล้วให้สั่ง render หน้าได้
    res.render('index', {
        title: `CONTACT`,
        error: null,
    });
});

module.exports = router;