const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
                encodeURIComponent(address) + 
                '.json?access_token=pk.eyJ1IjoieWlqaWFuZ3poZW5nIiwiYSI6ImNrOWYzdnUybTA5MWgzbG9iZmJobG5rY28ifQ.E4GPr4RMNKRsmuwWeOZeTg&limit=1'

    request({url, json: true}, (error, { body } = {}) => {
        if(error){
            callback('Unable to connect to location services!', undefined)
        }else if (body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        }
        else{
            const data = body.features[0]
            callback(undefined, {
                latitude: data.center[1],
                longtitude: data.center[0],
                location: data.place_name
            })
        }
    })
}


module.exports = geocode

