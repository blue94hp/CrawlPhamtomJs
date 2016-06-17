var express = require('express');
var app = express();

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);


//require('./router/main')(app);
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public'));

var server = app.listen(3000, function() {
	console.log("We have started our server on port 3000");
});

var car = [];
var Inf = [];

function getInf() {
	db.open(function(err, db) {
		if (err) throw err
		var inf = db.collection('Information')
		inf.find({}).toArray(function(err, result) {
			if (err) throw err
			for (var i = 0; i < 1000; i++) {
				var carInf = {
					url: result[i].url,
					ten_xe: result[i].ten_xe,
					nam_sx: result[i].nam_sx,
					gia_VND: result[i].gia_VND,
					gia_USD: result[i].gia_USD,
					xuat_xu: result[i].xuat_xu,
					tinh_trang: result[i].tinh_trang,
					so_km_da_di: result[i].so_km_da_di,
					mau_ngoai_that: result[i].mau_ngoai_that,
					nhien_lieu: result[i].nhien_lieu,
					hop_so: result[i].hop_so,
					thong_tin_mo_ta: result[i].thong_tin_mo_ta,
					lien_he: {
						name: result[i].lien_he.name,
						address: result[i].lien_he.address,
						area: result[i].lien_he.area,
						phone_1: result[i].lien_he.phone_1,
						phone_2: result[i].lien_he.phone_2,
					},
					time: result[i].time
				}
				car[i] = carInf;
			}
			//db.close()
		});
	})
}

function findInf(url) {
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection('Information')
		collection.findOne({
			url: url
		}, function(err, result) {
			if (err) throw err
			var carInf = {
				url: result.url,
				hang_xe: result.hang_xe,
				loai_xe: result.loai_xe,
				ten_xe: result.ten_xe,
				gia_VND: result.gia_VND,
				gia_USD: result.gia_USD,
				xuat_xu: result.xuat_xu,
				tinh_trang: result.tinh_trang,
				dong_xe: result.dong_xe,
				so_km_da_di: result.so_km_da_di,
				mau_ngoai_that: result.mau_ngoai_that,
				mau_noi_that: result.mau_noi_that,
				so_cua: result.so_cua,
				so_cho_ngoi: result.so_cho_ngoi,
				nhien_lieu: result.nhien_lieu,
				he_thong_nap_nhien_lieu: result.he_thong_nap_nhien_lieu,
				hop_so: result.hop_so,
				dan_dong: result.dan_dong,
				tieu_thu_nhien_lieu: result.tieu_thu_nhien_lieu,
				thong_tin_mo_ta: result.thong_tin_mo_ta,
				lien_he: {
					name: result.lien_he.name,
					phone_1: result.lien_he.phone_1,
					phone_2: result.lien_he.phone_2,
					address: result.lien_he.address,
					area: result.lien_he.area,
				},
			}
			Inf[0] = carInf;
			//console.log(typeof result)
		});
	})
}

function findCusInf(url) {
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection('cusInformation')
		collection.findOne({
			url: url
		}, function(err, result) {
			if (err) throw err
			var cusInf = {
				name: result.name,
				phone_1: result.phone_1,
				phone_2: result.phone_2,
				address: result.address,
				area: result.area,
			}
			cusInformation[0] = cusInf;
			//console.log(typeof result)
		});
	})
}

app.get('/home', function(req, res) {
	getInf();
	setTimeout(function() {
		var cars = []
		var length = car.length;
		for (var i = 0; i < 20; i++) {
			cars[i] = car[i];
		}
		//console.log(cars);
		res.render('webbb.html', {
			cars: cars,
			length: length,
		});
	}, 700)
});

app.get('/oto', function(req, res) {
	var page = req.param('page')
	page = parseInt(page);
	getInf();
	setTimeout(function() {
		var cars = [];
		var length = car.length;
		var n = (page - 1) * 20;
		var m = 0;
		while (m < 20) {
			cars[m] = car[n];
			m++;
			n++;
		}
		//console.log(cars);
		res.render('webbb.html', {
			cars: cars,
			length: length,
		});
	}, 700)
});

app.get('/car', function(req, res) {
	var url = req.param('url');
	console.log(url);
	findInf(url);
	setTimeout(function() {
		//console.log(Inf[0]);
		res.render('car.html', {
			carInf: Inf[0],
		});
	}, 700)
});