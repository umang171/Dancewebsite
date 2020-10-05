const express=require('express');
const app=express();
const bodyparser=require('body-parser');
const path=require('path');
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/contactdance', {useNewUrlParser: true});
const port=8000;
// Define mongoose schema
const contactSchema = new mongoose.Schema({
    name: String,
    phone:String,
    email:String,
    address:String,
    desc:String
  });
  var contact = mongoose.model('contact', contactSchema);
//Express
app.use('/static',express.static('static'));// for serving static file
app.use(express.urlencoded())
//pug
app.set('view engine', 'pug');// for the template engine as pug
app.set('views',path.join(__dirname,'views'));// set the view directory
// Our pug demo endpoint
app.get("/",(req,res)=>
{
    const params={};
    res.status(200).render('home.pug', params);
});
app.get("/contact",(req,res)=>
{
    const params={};
    res.status(200).render('contact.pug', params);
});
app.post("/contact",(req,res)=>
{
    var myData=new contact(req.body);
    myData.save().then(()=>{
        res.send("This item is saved to the database");
    }).catch(()=>{
        res.status(400).send("Item is not saved");
    })
    // res.status(200).render('contact.pug');
});
app.listen(port,()=>{
    console.log(`The application started successfully...${port}`);
})