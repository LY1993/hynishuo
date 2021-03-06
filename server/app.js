var ctr = require ('./controller/ctr.js')
// require('./start.js')
let {about, main, hook, video, getlist, addlist, dellist, upload, getPiclist, delPic} = ctr
var koa = require('koa')
var app = new koa()
const path = require('path')
var fs = require('fs')
// const koaBody = require('koa-body');
const route = require('koa-route');
const serve = require('koa-static');

const static = serve(path.resolve(__dirname, '..') + '/dist');
const bodyparser = require('koa-bodyparser')
// require('./server.js')
app.use(bodyparser({
  formLimit: "5mb",
  jsonLimit: "5mb",
  textLimit: "5mb",
  formidable: {
    maxFieldsSize: 5 * 1024 * 1024
  }
}))
app.use(static)
// var createHandler = require('github-webhook-handler')
// var handler = createHandler({ path: '/api/webhook', secret: 'a123456' })
// handler.on('push', function (event) {
//   console.log('Received a push event for %s to %s',
//     event.payload.repository.name,
//     event.payload.ref)
// })
// handler.on('issues', function (event) {
//   console.log('Received an issue event for %s action=%s: #%d %s',
//     event.payload.repository.name,
//     event.payload.action,
//     event.payload.issue.number,
//     event.payload.issue.title)
// })

fs.readFile(__dirname + '/data.json', 'utf8', function(err, data) {
  // console.log()
  var b = fs.createReadStream(__dirname + '/demo.mp4')
  console.log(typeof b)
  a = JSON.parse(data)
  console.log(typeof a)
});
// app.use(serve(__dirname + '/common'))

app.use(route.get('/api/hallo', main));
app.use(route.get('/api/video', video));
app.use(route.get('/api/list', about));
app.use(route.post('/api/webhook', hook));
app.use(route.get('/api/webhook', hook));
app.use(route.get('/api/getlist', getlist));
app.use(route.post('/api/addlist', addlist));
app.use(route.post('/api/dellist', dellist));
app.use(route.post('/api/upload', upload));
app.use(route.post('/api/delPic', delPic));
app.use(route.get('/api/getPiclist', getPiclist));
app.listen(8888)
// console.log(3000)