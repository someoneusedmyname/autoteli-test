const express = require('express')
const cors = require('cors');
const axios = require('axios').default;
const https = require('https');
const formidable = require('formidable');

const app = express();
const port = 3000;


app.use(cors());
app.use(express.static('public'));
// Configuring body parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.set('view engine', 'ejs');



/////////// get function - working in backend, but not pretty //////////////


var config = {
    method: 'get',
    url: 'https://autotelic-developer-test.herokuapp.com/messages/',
    headers: {"id":"","text":"","url":"","created_at":"" }
  };
  
  axios(config)
  .then(function (response) {
 //  console.log(JSON.stringify(response.data));

  })
  .catch(function (error) {
    console.log(error);
});



/////////// post function - working from frontend //////////////
app.post("/postMessage", (req, res) => {

    var form = new formidable.IncomingForm();

    form.parse(req, function(err, fields) {

        var text = fields.message;
        console.log(text)

        var data = JSON.stringify({"id":"","text":text,"url":"","created_at":""});

        var config = {
        method: 'post',
        url: 'https://autotelic-developer-test.herokuapp.com/messages/',
        headers: { 
            'Content-Type': 'application/json'
        },
        data : data
        };

        axios(config)
        .then(function (response) {
        console.log(JSON.stringify(response.data));
        })
        .catch(function (error) {
        console.log(error);
        }); 
    });
    res.sendFile('/index.html', {root: __dirname});
});
///////////////////////////////////////////

// get home page
app.get('/', function(req, res) {
    res.sendFile('index.html', {
      root: __dirname
    });
  })

////////////////////////////////////////////

app.listen(port, () => console.log(`Message app listening on port ${port}!`));