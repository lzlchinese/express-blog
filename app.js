var multer = require('multer');
var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var loginRouter = require('./routes/login');
var testRouter = require('./routes/test');
var commentRouter = require('./routes/comment');
var uploaderRouter =  require('./routes/file');
var blogRouter =  require('./routes/blog');
var actionRouter =  require('./routes/action');

// var mongoose = require('./config/mongoose');
// var db = mongoose();

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public/upload')));
const aaa = path.join(__dirname, 'public/upload')

// 跨域设置
app.all("*", function(req, res, next) {
  res.header("Access-Control-Allow-Credentials", true);
  res.header("Access-Control-Allow-Origin", req.headers.origin);
  res.header("Access-Control-Allow-Headers", ['mytoken', 'Content-Type', 'userid']);
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/login', loginRouter);
app.use('/test', testRouter);
app.use('/comment', commentRouter);
app.use('/file', uploaderRouter);
app.use('/blog', blogRouter);
app.use('/action', actionRouter);

// catch 404 and forward to error handler

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
console.log(err)
  // res.render('error');
});

module.exports = app;

// 引入WebSocket
const ws = require("express-ws")
// 将webSocket服务混入app，相当于为app添加.ws方法
ws(app)
//为了获取到所以的客户端
const wss = ws(app).getWss('/')
// 建立webSocket服务
app.ws('/', (ws, req) => {
    console.log("连接成功！");
    // send给客户端发消息
    // on是监听事件
    // message表示服务端传来的数据
    ws.on("message", (msg) => {
        // 给所有的客户端广播消息
        wss.clients.forEach((e) => {
            e.send(msg)
        })
    })
    // close 事件表示客户端断开连接时执行的回调函数
  ws.on('close', function (e) {
    console.log('close connection')
  })
  
})

app.listen(3004, () => {
    console.log('success in port 3004，服务已经跑起来啦');
})
