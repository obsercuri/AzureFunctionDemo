const moment = require('moment');
const rp = require('request-promise')

module.exports = async function (context, req) {
    context.log('JavaScript HTTP trigger function processed a request.');
    const address = (req.query.address || req.body.address)
    const weekday = moment().format('dddd');
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1Ijoib2JzZXJjdXJpIiwiYSI6ImNrNHJqaGR3aDEwYjczbHAxZWVwYXQ3emYifQ.JDe079Gpuq9TaOLuaOyyrA&limit=1'
    const options = {
        method: 'GET',
        uri: url,
    }

    /*
        latitude: body.features[0].center[1],
        longitude: body.features[0].center[0],
        location: body.features[0].place_name
    */
    const result = await rp(options)
    parsedRes = JSON.parse(result);
    
    console.log(parsedRes)

    const latitude = parsedRes.features[0].center[1]
    const longitude = parsedRes.features[0].center[0]
    const location = parsedRes.features[0].place_name

    console.log(latitude + ", ", longitude + ", " + location)

    if (address) {
            context.res = {
                // status: 200, /* Defaults to 200 */
                body: 'The Place is ' + location
            }
    } else {
        context.res = { 
            status: 400,
            body: "Please pass a address. Today is " + weekday
        };
    }   

};