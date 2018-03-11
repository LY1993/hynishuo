var koa = require('koa')
var app = new koa()
// var serve = require('koa-static')
var fs = require('fs')
const route = require('koa-route');
var a;
console.log(3000)
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
const video = ctx => {
  ctx.response.body = fs.createReadStream(__dirname + '/demo.mp4',{encoding:'base64'});
};
app.use(route.get('/api/hallo', main));
app.use(route.get('/api/video', video));
app.use(route.get('/api/list', about));
app.listen(3000)