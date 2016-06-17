var phantomjs = require('phantomjs');
var path = require('path');
var childProcess = require('child_process');

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);

var binPath = phantomjs.path;

var url = [];
var n = 0;

function getUrl() {
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection('url')
		collection.find({
			state: "false"
		}).toArray(function(err, result) {
			if (err) throw err
			for (var i = 0; i < result.length; i++) {
				url[i] = result[i].url
			}
			//db.close()
		});
	})
}

function updateUrl(url) {
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection('url')
		collection.update({
			url: url
		}, {
			$set: {
				state: "true"
			}
		})
	})
}

function insertInf(link) {
	var childArgs = [
		path.join(__dirname, 'extractLink.js'), link
	]

	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		var inf = [];
		inf = stdout.split('---')
		// for (var i = 0; i < inf.length - 1; i++) {
		// 	var arrSt = inf[i].indexOf(':') + 2
		// 	inf[i] = inf[i].slice(arrSt)
		// }
		db.open(function(err, db) {
			if (err) throw err
			var collection = db.collection("Information");
			collection.insert({
				url: link,
				hang_xe: inf[0],
				loai_xe: inf[1],
				ten_xe: inf[2],
				nam_sx: inf[3],
				gia_VND: inf[4],
				gia_USD: inf[5],
				xuat_xu: inf[6],
				tinh_trang: inf[7],
				dong_xe: inf[8],
				so_km_da_di: inf[9],
				mau_ngoai_that: inf[10],
				mau_noi_that: inf[11],
				so_cua: inf[12],
				so_cho_ngoi: inf[13],
				nhien_lieu: inf[14],
				he_thong_nap_nhien_lieu: inf[15],
				hop_so: inf[16],
				dan_dong: inf[17],
				tieu_thu_nhien_lieu: inf[18],
				thong_tin_mo_ta: inf[19],
				lien_he: {
					name: inf[20],
					phone_1: inf[21],
					phone_2: inf[22],
					address: inf[23],
					area: inf[24],
				},
				time: new Date(), 
			}, function(err, result) {
				console.log(result);
			});
		})
	})
}
//setInterval(function() {
getUrl()
	// setTimeout(function(){
	// 	console.log(url.length)
	// },10000)
setTimeout(function() {
		interval = setInterval(function() {
			if (n < url.length) {
				insertInf(url[n])
				updateUrl(url[n])
				n++
			} else {
				url = [];
				n = 0;
				process.exit();
			}
		}, 5000)
	}, 10000)
	//}, 1000 * 60 * 60)