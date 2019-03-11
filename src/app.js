const path = require('path')
const express = require('express')
const hbs = require('hbs')

const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const port = process.env.PORT || 3000

const app = express()

//Define paths for Express Config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup Handlebars engine and views Location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title:'Weather App',
        name:'Yogesh Barot'
    })
})

app.get('/about', (req, res) =>{
    res.render('about', {
        title:'About',
        name:'Yogesh Barot'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title:'Help',
        helpText:'Welcome to help page, post your query and we will get to you.',
        name:'Yogesh Barot'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: 'address must be provided'
        })
    }
    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {

            if(error){
                return res.send({error})
            }
        
        forecast(latitude, longitude, (error, forecastData) => {
            
            if(error){
               return res.send({error})
            }
            res.send({
                forecast:forecastData,
                location,
                address: req.query.address                
                })
            })
        })
    })

app.get('/product', (req, res) => {
    if(!req.query.search){
        return res.send({
            error: 'you must provide a search term'
        })
    }
    console.log(req.query.search)
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Yogesh Barot',
        errorMessage:'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title:'404',
        name:'Yogesh Barot',
        errorMessage:'page note found'
    })
})

app.listen(port, () => {
    console.log(`server is up on ${port}`)
})