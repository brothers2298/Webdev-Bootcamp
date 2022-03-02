const express = require("express");

const app = express();

//Sends Message upon a get request (request = req, response = res).
app.get("/", function(request, response) {
    response.send("<h1>Hello World!</h1>");
});

app.get("/contact", function(req, res) {
    res.send("Contact me at: austin@gmail.com")
});

app.get("/about", function(req, res) {
    res.send("I am Austin, a Programmer");
});

app.get("/hobbies", function(req, res) {
    res.send("Snowboarding");
});

app.listen(3000, function() {
    console.log("Server started on port 3000");
});
