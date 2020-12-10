require('dotenv').config();  //管理資料庫帳密

const express = require('express');  //引入 express
const multer = require('multer');
const fs = require('fs');
const {v4: uuidv4} = require('uuid');
const axios = require('axios');
const jwt = require('jsonwebtoken');
const session = require('express-session');
const MysqlStore = require('express-mysql-session')(session);
const moment = require('moment-timezone');
const cors = require('cors');
const upload = multer({dest: __dirname + '/../tmp_uploads'});

// 建立 web server 物件
const app = express();

app.use( express.urlencoded({extended: false}));
app.use( express.json() );







app.use( express.static,require(__dirname + '/public'));
app.use( '/login-api',require(__dirname + '/src/Cha/cha'));
app.use( '/login-api',require(__dirname + '/src/Cha/cha'));
app.use( '/login-api',require(__dirname + '/src/Cha/cha'));
app.use( '/login-api',require(__dirname + '/src/Cha/cha'));
app.use( '/login-api',require(__dirname + '/src/Cha/cha'));









app.get('/json-sales2', (req, res)=>{
    const sales = require(__direname + '/../data/sales');
    res.render('abc/def/json-sales2',{sales});
});

// 取得queryString的資料
app.get('/try-qs', (req, res)=>{
    res.json(req.query);
});

app.post('/try-post',(req, res)=>{
    res.json(req.body);
});

app.get('/try-post-form',(req, res)=>{
    res.render('try-post-form',{email:'',password:''});
});

app.post('/try-post-form',(req, res)=>{
    res.render('try-post-form',req.body);
});

app.post('/try-upload', upload.single('avatar'), (req, res)=>{
    console.log(req.file);

    if(req.file && req.file.originalname){
        let ext = '';

        switch(req.file.mimetype){
            case 'image/png':
            case 'image/jpeg':
            case 'image/gif':

                fs.rename(
                    req.file.path,
                    __dirname + '/../public/img/' + req.file.originalname,
                    error=>{

                        return res.json({
                            success: true,
                            path: '/img/'+ req.file.originalname
                        });
                    });

                break;
            default:
                fs.unlink(req.file.path, error=>{
                    return res.json({
                        success: false,
                        msg: '不是圖檔'
                    });
                });
        }
    } else {
        return res.json({
            success: false,
            msg: '沒有上傳檔案'
        });
    }
});

app.get('/try-uuid',(req, res)=>{
    res.json({
        uuid1: uuidv4(),
        uuid2: uuidv4(),
    });
});

const upload2 = require(__dirname + '/upload-img-module');
app.post('/try-upload2', upload2.single('avatar'), (req, res)=> {
    res.json(req.file);
});

app.get('/my-params1/:action?/:id?', (req, res)=> {
    res.json(req.params);
});
app.get('/my-params2/*?/*?', (req, res)=> {
    res.json(req.params);
});

app.get(/^\/m\/09\d{2}-?\d{3}-?\d{3}$/i, (req, res)=> {
    let u = req.url.slice(3).split('?')[0];
    u = u.replace(/-/g, '');
    res.send(u);
}); 

app.use(require(__dirname + '/routes/admin2'));
app.use('/members',require(__dirname + '/routes/admin3')); 

app.get('/yahoo',async (req,res)=>{
    const response = await axios.get('https://tw.yahoo.com/');
})

// session設定，顯示頁面刷新次數
app.get('/try-session', (req, res)=>{
    req.session.myVar = req.session.myVar || 0;
    req.session.myVar++;
    res.json({
        myVar: req.session.myVar,
        session: req.session
    });
});

// 使用外掛moment
app.get('/try-moment', (req, res)=>{
    const fm = 'YYYY-MM-DD HH:mm:ss';
    const now = moment(new Date());
    res.json({
    t1: new Date(),
    t2: now.format(fm),
    t2a: now.tz('Europe/London').format(fm),
    t3: moment(req.session.cookie.expires).format(fm),
    t3: moment(req.session.cookie.expires).tz('Asia/Tokyo').format(fm),
    'process.env.DB_NAME':process.env.DB_NAME, 
    });
});    

// 讀取MySQL資料庫中的資料表
app.get('/try-db',(req,res)=>{
    db.query('SELECT *FROM  address_book LIMIT 250')
        .then(([results])=>{
            res.json(results);
        })
});

app.use('/address-book', require(__dirname + '/routes/address-book'));

//使用靜態內容的資料夾
app.use( express.static(__dirname + '/../public'));

// 自訂404頁面
app.use((req, res)=>{
    res
        .type('text/plain')
        .status(404)
        .send('找不到網頁啦XDDD');
});

// Server 偵聽
app.listen(process.env.PORT || 5000, ()=>{
    console.log('伺服器已啟動...{PORT}');
})