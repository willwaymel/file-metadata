var express = require('express');
var app = express();
var multer  = require('multer');
var upload = multer({ dest: 'upload/',
                    onError : function(err, next) {
                      console.log('error', err);
                      next(err);
                      },
                      function(req, res) {
                        res.status(204).end();
                      }
                      });

//file has the following fielts
//originalname	Name of the file on the user's computer
//size	Size of the file in bytes
app.post('/upload', upload.single('myFile'), function (req, res, next) {
  try{
  var response = {'size': req.file.size};  
  } catch (err) {
   // res.send("There's been an error, maybe you forgot to upload a file? Please go back and try again.") ;
    res.redirect("https://get-file-metadata.glitch.me/");
  }
  
  // console.log(req.file.originalname);
  // console.log(req.file.size);
  res.end(JSON.stringify(response));
  // req.file is the `avatar` file 
  // req.body will hold the text fields, if there were any 
})

app.use(express.static('public'));

app.route('/')
  .get(function(req, res) {
    res.sendFile(process.cwd() + '/views/index.html');
  });

app.use('/public', express.static(process.cwd() + '/public'));



app.get("/*", function(request, response) {
  response.sendFile(__dirname + '/views/index.html');
});
// listen for requests :)
var listener = app.listen("3000", function() {
  console.log('Your app is listening on port ' + listener.address().port);
});