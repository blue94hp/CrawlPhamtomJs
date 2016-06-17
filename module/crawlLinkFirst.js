var phantomjs = require('phantomjs');
var path = require('path');
var binPath = phantomjs.path;
var childProcess = require('child_process');

var mongo = require('mongodb'),
	Server = mongo.Server,
	Db = mongo.Db;

var server = new Server('127.0.0.1', 27017);
var db = new Db('myproject', server);

var page = 1;
//var url = [];

function insertUrl(page) {
	url = [];
	var childArgs = [
		path.join(__dirname, 'crawlLink.js'), 'http://www.bonbanh.com/oto/page,' + page + '/'
	]

	childProcess.execFile(binPath, childArgs, function(err, stdout, stderr) {
		result = stdout.split('\n')
		for (var i = 0; i < result.length - 1; i++)
			url.push(result[i])
		db.open(function(err, db) {
			if (err) throw err
			var collection = db.collection("url");
			for (var i = 0; i < url.length; i++) {
				collection.insert({
					url: url[i],
					state: "false",
					media:"false",
				}, function(err, results) {
					console.log(results)
						//db.close();
				})
			}
		})
	})
}

setInterval(function() {
	if (page < 901) {
		insertUrl(page);
		page++;
		//url = [];
	} else process.exit;
}, 5000);