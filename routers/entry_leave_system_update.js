const express = require('express');
const router = express.Router();
const { query } = require('../database/postgreSQL/connect.js');
const { get_ip } = require('../utils/get_Ip.js');
const bodyParser = require('body-parser');
const urlencoded = bodyParser.urlencoded({ 
    limit: '50mb',
    extended: true,
});


router.get('/dorm/api/entry-leave-system-update', urlencoded, async(req, res) =>{
    const sended_form_date = new Date().getTime(); // รับ วัน-เวลา ในรูปเเบบตัวเลข
    const getUserData = await query({
        sql: `SELECT * FROM login_ip WHERE ip='${await get_ip(req)}'`,
    });
    if(getUserData.rows.length === 0){
        return res.redirect("/dorm/login");
    }
   
    const { back_in, id } = req.query ?? {};

    
    if(back_in.toLowerCase() == 'true'){
        // ลบ ส่วนข้องการบรรทึกของ User
        await query({ 
            sql: `DELETE FROM entry_leave_system_form_data WHERE student_id='${getUserData.rows[0].username}'`,
        });
        // Update ว่าได้กลับมาเเล้ว
        await query({
            sql: `UPDATE entry_leave_system_admin SET back_in=true WHERE id=${String(id)}`,
        });
    }

    res.redirect("/dorm/home");
    
});
module.exports = router;