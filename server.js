const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app=express();

//Register the partials 
hbs.registerPartials(__dirname + '/views/partials')

app.set('view engine', 'hbs');


app.use((req, res, next) =>{
  var now = new Date().toString();
  var log = `${now}: ${req.method} ${req.url}`;
  console.log(log);
  fs.appendFileSync('server.log', log + '\n');
  next();
}); 

app.use((req, res, next)=>{
  res.render('maintenance.hbs');
});

app.use(express.static(__dirname+'/public'));

//Register the Helper function
hbs.registerHelper('getCurrentYear', ()=>{
  return new Date().getFullYear();
});

hbs.registerHelper('scremIt', (text)=>{
  return text.toUpperCase();
});

app.get('/', (RegExp, res) => {
  res.render('home.hbs',{
    pageTitle: 'Home Us',
    currentYear: new Date().getFullYear(),
    welcomeMsg: 'Welcome to my Express World'
  })
});

app.get('/jsonData', (RegExp, res) => {
  res.send({
    name: 'Ajay',
    Lname: 'Patil'
  });
});

app.get('/about', (RegExp, res) => {
  res.render('about.hbs',{
    pageTitle: 'About Us',
    currentYear: new Date().getFullYear()
  });
});

app.listen(3000, ()=>{
  console.log("Server is up on port : 3000");
});