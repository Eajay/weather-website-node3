const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=57a6626ddae86c5c8003ea056d2df365&query=' +
                latitude + ',' + longitude +  '&units=f'
    
    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error){
            callback('Unable to find location weather!', undefined)
        } else{
            const data = body.current
            console.log(data)
            const msg = data.weather_descriptions[0] + '. It is currently ' + data.temperature + 
                        ' degress out. It feels like ' + data.feelslike + ' degress outside.' +
                        ' The humidity is ' + data.humidity + '%.'
            callback(undefined, msg)
            // callback(undefined, {
            //     description: data.weather_descriptions[0],
            //     temperature: data.temperature,
            //     feel_temperature: data.feelslike
            // })
        }
    })

}


module.exports = forecast
