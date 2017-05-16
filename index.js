var express = require('express');
var app = express();
var router = express.Router();

var bodyParser = require('body-parser');
var path = require('path');  




var reservation ={
	first:function (req,res){
		res.send('hello wechat')
	}
}



router.use(bodyParser.json());

router.get('/', reservation.first);

app.use('/', router);
app.set('port', (process.env.PORT || 5000));

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});