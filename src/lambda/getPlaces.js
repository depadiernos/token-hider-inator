
exports.handler = function (event, context, callback) {
  const qs = require("qs")
  const geoip = require('geoip-lite')
  const params = event.queryStringParameters
  const ipaddress = event.headers["client-ip"]
  const location = geoip.lookup(ipaddress)
  const ll = (location)? location.ll: null
  const { API_TOKEN } = process.env
  const googleMapsClient = require('@google/maps').createClient({
    key: API_TOKEN,
    Promise: Promise
  });

  // Let's log some stuff we already have.
  console.log("logging event.....", event)
  console.log("logging params ", params)
  console.log("logging client's ip address ", ipaddress)

  // Here's a function we'll use to define how our response will look like when we call callback
  const pass = (body) => {
    callback(null, {
      statusCode: 200,
      body: JSON.stringify(body)
    })
  }

  // Perform the Places Query call.
  const get = () => {
    googleMapsClient.places({ query: params.query, location: ll }).asPromise()
      .then((response) => {
        pass(response.json.results)
      }
      )
      .catch(err => pass(err))
  }
  if (event.httpMethod == 'GET') {
    get()
  };
};