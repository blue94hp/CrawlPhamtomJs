var phantomjs = require('phantomjs');
var path = require('path');
var binPath = phantomjs.path;
var childProcess = require('child_process');
var domain = require('domain').create()

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

// var server = new Server('127.0.0.1', 27017);
// var db = new Db('myproject', server);

var url = []
var n = 0;

function getUrl(page) {
	var childArgs = [
		path.join(__dirname, 'crawlLink.js'), 'http://www.bonbanh.com/oto/page,' + page + '/'
	]

	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		result = stdout.split('\n')
		for (var i = 0; i < result.length - 1; i++)
			url.push(result[i])
	})
}

function insertUrl(url) {
	var server = new Server('127.0.0.1', 27017);
	var db = new Db('myproject', server);
	db.open(function(err, db) {
		if (err) throw err
		var collection = db.collection("url");
		collection.findOne({
			url: url
		}, function(err, result) {
			if (err) throw err
			if (result == null) {
				collection.insert({
					url: url,
					state: "false"
				}, function(err, results) {
					//console.log(results)
			    	db.close();
				})
			}
		})
	})
	//db.close()
}

domain.on('error', function(err) {
	console.error(err);
})

domain.run(function() {
	//setInterval(function() {
		for (var i = 1; i < 51; i++) {
			getUrl(i)
		}
		setTimeout(function() {
			setInterval(function() {
				if (n < 200) {
					insertUrl(url[n])
					n++
				} else {
					url = [];
					n = 0;
				}
			}, 5000)
		}, 1000 * 15)
	//}, 1000 * 60 * 5)
})