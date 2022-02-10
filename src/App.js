import React, { useState, useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import LeafletIcon from "./components/LeafletIcon";

const center = [48.9109,2.3352]; // Saint-Ouen
const zoom = 15;

function App() {

  const [markers, setMarkers] = useState([]);

  useEffect(() => {

    // TODO fetch from API
    fetch(`${process.env.PUBLIC_URL}/data/MARKERS.json`, {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    })
    .then(res => res.json())
    .then(m => setMarkers(m));

  }, []);

  return (
    <MapContainer center={center} zoom={zoom} scrollWheelZoom style={{ height: '100vh', width: '100wh' }}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {
        markers.map(e => (
          <Marker position={[e.long, e.lat]} icon={LeafletIcon}>
            <Popup>
              PM 2.5: <b>{e.pm25} µg/m3</b>
              <br />
              PM 10: <b>{e.pm10} µg/m3</b>
              <br />
              Température: <b>{e.temperature}°C</b>
              <br />
              Pression: <b>{e.pressure} hPa</b>
              <br />
              Humidité: <b>{e.humidity}%</b>
              <hr />
              Dernière mesure : {e.date}
            </Popup>
          </Marker>
        ))
      }
    </MapContainer>
  )
}

export default App;