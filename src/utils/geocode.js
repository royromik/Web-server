const request = require("request");
const geocode = (address, cb) => {
    const geocode_url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm95cm9taWsiLCJhIjoiY2tqMHozd2gzMGQ3NTJ6cXRlNHJ6Nm5jdyJ9.QUf8guX-Y97YroHCVUsOFQ&limit=1`

    request({url: geocode_url, json: true}, (error, {body})=>{
         if(error){
             cb('unable to connect to the geocoding services api', undefined)
         } else if (body.message || body.error || body.features.length == 0){
             cb('Unable to find the location!!, please try again with another search', undefined)
         } else {
            // console.log(body)
            cb(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location: body.features[0].place_name
            })
         }
    })
}

module.exports = geocode