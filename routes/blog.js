const express = require("express");
const router = express();
const Blog = require("../models/Blog");
const dbData = require("../config/mongoose");

router.get("/allblog", function (req, res, next) {
  dbData.selectall("blog111", function (result) {
    res.send(result);
  });
});

// 新增一条数据 接口为add
router.post("/add", (req, res) => {
  const blog = new Blog({
    username: req.body.username,
    blog: req.body.blog,
    title: req.body.title,
    path: req.body.path,
    startdate: new Date(),
    enddate: new Date()
  });
  blog.save((err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "新增失败" });
    } else {
      res.send({ code: 0, errorMsg: "新增成功" });
    }
  });
});
// User.update({userName:"zs"},{"$set":{userName:"ls"}},function(err,doc){}
router.post("/update", (req, res) => {
  // 需要更新的数据
  const id = req.body.id;
  const updateStr = {
    path: req.body.path,
    blog: req.body.blog,
    title: req.body.title,
    enddate: new Date()
  };
  const ids = {
    _id: id,
  };
  Blog.findByIdAndUpdate(ids, updateStr, (err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "更新失败" });
    } else {
      res.send({ code: 1, errorMsg: "更新成功" });
    }
  });
});

// 删除一条接口，接口delete
router.post("/del", (req, res) => {
  const ids = req.body.id;
  // 根据自动分配的 _id 进行删除
  const whereid = { _id: { $in: ids } };
  Blog.deleteMany(whereid, (err, docs) => {
    if (err) {
      res.send({ code: 1, errorMsg: "删除失败" });
    } else {
      res.send({ code: 0, errorMsg: "删除成功" });
    }
  });
});

module.exports = router;
