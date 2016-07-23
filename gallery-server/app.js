var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser');
var multipart = require('connect-multiparty');
var fs = require('fs');

var multipartMiddleware = multipart({ uploadDir: './uploads' });

app.use(bodyParser.urlencoded({
  extended: true
}));

app.all('*', function(req, res, next) {
  res.header('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.header('Access-Control-Allow-Credentials', true);
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Cache-Control");
  next();
});

app.use("/images", express.static(__dirname + '/uploads'));

app.post('/upload', multipartMiddleware, function(req, res) {
  var file = req.files.file;
  res.status(200).send('OK');
});

app.get('/images/all', function(req, res) {
  var fileNames = fs.readdirSync(__dirname + '/uploads');
  var fileMap = [];

  fileNames.forEach(function(fileName) {
    fileMap.push({
      name : fileName,
      url: 'http://localhost:3000/images/' + fileName
    })
  });

  res.status(200).send(JSON.stringify(fileMap));
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
