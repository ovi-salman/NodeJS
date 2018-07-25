var http = require('http');
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({expected:true}));

var mongo = require("mongodb");

//for local
//var db,uri = "mongod://localhost:27071";

//for c9
var db,uri = "mongodb://"+process.env.IP+":27017";


mongo.MongoClient.connect(uri,{userNewUrlParser:true},function (err,clint )
{if(err)
{
  console.log("Could not connect to mongo db")
}else {
  db=clint.db("node-cw8");
}

})

var save = function(form_data)
{
  db.createCollection("users",function (err,collection){
    
  });
  var collection = db.collection('users');
  collection.save(form_data);
}
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

var server = http.Server(app);

app.get('/', function(req,res){
  res.sendFile(__dirname+'/index.html');
  
});
app.get('/about', function(req,res){
  res.sendFile(__dirname+'/about.html');
  
});
app.get('/form', function(req,res){
  res.sendFile(__dirname+'/form.html');
  
});
app.post('/submit_user', function(req,res){
 console.log(req.body);
 save(req.body);
 res.status(200);
  
});
  server.listen(process.env.PORT, process.env.IP, function(){
    console.log('Server running');
  });