const request = require("request");

const forecast = (lat, long, cb) => {
    const url = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${long}&units=metric&appid=608127d1a98887cc95cec603b09437ff`

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            cb('unable to connect to the onecall api', undefined)
        } else if (body.message || body.error) {
            cb('Unable to find the location!!', undefined)
        } else {
            cb(undefined,
                `The weather is ${body.current.weather[0].description}. It is currently ${body.current.temp} degrees out. There is ${body.current.humidity}% humidity.`
            )
        }
    })
}

module.exports = forecast;