const request = require('request')

const geocode = (address, callback) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1IjoieW9naTE2MTYiLCJhIjoiY2pzeWd3Z3hrMDAyZTN5bzBha2Jtemt6eiJ9.2D8t0swyJX5HpHSZx39N8A`

    request({url, json:true}, (error, {body})=> {

        if(error){
                callback('Unable to connect to the Network', undefined)
            }else if(body.message === "Not Found"){
                callback('Please enter city name!', undefined)
            }else if(body.features.length === 0){
                callback('Unable to find the Location! try another search', undefined)
            }else{
                callback(undefined,{
                    latitude: body.features[0].center[1],
                    longitude: body.features[0].center[0],
                    location: body.features[0].place_name
                })
            }
    })
}

module.exports = geocode