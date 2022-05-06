var express = require('express');
var router = express.Router();
var fs = require('fs')
/* GET home page. */
router.get('/', function (req, res, next) {
  fs.readdir('./public/uploads', function (err, file) {
    var handle=false
    res.render('index', { file, handle })
  })
});
router.get('/createfile', function (req, res) {
  fs.writeFile(`./public/uploads/${req.query.filename}`,"",function (err, data) {
    res.redirect('/')
  });
})
router.get('/delete/:filename',function(req,res){
  fs.unlink(`./public/uploads/${req.params.filename}`,function(){
    res.redirect('/')
  })
})
router.get('/update/:filename',function(req,res){
  fs.readdir('./public/uploads', function (err, file) {
    var handle=true
    var filename=req.params.filename
    fs.readFile(`./public/uploads/${req.params.filename}`, 'utf8', function(err, data){
      res.render('index',{handle,filename,file,data})
  });
  })
})
router.post('/update/:filename',function(req,res){
  fs.appendFile(`./public/uploads/${req.params.filename}`,req.body.updateddata,function(err,data){
    res.redirect('/')
  })
})

module.exports = router;
