var express = require('express');
var port = 3000;
var morgan = require('morgan');
var bodyParser = require('body-parser');
var app = express();
var immutable = require('immutable');

//Log with Morgan
app.use(morgan('dev'));

//parse application/json and look for raw text                                        
app.use(bodyParser.json());                                     
app.use(bodyParser.urlencoded({extended: true}));               
app.use(bodyParser.text());                                    
app.use(bodyParser.json({ type: 'application/json'}));  

//configure our app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type, Authorization');
	next();
});

//Static files
app.use(express.static(__dirname + '/public'));

 var postersList = [
    {id:1, title: "Poland will blow your mind!", description: "Poland has long been a nation steeped in tradition and history, although the past twenty years have witnessed such dizzying economic development that the country is starting to feel more and more like the West.", url: "https://process.filestackapi.com/collage=files:[uP0h60oTCiC0g3vXrksg,dHjJM1MlTCudMl27Y5tw,esrFo92DTxe7IZxisakl,m9hZIDMQU2AqfEjTxAfJ,bLGYDIyhSXiGwRhUfZCT],width:1450,height:700,fit:crop/N9o4vJe2Q9m4d37T8IQC"},
    {id:2, title: "Italy the romance kingdom", description: "Italy is an extraordinary feast of heart-thumping, soul-stirring art, food and landscapes rivalled by few and coveted by millions.", url: "https://process.filestackapi.com/collage=files:[7Sk0GtgkTsuybSuPt0YY,9LxMN0HSgC4UGGREDq1W,I0sgXTA0QoiBoSqkfsOa,BY1XS8WQhCIcdMbSBO9A],width:1450,height:700,fit:crop/CtKkhR8tQqoIeoAJuLVg"},
    {id:3, title:"USA is nature and skyscrapers", description: "This is a country of road trips and great open skies, where four million miles of highways lead past red-rock deserts, below towering mountain peaks, and across fertile wheat fields that roll off toward the horizon.", url: "https://process.filestackapi.com/collage=files:[fMmXZvlAQW6YCYfReNva,iY1bMU5LT8iVSefKbzMu,HqfF9mnDTtOz5LdYdk7L,gDxxEuSYQieo1XtcJQJ1,J0cWZIDQgmdFGn1SfNQ5],width:1450,height:700,fit:crop/7JT3S9A8SAex8RKzswx0"}
  ];

var posterList2 = immutable.List.of(
	{id:1, title: "Poland will blow your mind!", description: "Poland has long been a nation steeped in tradition and history, although the past twenty years have witnessed such dizzying economic development that the country is starting to feel more and more like the West.", url: "https://process.filestackapi.com/collage=files:[uP0h60oTCiC0g3vXrksg,dHjJM1MlTCudMl27Y5tw,esrFo92DTxe7IZxisakl,m9hZIDMQU2AqfEjTxAfJ,bLGYDIyhSXiGwRhUfZCT],width:1450,height:700,fit:crop/N9o4vJe2Q9m4d37T8IQC"},
    {id:2, title: "Italy the romance kingdom", description: "Italy is an extraordinary feast of heart-thumping, soul-stirring art, food and landscapes rivalled by few and coveted by millions.", url: "https://process.filestackapi.com/collage=files:[7Sk0GtgkTsuybSuPt0YY,9LxMN0HSgC4UGGREDq1W,I0sgXTA0QoiBoSqkfsOa,BY1XS8WQhCIcdMbSBO9A],width:1450,height:700,fit:crop/CtKkhR8tQqoIeoAJuLVg"},
    {id:3, title:"USA is nature and skyscrapers", description: "This is a country of road trips and great open skies, where four million miles of highways lead past red-rock deserts, below towering mountain peaks, and across fertile wheat fields that roll off toward the horizon.", url: "https://process.filestackapi.com/collage=files:[fMmXZvlAQW6YCYfReNva,iY1bMU5LT8iVSefKbzMu,HqfF9mnDTtOz5LdYdk7L,gDxxEuSYQieo1XtcJQJ1,J0cWZIDQgmdFGn1SfNQ5],width:1450,height:700,fit:crop/7JT3S9A8SAex8RKzswx0"}
	);

app.route('/posterstack')
	.get(function(req, res){
		//var postersListReverse = postersList.slice();
		res.json(posterList2.reverse());
		console.log(posterList2);
	})
	.post(function(req, res){
		////////var date = new Date();
		//var today = date.getFullYear() + "/" + date.getMonth() + "/" + date.getDate();
		var poster = {
			id : posterList2.length + 1,
			title: req.body.title,
			description: req.body.description,
			url: req.body.url
		};
		console.log("col");
		posterList2 = posterList2.push(poster);
		console.log(posterList2.length);
		//fanfictionList = fanfictionList.concat([fanfiction]);
		res.json({ message: "Successfully added!"});	
	});
app.listen(port);
console.log('listening on port ' + port);