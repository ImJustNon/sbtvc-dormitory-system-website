const express = require('express');
const router = express.Router();

const { query } = require('../database/postgreSQL/connect.js');
const { get_ip } = require('../utils/get_Ip.js');
const { split_post_data } = require('../utils/split_post_data');

const bodyParser = require('body-parser');
const urlEncoded = bodyParser.urlencoded({
    limit: '50mb',
    extended: true,
});

router.get('/dorm/repair-report', async(req, res) =>{
    const checkIP = await query({
        sql: `SELECT * FROM login_ip WHERE ip='${await get_ip(req)}'`,
    });
    if(checkIP.rows.length == 0){
        return res.redirect("/dorm/login");
    }
    
    // สั่ง render ฟอร์มเเจ้งได้เลย
    res.render('index', {
        title: `Repair-Report`,
        error: null,
    });
});

// รับขอมูลที่ส่งมา
router.post('/dorm/repair-report', urlEncoded, async(req, res) =>{
    const { title, content, report_by, report_date } = req.body;
    
    // เช็คว่าพบข้อมูลทั้งหมด
    if(!title, !content, !report_by, !report_date){
        return res.json({
            status: "FAIL",
            error: "Some information missing",
        });
    }

    // บันทึกข้อมูล
    await query({
        sql: `INSERT INTO repair_report(title,content,create_at,report_by,report_date) VALUES('${title}','${content}','${new Date().getTime()}','${report_by}','${report_date}')`,
    }).then(() =>{
        // เข้าหน้า Home อัตโนมัติ
        res.redirect('/dorm/home');
    });
});

module.exports = router;