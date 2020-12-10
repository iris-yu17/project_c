//引入express
const express = require('express');
//引入router，路由模組化
const router = express.Router();
//引入需要用的套件
// const { v4: uuidv4 } = require('uuid');
// 引入資料庫
const db = require(__dirname + '/../db_connect');
const upload = require(__dirname + '/../upload-img-module');

const router = express.Router();
//路由名稱+功能

// GET會員資料表
router.get('/member', (req, res) => {
    db.query('SELECT * FROM `member_list` WHERE 1')
        .then(([results]) => {
            res.json(results);
        })
});

// GET我的訂單資料表
router.get('/myorder', (req, res) => {
    db.query('SELECT * FROM `myorder` WHERE 1')
        .then(([results]) => {
            res.json(results);
        })
});

// GET訂單明細資料表
router.get('/myorder-detail', (req, res) => {
    db.query('SELECT * FROM `myorder_detail` WHERE 1')
        .then(([results]) => {
            res.json(results);
        })
});
// GET商品資料表
router.get('/product', (req, res) => {
    db.query('SELECT * FROM `product` WHERE 1')
        .then(([results]) => {
            res.json(results);
        })
});

// POST
// router.post('/myorder',(req, res)=>{
//     res.json(req.body);
// });
// router.post('/myorder', upload.none(), async (req, res)=>{
//     const data = {...req.body};
//     data.created_at = new Date();
//     const sql = "INSERT INTO `address_book` set ?";
//     const [{affectedRows, insertId}] = await db.query(sql, [ data ]);
//     res.json({
//         success: !!affectedRows,
//         affectedRows,
//         insertId,
//     });
// });
router.post('/myorder', upload.none(), async (req, res)=>{
    const sql = "INSERT INTO `address_book` set ?";
    const [{affectedRows, insertId}] = await db.query(sql, [ req.body ]);
    res.json({
        success: !!affectedRows,
        affectedRows,
        insertId,
    });
});
// router.post('/myorder', async (req, res)=>{
//     const sql = "INSERT INTO `address_book` set ?";
//     const [{affectedRows, insertId}] = await db.query(sql, [ req.body ]);
//     res.json({
//         success: !!affectedRows,
//         affectedRows,
//         insertId,
//     });
// router.post('/myorder', async (req, res)=>{
//     const sql = "INSERT INTO `address_book` set ?";
//      await db.query(sql, [ req.body ]);
// });
// 手機格式
// app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=> {
//     let u = req.url.slice(3).split('?')[0];
//     u = u.replace(/-/g, '');
//     res.send(u);
// }); 

//輸出路由
module.exports = router;


