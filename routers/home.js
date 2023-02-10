const express = require('express');
const router = express.Router();
const { query } = require('../database/postgreSQL/connect.js');
const { get_ip } = require('../utils/get_Ip.js');
const { split_post_data } = require('../utils/split_post_data');

router.get('/dorm/home', async(req, res) =>{
    const checkIP = await query({
        sql: `SELECT * FROM login_ip WHERE ip='${await get_ip(req)}'`,
    });
    if(checkIP.rows.length == 0){
        res.redirect("/dorm/login");
    }
    else {

        let { page } = req.query ?? {}; // รับหน้าที่จะเเสดง
        if(typeof page === "undefined" || isNaN(page)){    // ถ้ารับมา มัค่าเป็น undefined หรือ มีตัวอักษร
            page = "1";
        }
        // ===================== Home Announcement Post ========================

        const get_announcement_post = await query({
            sql: "SELECT * FROM announcement_post"
        });

        let total_page = get_announcement_post.rows.length / 5;
        // เรียงรายการโพสจากใหม่สุด ไป เก่าสุด
        await get_announcement_post.rows.sort((newest, oldest) => oldest.timestamp - newest.timestamp);
        
        let home_announcement = await split_post_data(page, get_announcement_post.rows); // ตั้งค่าเริ่มต้น
        
        if(get_announcement_post.rows.length === 0){ // หากไม่มีโพสประกาศ 
            home_announcement = null; // เปลี่ยนค่า
        }
        // =================== Banner ==========================
        // ขอข้อมูลภาพทั้งหมด
        const get_home_banner = await query({
            sql: `SELECT * FROM home_banner`,
        });

        let home_banner = get_home_banner.rows; // ตั้งค่าเริ่มต้น
        if(get_home_banner.rows.length === 0){  //หากไม่พบข้อมูล
            home_banner = null;
        }


        // =================== ส่งข้อมูล =========================
        res.render("index",{
            title: "HOME",
            announcement_post: home_announcement,
            page: page,
            total_page: total_page,
            banner: home_banner,
        });
    }
});
module.exports = router;

/*
if(get_announcement_post.rows.length === 0){ // หากไม่มีโพสประกาศ 
    return res.render("index",{
        title: "HOME",
        announcement_post: null,
        page: null,
        total_page: null,
        home
    });
}
        // หากมีโพสประกาศ //เน้นอันนี้ล่ะ
res.render("index",{
    title: "HOME",
    announcement_post: await split_post_data(page, get_announcement_post.rows),
    page: page,
    total_page: total_page,
});
*/