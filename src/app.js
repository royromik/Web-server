const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast')


const app = express();

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname,"../templates/views");
const partialsDirPath = path.join (__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirectoryPath));    

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Home page',
        name: 'Romik Roy'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
       title: 'About Page',
       name:'Romik Roy'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
       title: 'Help Page',
       message:'I am here for you help',
       name: 'Romik Roy'
    })
})

app.get('/weather', (req,res)=>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address!!'
        })
    } else {
    
        geocode(req.query.address, (error, {latitude,longitude,location} = {}) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
    
            forecast(latitude,longitude, (error, forecastData) => {
                if (error) {
                    return res.send({
                        error: error
                    })
                }
    
                // console.log(location);
                // console.log(forecastData);
                res.send({
                    forecast: forecastData,
                    location: location,
                    address: req.query.address
                });
            })
        })
    }
})


app.get("/help/*",(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Romik Roy'
    })
})


app.get("*",(req,res)=>{
    res.render('404',{
        title: '404',
        errorMessage: 'Page not found',
        name: 'Romik Roy'
    })
})


app.listen(3002,()=>{
    console.log('Server is started on 3002 port');
})