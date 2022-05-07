// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// We create the dark view tile layer that will be an option for our map.
let dark = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/dark-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let light = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data © <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

// Create a base layer that holds both maps.
let baseMaps = {
  "Street": streets,
  "Satellite Streets": satelliteStreets,
  "Dark": dark,
  "Light": light
};

// // Create the map object with center at the San Francisco airport.
// let map = L.map('mapid').setView([37.5, -122.5], 10);

// Create the map object with center and zoom level.
let map = L.map('mapid', {
  center: [43.7, -79.3],
  zoom: 2,
  layers: [satelliteStreets]
});

// Pass our map layers into our layers control and add the layers control to the map.
L.control.layers(baseMaps).addTo(map);

// Then we add our 'graymap' tile layer to the map.
// baseMaps.addTo(map);

// Accessing the airport GeoJSON URL
// let airportData = "https://raw.githubusercontent.com/hankai26/Mapping_Earthquakes/main/majorAirports.json";
// let torontoData = "https://raw.githubusercontent.com/hankai26/Mapping_Earthquakes/Mapping_GeoJSON_Linestrings/torontoRoutes.json";
let torontoHoods = "https://raw.githubusercontent.com/<GitHub_name>/Mapping_Earthquakes/main/torontoNeighborhoods.json";

// Create a style for the lines.
let myStyle = {
  color: "#ffffa1",
  weight: 2
}
// Grabbing our GeoJSON data.
d3.json(torontoData).then(function(data) {
  console.log(data);

  // Creating a GeoJSON layer with the retrieved data.
    L.geoJSON(data, {
      style: myStyle,
      onEachFeature: function(feature, layer){
        layer.bindPopup("<h3> Airline: " + feature.properties.airline + "</h3> <hr><h3> Destination: "+feature.properties.dst +"</h3>");
      }
    })
    .addTo(map);
  
});

// data.forEach(function(destin){
//   // Creating a GeoJSON layer with the retrieved data.
//     L.geoJSON(destin, {
//       color: "yellow",
//       weight: 1.5
//     })
//     .bindPopup("destination")
//     .addTo(map);
//   });
// });

//??
torontoData.forEach(function(){
  L.bindPopup("destination")
  .addTo(map);
});

// // ?? https://courses.bootcampspot.com/courses/1159/pages/13-dot-5-3-map-multiple-geojson-points?module_item_id=440355
// // ??https://courses.bootcampspot.com/courses/1159/pages/13-dot-5-4-add-multiple-maps?module_item_id=440357
// d3.json(airportData).then(function(data) {
//   L.geoJSON(data, {
//     // We turn each feature into a marker on the map.
//     pointToLayer: function(feature, latlng) {
//       console.log(feature);
//       return L.marker(latlng)
//       .bindPopup("<h2>" + feature.properties.name + "</h2> <hr> <h3>" + feature.properties.city + ", " + feature.properties.country +"</h3");
//     }
//   })
//   .addTo(map);



// // Grabbing our GeoJSON data.
// L.geoJSON(sanFranAirport, {
//   // We turn each feature into a marker on the map.
//   pointToLayer: function(feature, layer) {
//     console.log(layer);
//     layer.bindPopup();
//   }
// })
// .addTo(map);
  
// // Get data from cities.js
// let cityData = cities;

// //   // Loop through the cities array and create one marker for each city.
// // cityData.forEach(function(city) {
// //     console.log(city)
// //     L.marker(city.location)
// //     .bindPopup("<h2>"+city.city+", "+city.state+"</h2> <hr> <h3>Population "+city.population.toLocaleString()+"</h3>")
// //     .addTo(map);
// // });

//   // Loop through the cities array and create one marker for each city.
// cityData.forEach(function(city) {
//     console.log(city)
//     L.circleMarker(city.location, {
//         radius: city.population/100000
//     })
//     .bindPopup("<h2>"+city.city+", "+city.state+"</h2> <hr> <h3>Population "+city.population.toLocaleString()+"</h3>")
//     .addTo(map);
// });