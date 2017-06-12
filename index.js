var express = require('express');
var moment = require('moment');
var app = express();


app.use(express.static(__dirname + '/views'));

app.get("/", function(req,res){
    res.sendFile('index.html');
})

app.get("/:time", function(req, res){
    var timeStamp = req.params.time;
    var results = {
        unix: null,
        natural: null
    };
    
    //check unix time stamp
    if(moment.unix(timeStamp).isValid()) {
        results.unix = Number(moment.unix(timeStamp).format("X"));
        results.natural = moment.unix(timeStamp).format("MMMM DD, YYYY");
    }
    //check if natural time state
    else if (moment(timeStamp).isValid()){
        results.unix = Number(moment(timeStamp).format("X"));
        results.natural = moment(timeStamp).format("MMMM DD, YYYY");
    }

    res.send(results);
})

app.listen(process.env.PORT, process.env.IP, function(){
    console.log("App started on port " + process.env.PORT);
})