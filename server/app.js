var ctr = require ('./controller/ctr.js')
let {about, main, hook, video, getlist, addlist, dellist} = ctr
var koa = require('koa')
var app = new koa()
// var serve = require('koa-static')
var fs = require('fs')
// const koaBody = require('koa-body');
const route = require('koa-route');
const bodyparser = require('koa-bodyparser')

app.use(bodyparser())

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
app.listen(3000)