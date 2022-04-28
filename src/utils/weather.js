const request = require("request");
const key = "08dd5c3b7e2a6ce64cdd842ad381de14";
const weather = (address, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=${key}&query=${encodeURIComponent(
    address
  )}&units=f`;

  request({ url, json: true }, (error, response) => {
    if (error) {
      callback("Could not connect to a weather service.", undefined);
    } else if (response.body.error) {
      callback("Unable to find location.", undefined);
    } else {
      callback(undefined, {
        location: response.body.location.name,
        lat: response.body.location.lat,
        lon: response.body.location.lon,
        current: response.body.current.weather_descriptions[0],
        temperature: response.body.current.temperature,
        weather_icon: response.body.current.weather_icons[0],
      });
    }
  });
};

module.exports = weather;
/*
const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'https://api.darksky.net/forecast/9d1465c6f3bb7a6c71944bdd8548d026/' + latitude + ',' + longitude

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (body.error) {
            callback('Unable to find location', undefined)
        } else {
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.')
        }
    })
}
*/
