 //jshint esversion:6

 const express = require("express");
 const bodyParser = require("body-parser");
 const date = require(__dirname + "/date.js");

 //console.log(date());

 const app = express();

 const items = ["Buy food", "Cook food", "Eat food"];
 const workItems = [];

 app.set('view engine', 'ejs');

 app.use(bodyParser.urlencoded({extended: true}));
 app.use(express.static(__dirname + '/public'));

 app.get("/", function(req, res){

   const day = date.getDate();

   // moved the code here to datedotjs

 res.render("list", {listTitle: day, newListItems: items});
});

app.post("/", function(req, res){

  const item = req.body.newItem;

  if (req.body.list === "Work"){
    workItems.push(item);
    res.redirect("/work");
  } else {
    items.push(item);
    res.redirect("/");
  }

  res.redirect("/");

});

app.get("/work", function(req, res){
  res.render("list", {listTitle: "Work List", newListItems: workItems});
});

app.post("/work", function(req, res){
  const item = req.body.newItem;
  workItems.push(item);
  res.redirect("/work");
});

app.get("/about", function (req, res){
  res.render("about");
});

 app.listen(5001, function(){
   console.log("Server is running on port 5001");
 });
