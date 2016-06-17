var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);

var car = [];
var cus = [];
var customer = [];

function editCar() {
	db.open(function(err, db) {
		if (err) throw err;
		var carInfo = db.collection('carInformation');
		var cusInfo = db.collection('cusInformation');
		carInfo.find({}).toArray(function(err, result) {
			if (err) throw err;
			//for (var i = 0; i < result.length - 1; i++)
				//car[i] = result[i].url;
			result.forEach(function(value){
				car.push(value.url);
			})
			// for (var j = 0; j < result.length - 1; j++){
			// 	cusInfo.findOne({
			// 		url : result[j].url,
			// 	},function(err,result){
			// 		if(err) throw err;
			// 		cus[j] = result.url;
			// 	})
			// }
		})
		// cusInfo.find({}).toArray(function(err, result) {
		// 	if (err) throw err;
		// 	for (var i = 0; i < result.length - 1; i++)
		// 		cus[i] = result[i].url;
		// })
	})
}

function editCus() {
	db.open(function(err, db) {
		if (err) throw err;
		var cusInfo = db.collection('cusInformation');
		cusInfo.find({}).toArray(function(err, result) {
			if (err) throw err;
			for (var i = 0; i < result.length - 1; i++){
				var cusInf = {
					url:result[i].url,
					state:'0',
				}
				cus[i] = cusInf;
			}
		})
	})
}
editCar();
editCus();
setTimeout(function() {
	//t = Date.now();
	for (var i = 0; i < cus.length - 1; i++) {
		for (var j = 0; j < car.length - 1; j++) {
			if (cus[i].url == car[j]) {
				cus[i].state = '1';
				//customer.push(cus[i].url)
				//break;
			}
		}
	}
	//console.log(car.length);
	//console.log(customer.length);
	// for (var i = 0; i < 20; i++) {
	// 	console.log(i + ': ' + car[i]);
	// 	//onsole.log(i + ': ' + cus[i]);
	// 	console.log(i + ': ' + customer[i]);
	// 	console.log('\n')
	// }
	//t = Date.now() - t;
	for(var i=0;i<cus.length;i++){
		if(cus[i].state == '0')
			customer.push(cus[i].url);	
	}
	console.log(customer);
}, 1000);