var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);

var urlError = [];

function checkUrl(){
	db.open(function(err,db){
		if(err) throw err;
		var url = db.collection('Information');
		url.find({
			ten_xe : null,
		}).toArray(function(err,result){
			if(err) throw err;
			result.forEach(function(value){
				urlError.push(value.url);
			})
		})
	})
}

function removeCarInf(){
	db.open(function(err,db){
		if(err) throw err;
		var carInf = db.collection('Information');
		carInf.remove({
			ten_xe : null,
		})
	})
}

// function removeCusInf(){
// 	db.open(function(err,db){
// 		if(err) throw err;
// 		var cusInf = db.collection('cusInformation');
// 		cusInf.remove({
// 			name : null,
// 		})
// 	})
// }

function updateUrl(url) {
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection('url')
		collection.update({
			url: url
		}, {
			$set: {
				state: "false"
			}
		})
	})
}

//var url = 'http://www.bonbanh.com/Xe-Ford-Escape-2.3XLS-2004-329935.html';

checkUrl();
var n = 0;
setTimeout(function(){
	removeCarInf();
	setInterval(function(){
		if(n<urlError.length-1){
			updateUrl(urlError[n]);
			n++;
		}
		else{
			process.exit();
		}
	},1000)
},10000)