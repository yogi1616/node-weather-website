const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.darksky.net/forecast/e0a529fa64b55048ff739990bd2c9366/${latitude},${longitude}?units=si`

    request({url, json:true}, (error, {body}) => {
        // console.log(response.body)
        if(error){
            callback('Unable to join to the Network', undefined)
        }else if(body.error){
            callback('Unable to find the Location', undefined)
        }else{
        callback(undefined, `Weather is ${body.hourly.summary}. It is currently ${body.currently.temperature} degree out. There is a ${body.currently.precipProbability}% chance of rain with the wind speed of ${body.currently.windSpeed}.`
        )
    }
    })

}

module.exports = forecast