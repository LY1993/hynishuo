const express = require('express')
const server = express()
const fs  = require('fs')
server.use(express.static(__dirname + '/dist'));
// respond with "hello world" when a GET request is made to the homepage
server.get('/', function(req, res) {
  res.send('hello world');
});
getindex = async (req, res) => {
	let index = await fs.readFile(__dirname + 'dist/index.html')
	res.send(index)
}
server.listen(4000)
console.log('port --- 4000')