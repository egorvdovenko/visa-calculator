const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();

router.get('/', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/index.html'));
});

router.get('/ru', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/ru.html'));
});

router.get('/en', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/en.html'));
});

router.get('/ar', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/ar.html'));
});

router.get('/tk', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/tk.html'));
});

router.get('/zh', function (req, res) {
  res.sendFile(path.join(__dirname + '/pages/zh.html'));
});

app.use('/', router);
app.use('/pages', express.static('pages'));
app.use('/static', express.static('static'));
app.use('/styles', express.static('styles'));
app.use('/scripts', express.static('scripts'));
app.listen(process.env.PORT || 5000);

console.log(`Running at http://localhost:${process.env.PORT || 5000}`);