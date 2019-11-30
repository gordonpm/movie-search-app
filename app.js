const express = require('express');
const app = express();
const request = require('request');

app.set("view engine", "ejs")

// Default search page
app.get("/", function(req,res) {
    res.render("search");
})

// Search results page
app.get("/results", function(req, res) {
    const movieTitle = req.query.moviename;
    const url = "http://www.omdbapi.com/?s=" + movieTitle + "&apikey=thewdb";
    request(url, function(error, response, body) {
        if (!error && response.statusCode == 200) {
            const data = JSON.parse(body);
            console.log(data);
            //res.send(data["Search"][0]["Title"]); // send title of first movie found in results
            res.render("results", {data: data});
        }
    });
});

// For running in C9 environment
// app.listen(process.env.PORT, function() {
//     console.log("Mpvie app has started " + process.env.PORT + process.env.IP);
// });

app.listen(3000, function() {
    console.log("Movie app started");
})
