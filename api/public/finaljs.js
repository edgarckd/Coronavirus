const express = require('express');
const store = require('../doctor/')
const router = express.Router()

function initMap() {
  const map = new google.maps.Map(document.getElementById("map"), {
    zoom: 8,
    center: { lat: 11.019499994273357, lng: -74.85043876188652 },
  });
  const geocoder = new google.maps.Geocoder();
  
}


  function geocodeAddress(geocoder, resultsMap) {
    const address = 
    geocoder.geocode({ address: address }, (results, status) => {
      if (status === "OK") {
        resultsMap.setCenter(results[0].geometry.location);
        new google.maps.Marker({
          map: resultsMap,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  }

module.exports = router