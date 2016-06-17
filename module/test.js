var express = require('express');
var app = express();

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;
var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);


var car = [];
var Inf = [];


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

var url = 'http://www.bonbanh.com/Xe-Suzuki-Wagon_R+--2003-332698.html';
findInf(url);
setTimeout(function(){
	console.log(Inf[0])
},500)