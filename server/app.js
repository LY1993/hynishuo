var koa = require('koa')
var app = new koa()
// var serve = require('koa-static')
var fs = require('fs')
const route = require('koa-route');
var a;
console.log(3000)
fs.readFile(__dirname + '/data.json', 'utf8', function(err, data) {
  console.log(data)
  a = data;
});
// app.use(serve(__dirname + '/common'))
const about = ctx => {
  console.log( )
  // var a;
  
  // ctx.response.body = Object
  ctx.body = a
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};
app.use(route.get('/api/hallo', main));
app.use(route.get('/api/list', about));
app.listen(3000)