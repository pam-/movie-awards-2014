var Tabletop = require('tabletop');
var fs = require('fs');

var secrets = JSON.parse(fs.readFileSync('secrets.json', 'utf8'));

console.log("Getting updated data...");


  var public_spreadsheet_url = secrets.spreadsheet_url;
  var data = [];

  function init() {
    Tabletop.init( { key: public_spreadsheet_url,
                     callback: showInfo,
                     simpleSheet: true,
                     parseNumbers: true } );
  }

  function showInfo(data, tabletop) {

    //format data
    

    //initialize the app
    // matchGameObj.celebsInit();
    // console.log(celebData);

    fs.writeFile('js/data.json', JSON.stringify(data), function (err) {
      if (err) throw err;
      console.log('Updated!');
    });
  }

  //call tabletop init
 init();


