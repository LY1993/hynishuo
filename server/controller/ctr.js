var dbase
var options = {  
  server: {
      auto_reconnect: true,
      poolSize: 10
  }
};
const fs = require('fs')
const path = require('path')
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
  ctx.response.body = fs.createReadStream(__dirname + '/demo.mp4',{encoding:'base64'});
};

const getlist = async ctx => {
  let result = await dbase.collection('site').find().toArray()
  // result.toArray(function(err, result) {
  //   if(err) throw err
  //   console.log(result)
  //   ctx.body = result;
  // })
  ctx.body = result;
  // dbase.collection('site').find().toArray(function(err, result) {
  //   if(err) throw err
  //   console.log(result)
  //   ctx.body = result;
  // })
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
module.exports = {
  about,
  main,
  hook,
  video,
  getlist,
  addlist,
  dellist,
}
