var dbase
var options = {  
  server: {
      auto_reconnect: true,
      poolSize: 10
  }
};
const fs = require('fs')
const path = require('path')
const mineType = require('mime-types');
const cluster = require('cluster');
console.time('4 cluster');
var a = []
if (cluster.isMaster) {
  // Fork workers.
  for (var i = 0; i < 4; i++) {
    a[i] = cluster.fork();
  }
  var i = 4;
  cluster.on('exit', function(worker, code, signal) {
		if(!--i){
			console.timeEnd('4 cluster');
			process.exit(0);
		}
  });
} else {
	process.exit(0);
}
const mongo = require('mongodb')
const ObjectID = mongo.ObjectID
var MongoClient = mongo.MongoClient;
var url = 'mongodb://localhost:27017/runoob';
MongoClient.connect(url, options, function (err, db) {
    if (err) throw err;
    console.log('数据库已创建');
    dbase = db.db("runoob");
    dbase.createCollection('site', function (err, res) {
        if (err) throw err;
        console.log("创建集合!");
        // db.close();
    });
});
const about = ctx => {
// ctx.response.body = Object
// ctx.type = 'application/json'
  ctx.response.body = fs.createReadStream(path.resolve(__dirname, '..') + '/data.json', {encoding: 'utf8'})
};

const main = ctx => {
  ctx.response.body = 'Hello World';
};

const hook = ctx => {
  ctx.response.body = 'Hello hook';
};
const video = ctx => {
  // ctx.type = 'image/png';
  ctx.type = 'text/plain; charset=utf-8';
  // ctx.set('Content-Encoding', 'binary')
  let filePath = path.resolve(__dirname, '..') + '/demo.mp4'
  
  let data = fs.readFileSync(filePath);  
  data = new Buffer(data).toString('base64');  
    
  let base64 = 'data:' + mineType.lookup(filePath) + ';base64,' + data;  
  // ctx.response.body = fs.createReadStream(path.resolve(__dirname, '..') + '/demo.mp4', {encoding: 'utf8'});
  ctx.body = base64
};

const getlist = async ctx => {
  let result = await dbase.collection('site').find().toArray()
  ctx.body = result;
}
const addlist = async (ctx,next) => {
  // console.log(koaBody)
  // await koaBody(ctx,next)
  let name = ctx.request.body.name
  console.log(ctx.request.body)
  // console.log(ctx.req)
  if(!name) ctx.body = 'error'
  // await dbase.collection('site').remove({name: {name: "678y87"}})
  let result = await dbase.collection('site').insert({name: name})
  ctx.body = result;
}
const dellist = async (ctx,next) => {
  // console.log(koaBody)
  // await koaBody(ctx,next)
  let id = ctx.request.body.id
  console.log(ctx.request.body)
  // console.log(ctx.req)
  if(!id) ctx.body = 'error'
  let result = await dbase.collection('site').findAndRemove({_id: new ObjectID(id)})
  ctx.body = result;
}

const upload = async ctx => {
  // let random = Math.round(10000 * Math.random())
  let data = ctx.request.body.postData
  let name = ctx.request.body.name
  let picpath = path.resolve(__dirname, '..') + '/pic/' + name
  // console.log(picpath)
  // var base64Data = data.replace(/^data:image\/\w+;base64,/, "");
  await dbase.createCollection('pic')
  await dbase.collection('pic').insert({name: name,type: data.split(',')[0]})
  await fs.writeFile(picpath, data)
  // ctx.response.body = fs.createReadStream(path.resolve(__dirname, '..') + '/demo.mp4',{encoding:'base64'});
  // console.log(data)
  ctx.body = 'ok'
};
const getPiclist = async ctx => {
  // await dbase.collection('pic').remove({})
  let result = await dbase.collection('pic').find().toArray()
  // console.log(result)
  let stream = []
  // if (cluster.isMaster) {
  //   for (var i = 0; i < 4; i++) {
  //     cluster.fork();
  //   }
  //   cluster.on('exit', (worker, code, signal) => {
  //     console.log(`worker ${worker.process.pid} died`);
  //   });
  // } else {
  //   result.map(async i => {
  //     // console.log(path.resolve(__dirname, '..') + '/pic/' + i.name)
  //     let item = fs.readFileSync(path.resolve(__dirname, '..') + '/pic/' + i.name, 'binary');
  //     // console,log(item)
  //     stream.push({data: item, id: i._id})
  //   })
  // }
  // result.map(async i => {
  //   // console.log(path.resolve(__dirname, '..') + '/pic/' + i.name)
  //   let item = fs.readFileSync(path.resolve(__dirname, '..') + '/pic/' + i.name, 'binary');
  //   // console,log(item)
  //   stream.push({data: item, id: i._id})
  // })
  // ctx.type = 'image/png';
  ctx.body = stream
  // ctx.body = stream;
  // dbase.collection('site').find().toArray(function(err, result) {
  //   if(err) throw err
  //   console.log(result)
  //   ctx.body = result;
  // })
}
const delPic = async (ctx,next) => {
  // console.log(koaBody)
  // await koaBody(ctx,next)
  let id = ctx.request.body.id
  console.log(ctx.request.body)
  // console.log(ctx.req)
  if(!id) ctx.body = 'error'
  let result = await dbase.collection('pic').findAndRemove({_id: new ObjectID(id)})
  ctx.body = 'ok';
}
module.exports = {
  about,
  main,
  hook,
  video,
  getlist,
  addlist,
  dellist,
  upload,
  getPiclist,
  delPic,
}
