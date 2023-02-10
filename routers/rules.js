const express = require('express');
const router = express.Router();
const { query } = require('../database/postgreSQL/connect.js');
const { get_ip } = require('../utils/get_Ip.js');

router.get('/dorm/rules', async(req, res) =>{
    // Check Login
    const checkIP = await query({
        sql: `SELECT * FROM login_ip WHERE ip='${await get_ip(req)}'`,
    });
    if(checkIP.rows.length == 0){
        return res.redirect("/dorm/login");
    }
    // ====================================================================
    res.render("index", {
        title: "Rules"
    });
});

module.exports = router;