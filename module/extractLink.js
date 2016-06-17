var webpage = require('webpage').create();
var system = require('system')

var addr = system.args[1]

webpage.open(addr, function() {
	var results = webpage.evaluate(function() {
		function findCity(address) {
			var city = ["An Giang", "Bà Rịa- Vũng Tàu", "Bạc Liêu", "Bắc Kạn", "Bắc Giang", "Bắc Ninh", "Bến Tre", "Bình Dương", "Bình Định", "Bình Phước",
				"Bình Thuận", "Cà Mau", "Cao Bằng", "Cần Thơ", "Đà Nẵng", "Đăk Lăk", "Đăk Nông", "Điện Biên", "Đồng Nai", "Đồng Tháp",
				"Gia Lai", "Hà Giang", "Hà Nam", "Hà Nội", "Hà Tây", "Hà Tĩnh", "Hải Dương", "Hải Phòng", "Hòa Bình", "TP HCM",
				"Hậu Giang", "Hưng Yên", "Khánh Hòa", "Kiên Giang", "Kon Tum", "Lai Châu", "Lào Cai", "Lạng Sơn", "Lâm Đồng", "Long An",
				"Nam Định", "Nghệ An", "Ninh Bình", "Ninh Thuận", "Phú Thọ", "Phú Yên", "Quảng Bình", "Quảng Nam", "Quảng Ngãi", "Quảng Ninh",
				"Quảng Trị", "Sóc Trăng", "Sơn La", "Tây Ninh", "Thái Bình", "Thái Nguyên", "Thanh Hóa", "Thừa Thiên Huế", "Tiền Giang",
				"Trà Vinh", "Tuyên Quang", "Vĩnh Long", "Vĩnh Phúc", "Yên Bái"
			];
			for (var i = 0; i < city.length; i++) {
				if (address.indexOf(city[i]) != -1) {
					return city[i];
					break;
				};
			}
		}
		var Inf = {
			hang_xe: '',
			loai_xe: '',
			ten_xe: '',
			nam_sx: '',
			gia_VND: '',
			gia_USD: '',
			xuat_xu: '',
			tinh_trang: '',
			dong_xe: '',
			so_km_da_di: '',
			mau_ngoai_that: '',
			mau_noi_that: '',
			so_cua: '',
			so_cho_ngoi: '',
			nhien_lieu: '',
			he_thong_nap_nhien_lieu: '',
			hop_so: '',
			dan_dong: '',
			tieu_thu_nhien_lieu: '',
			thong_tin_mo_ta: '',
			name: '',
			phone_1: '',
			phone_2: '',
			address: '',
			area: '',
			img_1:'',
			img_2:'',
			img_3:'',
			img_4:'',
			img_5:'',
			img_6:'',
			img_7:'',
			img_8:'',
			img_9:'',
			img_10:'',
		};
		result = [];
		result[0] = Inf;

		breadcrum = document.getElementsByClassName('breadcrum')[0]
		a1 = breadcrum.getElementsByTagName('a')[1].innerText
		result[0].hang_xe = a1
		a2 = breadcrum.getElementsByTagName('a')[2].innerText
		result[0].loai_xe = a2

		title = document.getElementsByClassName('title')[0]
		h1 = title.getElementsByTagName('h1')[0].innerText
		n1 = h1.indexOf("-")
		result[0].ten_xe = h1.slice(0, n1 - 6)
		result[0].nam_sx = h1.slice(n1 - 5, n1 - 1);
		n2 = h1.indexOf("(")
		result[0].gia_VND = h1.slice(n1 + 2, n2 - 7)
		n3 = h1.indexOf(")")
		result[0].gia_USD = h1.slice(n2 + 3, n3 - 5)

		col0 = document.getElementsByClassName('col')[0]
		xx = col0.getElementsByClassName('row')[0].getElementsByClassName('txt_input')[0].innerText;
		result[0].xuat_xu = xx;
		tt = col0.getElementsByClassName('row')[1].getElementsByClassName('txt_input')[0].innerText;
		result[0].tinh_trang = tt;
		dx = col0.getElementsByClassName('row')[2].getElementsByClassName('txt_input')[0].innerText;
		result[0].dong_xe = dx;
		km = col0.getElementsByClassName('row')[3].getElementsByClassName('txt_input')[0].innerText;
		result[0].so_km_da_di = km.slice(0, km.indexOf(' '));
		mngt = col0.getElementsByClassName('row')[4].getElementsByClassName('txt_input')[0].innerText;
		result[0].mau_ngoai_that = mngt;
		mnt = col0.getElementsByClassName('row')[5].getElementsByClassName('txt_input')[0].innerText;
		result[0].mau_noi_that = mnt;
		sc = col0.getElementsByClassName('row')[6].getElementsByClassName('txt_input')[0].innerText;
		result[0].so_cua = sc.slice(0, sc.indexOf(' '));
		scn = col0.getElementsByClassName('row_last')[0].getElementsByClassName('inputbox')[0].innerText;
		result[0].so_cho_ngoi = scn.slice(0, scn.indexOf(' '));

		col1 = document.getElementsByClassName('col')[1];
		nl = col1.getElementsByClassName('row')[0].getElementsByClassName('txt_input')[0].innerText;
		result[0].nhien_lieu = nl;
		htnnl = col1.getElementsByClassName('row_last')[0].getElementsByClassName('txt_input')[0].innerText;
		result[0].he_thong_nap_nhien_lieu = htnnl;
		hs = col1.getElementsByClassName('row')[1].getElementsByClassName('txt_input')[0].innerText;
		result[0].hop_so = hs;
		dd = col1.getElementsByClassName('row')[2].getElementsByClassName('txt_input')[0].innerText;
		result[0].dan_dong = dd;
		ttnl = col1.getElementsByClassName('row_last')[1].getElementsByClassName('txt_input')[0].innerText;
		result[0].tieu_thu_nhien_lieu = ttnl.slice(0, ttnl.indexOf('L/100Km'));

		ttmt = document.getElementsByClassName('des_txt')[0].innerText;
		result[0].thong_tin_mo_ta = ttmt.slice(0,ttmt.lastIndexOf('\n'));

		name = document.getElementsByClassName('cname')[0].innerText;
		result[0].name = name;
		phone_1 = document.getElementsByClassName('cphone')[0].innerText;
		result[0].phone_1 = phone_1;
		phone_2 = document.getElementsByClassName('cphone')[1].innerText;
		result[0].phone_2 = phone_2;
		address = document.getElementsByClassName('contact-txt')[0].innerText;
		area = findCity(address);
		result[0].address = address.slice(address.indexOf('Địa chỉ:') + 9, address.indexOf(area) + area.length);
		result[0].area = area;


		images = document.getElementsByClassName('highslide-gallery');
		result[0].img_1 = images[0].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_2 = images[1].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_3 = images[2].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_4 = images[3].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_5 = images[4].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_6 = images[5].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_7 = images[6].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_8 = images[7].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_9 = images[8].getElementsByTagName('img')[0].getAttribute('src');
		result[0].img_10 = images[9].getElementsByTagName('img')[0].getAttribute('src');

		// var content = document.getElementsByClassName('img-box');
		// var box = content[0].getElementsByClassName('highslide');
		// result[0].img_1 = box[0].getAttribute('href');
		// result[0].img_2 = box[1].getAttribute('href');
		// result[0].img_3 = box[2].getAttribute('href');
		// result[0].img_4 = box[3].getAttribute('href');
		// result[0].img_5 = box[4].getAttribute('href');
		// result[0].img_6 = box[5].getAttribute('href');
		// result[0].img_7 = box[6].getAttribute('href');
		// result[0].img_8 = box[7].getAttribute('href');
		// result[0].img_9 = box[8].getAttribute('href');
		// result[0].img_10 = box[9].getAttribute('href');

		return result;
	})
	// console.log('hang xe: ' + results[0].hang_xe);
	// console.log('+loai xe: ' + results[0].loai_xe);
	// console.log('+ten xe: ' + results[0].ten_xe);
	// console.log('+nam san xuat: ' + results[0].nam_sx)
	// console.log('+gia VND: ' + results[0].gia_VND);
	// console.log('+gia USD: ' + results[0].gia_USD);
	// console.log('+xuat xu: ' + results[0].xuat_xu);
	// console.log('+tinh trang: ' + results[0].tinh_trang);
	// console.log('+dong xe: ' + results[0].dong_xe);
	// console.log('+so km da di: ' + results[0].so_km_da_di);
	// console.log('+mau ngoai that: ' + results[0].mau_ngoai_that);
	// console.log('+mau noi that: ' + results[0].mau_noi_that);
	// console.log('+so cua: ' + results[0].so_cua);
	// console.log('+so cho ngoi: ' + results[0].so_cho_ngoi);
	// console.log('+nhien lieu: ' + results[0].nhien_lieu);
	// console.log('+he thong nap nhien lieu: ' + results[0].he_thong_nap_nhien_lieu);
	// console.log('+hop so: ' + results[0].hop_so);
	// console.log('+dan dong: ' + results[0].dan_dong);
	// console.log('+tieu thu nhien lieu: ' + results[0].tieu_thu_nhien_lieu);
	// console.log('+thong tin mo ta: ' + results[0].thong_tin_mo_ta);
	// console.log('+ten: ' + results[0].name);
	// console.log('+dien thoai 1: ' + results[0].phone_1);
	// console.log('+dien thoai 2: ' + results[0].phone_2)
	// console.log('+dia chi: ' + results[0].address);
	// console.log('+khu vuc: ' + results[0].area);
	console.log(results[0].hang_xe + '---' + 
				results[0].loai_xe + '---' +
				results[0].ten_xe + '---' +
				results[0].nam_sx + '---' +
				results[0].gia_VND + '---' +
				results[0].gia_USD + '---' +
				results[0].xuat_xu + '---' +
				results[0].tinh_trang + '---' +
				results[0].dong_xe + '---' +
				results[0].so_km_da_di + '---' +
				results[0].mau_ngoai_that + '---' +
				results[0].mau_noi_that + '---' +
				results[0].so_cua + '---' +
				results[0].so_cho_ngoi + '---' +
				results[0].nhien_lieu + '---' +
				results[0].he_thong_nap_nhien_lieu + '---' +
				results[0].hop_so + '---' +
				results[0].dan_dong + '---' +
				results[0].tieu_thu_nhien_lieu + '---' +
				results[0].thong_tin_mo_ta + '---' +
				results[0].name + '---' +
				results[0].phone_1 + '---' +
				results[0].phone_2 + '---' +
				results[0].address + '---' +
				results[0].area + '---' +
				results[0].img_1 + '---' +
				results[0].img_2 + '---' +
				results[0].img_3 + '---' +
				results[0].img_4 + '---' +
				results[0].img_5 + '---' +
				results[0].img_6 + '---' +
				results[0].img_7 + '---' +
				results[0].img_8 + '---' +
				results[0].img_9 + '---' +
				results[0].img_10 + '---' )
	phantom.exit();
})