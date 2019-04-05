var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var path = require('path');
var cors = require('cors');
var axios = require('axios');

var app = express();

app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, './public')));


app.use(cors())

app.get('/price', function(req, res) {
    axios.get('http://localhost:3008/price')
    .then(result => res.send(result.data))
    .catch(err => console.log(err));

    // db.getPriceFromDB(null, function(result) {
    //     console.log('this is the result from the server', result);
    //     res.send(result);
    // });
});

app.get('/price/:priceId', function(req, res) {
    var priceId = req.params.priceId;
    console.log('priceId: ', priceId);
    
    axios.get(`http://localhost:3008/price/${priceId}`)
    .then(result => {
        res.send(result.data)
    })
    .catch(err => console.log(err))

    // db.byIdgetPriceFromDB(null, req.params.priceId, function(result){ 
    //     console.log('this is the result from the server', result);
    //     res.send(result);
    // });
});


var port = process.env.PORT || 3000;

app.listen(port, function() {
    console.log(`Server is listening on port: ${port}`);
});