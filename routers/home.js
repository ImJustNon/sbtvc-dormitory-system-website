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
        // =============================================

        const get_announcement_post = await query({
            sql: "SELECT * FROM announcement_post"
        });
        if(get_announcement_post.rows.length !== 0){ // หากมีโพสประกาศ //เน้นอันนี้ล่ะ
            res.render("index",{
                title: "HOME",
                announcement_post: await split_post_data(page, get_announcement_post.rows),
                page: page
            });
        }
        else { // หากไม่มีโพสประกาศ
            res.render("index",{
                title: "HOME",
                announcement_post: null,
                page: null,
            });
        }
    }
});
module.exports = router;