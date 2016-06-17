var http = require('http');
var fs = require('fs');
//var name = "myproject/public/images/car1/file.jpg";
fs.mkdirSync('/home/anhtuan/myproject/public/images/car1')
//setTimeout(function() {
	var file = fs.createWriteStream('/home/anhtuan/myproject/public/images/car1/file.jpg');
	http.get("http://www.bonbanh.com/uploads/users/118957/car/325591/l_1437832871.122.jpg", function(response) {
		response.pipe(file);
		console.log("ok");
	});
//}, 00)