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

router.get('/dorm/bug-report', async(req, res) =>{
    // ไม่ต้องตรวจสอบ login

    // สั่ง render ฟอร์มเเจ้งได้เลย
    res.render('bug_report', {
        title: `Bug-Report`,
        error: null,
    });
});

router.post('/dorm/bug-report', urlEncoded, async(req, res) =>{
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
        sql: `INSERT INTO bug_report(title,content,create_at,report_by,report_date) VALUES('${title}','${content}','${new Date().getTime()}','${report_by}','${report_date}')`,
    }).then(() =>{
        // หากมาจากหน้า login ให้กลับไป
        // เเต่ถ้ามีการล็อกอินเเล้สวจะเข้าหน้า Home อัตโนมัติ
        res.redirect('/dorm/login');
    });

});
module.exports = router;