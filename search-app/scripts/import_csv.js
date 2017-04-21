/**
 * Created by scottc on 4/20/17.
 */


// create a sqlite database with a table call protocol_records
var fs      = require('fs');
var sqlite3 = require('sqlite3').verbose();
var db      = new sqlite3.Database('./test.db');
//
db.serialize(function () {
  db.run("CREATE TABLE protocol_records (input STRING)");
});

//db.close();

// open the protocol short file
var buf = fs.readFileSync('../data/protocol_data_short_sample.csv', "utf8");


// loop through each \r\n

db.serialize(function () {

  var split_array = buf.split('\r\n');

  for(var i = 0; i < split_array.length; i++) {
    f = split_array[i].trim();
    var name = "INSERT INTO protocol_records VALUES ('" + f + "')";
    console.log("name", name); // todo console.log statement
    db.run(name);
  }

});
// for each new line, insert into sqlite
