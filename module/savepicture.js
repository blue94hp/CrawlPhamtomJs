var phantom = require('phantom');
var http = require('http');
var fs = require('fs');
var name = [], file = [];
for(var i = 0; i< 10; i++){
	name[i] = "file"+i+".jpg";
};
for(var i = 0; i < 10; i++){
	file[i] = fs.createWriteStream(name[i]);
}
//var results = [];
phantom.create(function (ph) {
  ph.createPage(function (page) {
    page.open("http://www.bonbanh.com/Xe-Ford-Ranger-XLS-4x2AT-2014-321388.html", function (status) {
    	page.evaluate(function(){
			var results = [];
			var content = document.getElementsByClassName('img-box');
			var box = content[0].getElementsByClassName('highslide');
			for(var i = 0; i < box.length; i++){
				var link = box[i].getAttribute('href');
				results.push(link);
			}
			return results;
		},
		function(result){
			for(var i = 0; i < result.length;i++){
				//http.get(result[i], function(response) {response.pipe(file[i]);
				console.log(result[i]);//});
			}
			ph.exit();
		});
		
    });
  	});
},

{
  dnodeOpts: {
    weak: false
  }
});
//console.log(results[1])
//http.get(results[i], function(response) {
//	response.pipe(file[i]);
//});