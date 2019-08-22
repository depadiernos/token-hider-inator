import React, { useState } from "react"
import ReactDOM from "react-dom"

const encode = () => {
  const encoded = address.value.split(" ").join("+")
  const params = "?query=" + encoded
  return params
}

function App() {
  const [query, setQuery] = useState("")
  const [places, setPlaces] = useState([])
  const getPlaces = (event) => {
    event.preventDefault()
    fetch("/.netlify/functions/getPlaces" + encode(query))
      .then((response) => setPlaces(response.body))
      .catch((err) => console.log(err))
  }

  return (
    <div className="modal">
      <header>
        <h1>Hazards of Maps!</h1>
        <p>
          This site will call a lambda function, which will call an api
          endpoint, inject my Google Map API key and pass back the response in JSON.
        </p>
      </header>

      <div className="form">
        <h4>Search for a place or type of place nearby:</h4>
        <input
          id="query"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. food, store, etc."
        />
        <button onClick={getPlaces} id="submit">
          Submit
        </button>
      </div>

      {
        if (places){
          places.map((place) => {
            return <div>{place.name}</div>
          })
        }
      }

    </div>
  )
}

ReactDOM.render(<App />, document.querySelector("#app"))
