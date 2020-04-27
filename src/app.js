const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
// this path means when render functions are called, they look into files in viewsPath
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
// in hbs file when read css location is /css/styles.css, first '/' means publicDirectoryPath
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Yijiang'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Yijiang Zheng'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: "This is some helpful text.",
        title: 'Help',
        name: 'Yijiang Zheng'
    })
})

app.get('/weather', (req, res) =>{
    if(!req.query.address){
        return res.send({
            error: 'You must provide an address term'
        })
    }
    geocode(req.query.address, (error, { latitude, longtitude, location } = {}) =>{
        if(error) {
            return res.send({ error })
        } 

        forecast(latitude, longtitude, (error, forecastData) => {
            if (error) {
                res.send({ error})
            }
            
            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
        })
    })
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    } 
    console.log(req.query.search)
    res.send({
        products: [] 
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yijiang Zheng',
        errorMessage: 'Help article not found'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Yijiang Zheng',
        errorMessage: 'Page not Found.'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})
