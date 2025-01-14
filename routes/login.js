var express = require("express");
var router = express();
var login = require("../models/Login");
var dbData = require("../config/mongoose");

const mongoose = require("mongoose");

// Database connection
mongoose.connect("mongodb://localhost:27017/test", {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

router.get("/getlogin", function (req, res, next) {
  dbData.selectall("login111", function (result) {
    res.send(result);
  });
});

// 登录
router.post("/login", function (req, res, next) {
  const updateStr = {
    name: req.body.name,
    password: req.body.password,
  };
  login.findOne(updateStr, (err, docs) => {
    if (!err) {
      if (docs) {
        res.cookie("userid", docs._id);
        res.send({
          code: 1,
          data: "登录成功",
        });
      } else {
        res.send({
          code: 0,
          data: "用户不存在或密码错误",
        });
      }
    }
  });
});

router.get("/info", function (req, res) {
  const { userid } = req.cookies;
  if (!userid) {
    return res.json({ code: 1 });
  }
  login.findOne({ _id: userid }, function (err, doc) {
    if (err) {
      return res.json({
        code: 1,
        msg: "服务器炸了",
      });
    }
    if (doc) {
      delete doc.password;
      const new_object = JSON.parse(JSON.stringify(doc));
      delete new_object.password;
      new_object.date = new Date();
      return res.json({
        code: 0,
        data: new_object,
      });
    }
  });
});

router.get("/getdate", function (req, res, next) {
  dbData.selectall("login111", function (result) {
    result.map((item) => {
      return delete item.password;
    });
    res.send(result);
  });
});

// 更新数据
router.post("/update", (req, res) => {
  // 需要更新的数据
  const id = req.body.id;
  const updateStr = {
    name: req.body.name,
    password: req.body.password,
    age: req.body.age,
    identity: req.body.identity,
    phone: req.body.phone,
    sex: req.body.sex,
    email: req.body.email,
  };
  const ids = {
    _id: id,
  };
  login.findByIdAndUpdate(ids, updateStr, (err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "更新失败" });
    } else {
      res.send({ code: 1, errorMsg: "更新成功" });
    }
  });
});

// 新增一条数据 接口为add
router.post("/add", (req, res) => {
  const Login = new login({
    name: req.body.name,
    sex: req.body.sex,
    age: req.body.age,
    phone: req.body.phone,
    email: req.body.email,
    identity: req.body.identity,
    password: req.body.password,
  });
  Login.save((err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "新增失败" });
    } else {
      res.send({ code: 0, errorMsg: "新增成功" });
    }
  });
});

// 删除一条接口，接口delete
router.post("/del", (req, res) => {
  const id = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { _id: id };
  login.remove(whereid, (err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "删除失败" });
    } else {
      res.send({ code: 0, errorMsg: "删除成功" });
    }
  });
});

module.exports = router;
