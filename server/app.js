var koa = require('koa')
var app = new koa()
// var serve = require('koa-static')
var fs = require('fs')
const route = require('koa-route');

var createHandler = require('github-webhook-handler')
var handler = createHandler({ path: '/api/webhook', secret: 'a123456' })
handler.on('push', function (event) {
  console.log('Received a push event for %s to %s',
    event.payload.repository.name,
    event.payload.ref)
})
handler.on('issues', function (event) {
  console.log('Received an issue event for %s action=%s: #%d %s',
    event.payload.repository.name,
    event.payload.action,
    event.payload.issue.number,
    event.payload.issue.title)
})

var dbase
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://localhost:27017/runoob';
MongoClient.connect(url, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    dbase = db.db("runoob");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        db.close();
    });
});
fs.readFile(__dirname + '/data.json', 'utf8', function(err, data) {
  // console.log()
  var b = fs.createReadStream(__dirname + '/demo.mp4')
  console.log(typeof b)
  a = JSON.parse(data)
  console.log(typeof a)
});
// app.use(serve(__dirname + '/common'))
const about = ctx => {
  // ctx.response.body = Object
  // ctx.type = 'application/json'
  ctx.body = fs.createReadStream(__dirname + '/data.json', {encoding: 'utf8'})
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const hook = ctx => {
  ctx.response.body = 'Hello hook';
};
const video = ctx => {
  ctx.response.body = fs.createReadStream(__dirname + '/demo.mp4',{encoding:'base64'});
};
app.use(route.get('/api/hallo', main));
app.use(route.get('/api/video', video));
app.use(route.get('/api/list', about));
app.use(route.post('/api/webhook', hook));
app.use(route.get('/api/webhook', hook));
app.listen(8080)