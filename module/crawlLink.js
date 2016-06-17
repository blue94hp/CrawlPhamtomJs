var webpage = require('webpage').create()
var system = require('system')

address = system.args[1]

webpage.open(address, function(status) {
	var result = webpage.evaluate(function() {

		var results = [];

		var content1 = document.getElementsByClassName('g-box-content')
		var row1 = content1[0].getElementsByClassName('car-item row1')
		for (var i = 0; i < row1.length; i++) {
			var link1 = row1[i].getElementsByClassName('cb2_02')[0].getElementsByTagName('a')[0].getAttribute('href')
			results.push(link1)
		}

		var content2 = document.getElementsByClassName('g-box-content')
		var row2 = content2[0].getElementsByClassName('car-item row2')
		for (var i = 0; i < row2.length; i++) {
			var link2 = row2[i].getElementsByClassName('cb2_02')[0].getElementsByTagName('a')[0].getAttribute('href')
			results.push(link2)
		}
		return results;
	})
	for (var i = 0; i < result.length; i++) {
		console.log(result[i]);
	}
	phantom.exit();
})