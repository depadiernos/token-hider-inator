import React, { useState } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'

const api = {
  encode: () => {
    const encoded = address.value.split(" ").join("+");
    const params = "?query=" + encoded;
    return params;
  },
  send: () => {
    encode = api.encode;
    api.get(encode);
  },
  show: result => {
    const { lat, lng } = result[0].geometry.location;
    const coordinates = document.getElementById("coordinates");
    const map = document.getElementById("map");
    console.log(JSON.stringify(result));
    const url = `<iframe width='100%' height='400px' id='mapcanvas' src='https://maps.google.com/maps?q=place_id${placeId}&z=16&ie=UTF8&iwloc=&output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'><div class='zxos8_gm'><a rel='nofollow' href='https://themesort.com/category/agency-themes'>Agency templates at themesort</a></div><div style='overflow:hidden;'><div id='gmap_canvas' style='height:100%;width:100%;'></div><div><small>Powered by <a href='https://www.embedgooglemap.co.uk'>Embed Google Map</a></small></div></iframe>`;
    map.innerHTML = url;
    map.hidden = false;
  },
  get: params => {
    fetch("/.netlify/functions/getapi" + api.encode())
      .then(response => response.json())
      .then(result => api.show(result.results))
      .catch(err => console.log(err));
  }
};

//Create eventlistener
// const submit = document.getElementById("submit");
// const input = document.getElementById("address");
// submit.addEventListener("click", api.send, false);
// input.addEventListener(
//   "keyup",
//   function (event) {
//     if (event.key == "Enter") {
//       api.send();
//     }
//   },
//   false
// );

function App() {
  const [query, setQuery] = useState('')
  return (
    <div className="modal">
      <header>
        <h1>Hazards of Maps!</h1>
        <p>
          This site will call a lambda function, which will call an api
          endpoint, inject my Google Map API key and pass back the response in
          JSON format.
  </p>
      </header>

      <div className="form">
        <h4>Please enter your address:</h4>
        <input
          id="address"
          type="text"
          placeholder="street number and name, city, state"
        />
        <button id="submit">Submit</button>
      </div>
      <div id="coordinates" hidden>
        The coordinates for the address you entered is
  <span id="coordindate-value"></span>
      </div>
      <div id="map" hidden>
        Click the following link to view in Google Maps<br />
        <span id="map-link"></span>
      </div>
    </div>
  )
}

ReactDOM.render(<App/>, document.querySelector("#app"))