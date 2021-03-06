//引入express
const express = require('express');
//引入router，路由模組化
const router = express.Router();
//引入需要用的套件
// const { v4: uuidv4 } = require('uuid');
// 引入資料庫
const db = require(__dirname + '/../db_connect');
//路由名稱+功能

//// 購物車的API
// GET會員資料表
router.get('/member/:id', (req, res) => {
    db.query(`SELECT * FROM \`member_list\` WHERE member_sid =${req.params.id}`)
        .then(([results]) => {
            res.json(results);
        })
});
    
// 新增訂單資料到「我的訂單」資料表
    router.post('/my-order', async (req, res)=>{
        const sql = "INSERT INTO `my_order` set ?";
        const [{affectedRows, insertId}] = await db.query(sql, [ req.body.bodyData ]);
        // res.json({
        //     success: !!affectedRows,
        //     affectedRows,
        //     insertId,
        // });

        console.log('req.body.bodyData',req.body.bodyData);

        const sql2 = "INSERT INTO `my_order_detail` (order_sid,product_sid,product_amount, product_name,product_price) VALUES ?";

        const rebuild =req.body.myOrderDetailArray.map((item)=>[insertId,item.product_sid,item.product_amount,item.product_name,item.product_price ])
        // console.log(rebuild)
        await db.query(sql2, [rebuild]);
        res.json({
            success: !!affectedRows,
            affectedRows,
            insertId,
        });

        console.log('rebuild',rebuild)

        res.json({
            success: true,
        });
    });

// 新增到「我的訂單明細」資料表
router.post('/my-order-detail', async (req, res)=>{
    // console.log(req.body)

     
});


////訂單管理的API
// GET我的訂單資料表
router.get('/my-order/:id', (req, res) => {
    db.query(`SELECT * FROM \`my_order\` WHERE member_sid =${req.params.id}`)
        .then(([results]) => {
            res.json(results);
        })
    });
// router.post('/my-order', async (req, res)=>{
//     const sql = "INSERT INTO `my_order` set ?";
//      await db.query(sql, [ req.body ]);
//      res.json(req.body);
//      });

// GET訂單明細資料表
router.get('/my-order-detail/:id', (req, res) => {
    db.query(`SELECT * FROM \`my_order_detail\` WHERE order_sid = ${req.params.id}`)
    // res.json({
    //     id:req.params.id
    // })
    .then(([results]) => {
        res.json(results);
    })
});
// router.get('/my-order-detail/:id', (req, res) => {
    //     db.query('SELECT * FROM `my_order` WHERE order_id=req.params')
    //     res.json({
        //         id:req.params.id
        //     })
        // db.query('SELECT * FROM `my_order_detail` WHERE 1')
    //     .then(([results]) => {
    //         res.json(results);
    //     })
// });
// // GET訂單明細資料表
//     db.query(`SELECT * FROM \`my_order_detail\` WHERE order_sid = ${req.params.id}`)
//     // res.json({
//     //     id:req.params.id
//     // })
//     .then(([results]) => {
//         res.json(results);
//     })
//     });

// GET「我的訂單」+「我的訂單明細」資料表
router.get('/my-order-my-order-detail/:id',async (req, res) => {
   const [a]= await db.query(`SELECT * FROM \`my_order\` WHERE member_sid =${req.params.id}`)
//    res.json(results);
   const [b]= await db.query(`SELECT * FROM \`my_order_detail\` WHERE member_sid = ${req.params.id}`)
   const result = a.map((item)=>{
       const x = b.filter((e)=>e.order_sid===item.sid)
       return(
           {...item,
        order_detail: x 
        }
       )
   })
   res.json(result);            
});




// GET商品資料表
router.get('/product', (req, res) => {
    db.query('SELECT * FROM `product` WHERE 1')
        .then(([results]) => {
            res.json(results);
        })
});


// 手機格式
// app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=> {
//     let u = req.url.slice(3).split('?')[0];
//     u = u.replace(/-/g, '');
//     res.send(u);
// }); 

//輸出路由
module.exports = router;