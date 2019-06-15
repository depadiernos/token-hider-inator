const api = {
  encode: () => {
    const address = document.getElementById("address");
    const encoded = address.value.split(" ").join("+");
    const params = "?address=" + encoded;
    return params;
  },
  send: () => {
    encode = api.encode;
    api.get(encode);
  },
  show: result => {
    const { lat, long } = result[0].geometry.location;
    const coordinates = document.getElementById("coordinates");
    const map = document.getElementById("map");
    console.log(JSON.stringify(result));
    const url = `<iframe width='100%' height='100%' id='mapcanvas' src='https://maps.google.com/maps?q=${lat}+${long}&z=10&ie=UTF8&iwloc=&output=embed' frameborder='0' scrolling='no' marginheight='0' marginwidth='0'><div class='zxos8_gm'><a rel='nofollow' href='https://themesort.com/category/agency-themes'>Agency templates at themesort</a></div><div style='overflow:hidden;'><div id='gmap_canvas' style='height:100%;width:700px;'></div><div><small>Powered by <a href='https://www.embedgooglemap.co.uk'>Embed Google Map</a></small></div></iframe>`;
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
const submit = document.getElementById("submit");
submit.addEventListener("click", api.send, false);
