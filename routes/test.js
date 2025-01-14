var express = require('express');
var router = express();
var User = require('../models/User')
var dbData = require('../config/mongoose')

router.get('/', function(req, res, next) {
    dbData.selectall('pageinfo', function(result){
        res.send(result);
    })
});

router.get('/getdate', function(req, res, next) {
    dbData.selectall('test111', function(result){
        res.send(result);
    })
});

// 更新数据
router.post('/update', (req, res) => {
    // 需要更新的数据
    const id = req.body.id,
      name = req.body.name
    const updateStr = {
      name: name,
    };
    const ids = {
      _id: id
    };
    User.findByIdAndUpdate(ids, updateStr, (err, docs) => {
      if (err) {
        res.send({ 'code': 1, 'errorMsg': '更新失败' });
      } else {
        res.send({ 'code': 1, 'errorMsg': '更新成功' });
      }
    });
  });

// 新增一条数据 接口为add
  router.post('/add', (req, res) => {
    const user = new User({
      name: req.body.name,
      sex: req.body.sex
    });
    user.save((err, docs) => {
      if (err) {
        res.send({ 'code': 1, 'errorMsg': '新增失败' });
      } else {
        res.send({ "code": 0, 'errorMsg': '新增成功' });
      }
    });
  });

// 删除一条接口，接口delete
  router.post('/del', (req, res) => {
    const id = req.body.id;
    // 根据自动分配的 _id 进行删除
    const whereid = { '_id': id };
    User.remove(whereid, (err, docs) => {
      if (err) {
        res.send({ 'code': 1, 'errorMsg': '删除失败' });
      } else {
        res.send({ 'code': 0, 'errorMsg': '删除成功' });
      }
    })
  });

module.exports = router;
