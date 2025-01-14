var express = require('express');
var router = express();
var Comment = require('../models/Comment')
var dbData = require('../config/mongoose')

router.get('/', function(req, res, next) {
    dbData.selectall('pageinfo', function(result){
        res.send(result);
    })
});

router.get('/getcomment', function(req, res, next) {
    dbData.selectall('comment111', function(result){
        res.send(result);
    })
});

// 新增一条数据 接口为add
router.post('/add', (req, res) => {
    const comment = new Comment({
      name: req.body.name,
      comment: req.body.comment,
      identity: req.body.identity,
      date: new Date()
    });
    comment.save((err, docs) => {
      if (err) {
        res.send({ 'code': 1, 'errorMsg': '新增失败' });
      } else {
        res.send({ "code": 0, 'errorMsg': '新增成功' });
      }
    });
  });

// 删除一条接口，接口delete
router.post('/del', (req, res) => {
  const ids = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { '_id': {"$in": ids} };
  Comment.deleteMany(whereid, (err, docs) => {
    if (err) {
      res.send({ 'code': 1, 'errorMsg': '删除失败' });
    } else {
      res.send({ 'code': 0, 'errorMsg': '删除成功' });
    }
  })
});

module.exports = router;