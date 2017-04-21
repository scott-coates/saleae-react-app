var express = require('express')
var app     = express()
var url       = require('url');
//var url_parts = url.parse(request.url, true);
//var query     = url_parts.query;// get a request with a parameter `search_text

// search the db for search_text

// return up to 25 rows
app.get('/', function (req, res) {
  search_text = req.query.search_text;
  var sqlite3 = require('sqlite3').verbose();
  var db      = new sqlite3.Database('./test.db');

  db.serialize(function () {
    var name = "SELECT  * FROM PROTOCOL_RECORDS WHERE input like  ('%" + search_text + "%') LIMIT 25";
    console.log("name", name); // todo console.log statement
    var records = db.all(name,function(err,rows){
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Access-Control-Allow-Origin', '*');
      res.send(rows);
    });
    // convert records to json array
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
});
