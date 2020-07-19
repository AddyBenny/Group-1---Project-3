
var url =  "http://localhost:4545/"

function getData(){
d3.json(url).then(function(data){
       console.log(data[0].Lat);
       var Lat = data[0].Lat
       drawHeatMap(Lat)
   
            
        });


}

function drawHeatMap(Lat){
  console.log(`The maps lat is ${Lat}`)

  var myMap = L.map("map", {
    center: [33.6868228, -117.7634788],
    zoom: 13
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 11,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);
  
  // var url = "https://data.sfgov.org/resource/cuks-n6tp.json?$limit=10000";
  
  d3.json(url, function(response) {
  
    console.log(response);
    // response.setHeader("Set-Cookie", "HttpOnly;Secure;SameSite=Strict");
  
    var heatArray = [];
  
    for (var i = 0; i < response.length; i++) {
      var location = response[i];
  
      if (location) {
        heatArray.push([location.Lat, location.Lng]);
      }
    }
  
    console.log(`Heat Array: ${heatArray}`)
    var heat = L.heatLayer(heatArray, {
      radius: 50,
      blur: 35
    }).addTo(myMap);

  });

}

function drawMarkerMap(){

  var myMap = L.map("map2", {
    center: [33.6868228, -117.7634788],
    zoom: 13
  });
  
  L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 11,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);


  
  d3.json(url, function(response) {
  for (var i = 0; i < response.length; i++) {
    var city = response[i].City;
    var location = response[i];

    L.marker([location.Lat, location.Lng])
      .bindPopup("<h1>" + city + "</h1>")
      .addTo(myMap);
  }
  });
}



getData();

const dataPromise = d3.json(url);
console.log("Data Promise: ", dataPromise);




