//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){
  var firstName = req.body.fName;
  var lastName = req.body.lName;
  var email = req.body.email;

  var data = {
    members: [
      {
        email_address: email,
        status: "subscribed",
        merge_fields: {
          FNAME: firstName,
          LNAME: lastName
        }
      }
    ]
  };

  var jsonData = JSON.stringify(data);

  var options = {
    url: "https://us3.api.mailchimp.com/3.0/lists/0baccb3b28",
    method: "POST",
    headers: {
      "Authorization": "jordan1 c80907939df6d87a2d1bba528ccaadaf-us3"
    },
    body: jsonData
  };

  request(options, function(error, response, body){
    if (error) {
      res.sendFile(__dirname + "/failure.html");
    } else {
      if (response.statusCode === 200) {
        res.sendFile(__dirname + "/success.html");
      } else {
        res.sendFile(__dirname + "/failure.html");
      }
    }
  });
});

app.post("/failure", function(req, res){
  res.redirect("/");
});

//process... is some heroku stuff cuz i tried to host it
//also procfile is for heroku
app.listen(process.env.PORT || 3000, function(){
  console.log("Server is running on port 3000!");
});

//api key
//c80907939df6d87a2d1bba528ccaadaf-us3

//0baccb3b28
