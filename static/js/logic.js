// console.log("hello")

// Create the createMap function
function createMap(earthquakes) {

    // Create the tile layer that will be the background of our map.
    let baseLayer = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    });
  
    // Create a baseMaps object to hold the streetmap layer.
    let baseMapLayer = {
      "Street Map": baseLayer
    };
  
    // Create an overlayMaps object to hold the earthquakes layer.
    let overlayMapLayer = {
      "Earthquakes": earthquakes
    };
  
    // Create the map object with options.
    let map = L.map("map", {
      center: [40.73, -74.0059],
      zoom: 2,
      layers: [baseLayer, earthquakes]
    });
  
    // Create a layer control, and pass it baseMaps and overlayMaps. Add the layer control to the map.
    L.control.layers(baseMapLayer, overlayMapLayer, {
      collapsed: false
    }).addTo(map);
    legend.addTo(map)
  }
  
  function depth_colors(value){
    if (value <=10){return "#61FF33"};
    if (value <=30){return "#FFFC33"};
    if (value <=50){return "#FFB233"};
    if (value <=70){return "#FF9333"};
    if (value <=90){return "#EC4416"};
    return "#FA0B03"
    
  }
//   {
//    if earthquakesArray[i].properties.mag <-10&>10
//    then color: 'green',
//    fillColor: 'green'
//   }

  // Create a function to createMarkers 
  function createMarkers() 
  {
    d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function(res)
    {
    // Pull the "features" property from response.data.
    let earthquakesArray = res.features
    // Initialize an array to hold features markers(individual earthquakes).
    let featureMarkers = [];
  
    // Loop through the features array.
    for (let i = 0; i < earthquakesArray.length; i++) 
    {
    // // // // //let station = stations[index];
  
    // For each earthquake, create a marker, and bind a popup with some information about the earthquake.
    // size: magnitude color: depth


    let mark = L.circle([earthquakesArray[i].geometry.coordinates[0], earthquakesArray[i].geometry.coordinates[1]],(earthquakesArray[i].properties.mag)*100000,
        {
        color: 'black',
        fillColor: depth_colors(earthquakesArray[i].properties.mag)
        })
        .bindPopup(`place: ${earthquakesArray[i].properties.place} - id: ${earthquakesArray[i].id} - magnitude: ${earthquakesArray[i].properties.mag} - depth: ${earthquakesArray[i].geometry.coordinates[2]}`)
  
    // Add the marker to the featureMarkers array.
      featureMarkers.push(mark)
    }
    // Create a layer group that's made from the feature markers array, and pass it to the createMap function.
    let bLayerGroup = L.layerGroup(featureMarkers)
  
    createMap(bLayerGroup)

    })
  }
    // Perform an API call to get data for the past 7 days, all earthquakes. Call CreateMarkers when it is done.
    createMarkers()

