
var url =  "https://api.mapbox.com/geocoding/v5/mapbox.places/"
var url_end = ".json?access_token=" + API_KEY

var main_list = []

function printName(main_list){
d3.json("http://localhost:4545/").then(function(data){
    //    console.log(data);
    //     console.log(data[1].City)
        // console.log(url + data[i].City + url_end)

        
        var full_url = url + data[1].City + url_end
        d3.json(full_url).then(function(data) {
            
        });

        // console.log(data[0][10])
        console.log(data.length)
        for (let i = 0; i < data.length; i++) {
            
            console.log(data[i].City)
            console.log(url + data[i].City + url_end)
            var full_url = url + data[i].City + url_end
            d3.json(full_url).then(function(result) {
                // console.log(result.features[0].geometry.coordinates);
                // console.log(typeof(result.features[0].geometry.coordinates));
                // temp_list = []
                // temp_list.push(data[i].City, result.features[0].geometry.coordinates[0], result.features[0].geometry.coordinates[1])
                // temp_list.push(result.features[0].geometry.coordinates[0])
                // temp_list.push(result.features[0].geometry.coordinates[1])
                // // console.log(temp_list)
                main_list.push([data[i].City, result.features[0].geometry.coordinates[0], result.features[0].geometry.coordinates[1]])
                // console.log(main_list.length)
                // console.log(main_list[0]) 
                console.log(main_list.length)
                // console.log(temp_list.length)
          });
        }
   


           // console.log(main_list[0])
         return main_list; 
        
               
   });
}

// console.log(main_list) 

console.log(printName(main_list));

// console.log(deepCopy)


// console.log(main_list.length)





