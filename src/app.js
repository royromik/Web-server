const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('../src/utils/geocode');
const forecast = require('../src/utils/forecast')


const app = express();
const port = process.env.PORT || 3000

const publicDirectoryPath = path.join(__dirname, '../public');
const viewsDirPath = path.join(__dirname,"../templates/views");
const partialsDirPath = path.join (__dirname,"../templates/partials");

app.set('view engine', 'hbs');
app.set('views',viewsDirPath);
hbs.registerPartials(partialsDirPath);

app.use(express.static(publicDirectoryPath));    

app.get('', (req, res)=>{
    res.render('index',{
        title: 'Weather App',
        name: 'Romik Roy'
    })
})

app.get('/about', (req,res)=>{
    res.render('about',{
       title: 'About Me',
       name:'Romik Roy'
    })
})

app.get('/help', (req,res)=>{
    res.render('help',{
       title: 'Help Page',
       message:'This page is under maintainance and will be updated by developer',
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


app.listen(port,()=>{
    console.log(`Server is started on ${port} port`);
})