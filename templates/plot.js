var url = "http://localhost:4545/"

// function getData() {
//     d3.json(url).then(function(data) {
//         console.log(data)
//     });
// }
// getData()



function init() {

    // var initDropdown = d3.selectAll('#selDataset')
    // var dataset = initDropdown.property("value");

    d3.json(url).then(function(data) {
        console.log(data[0].job_type)

        var i;
        var x = [];
        var y = [];

        for (i=0; i<data.length; i++) {
                if (data[i].job_type === 'Data Scientist') {
                    x.push(data[i].City)
                }
        }

    
        var trace = {
            x: x,
            type: 'histogram',
          };

        var layout = {
            title: 'Job Count by City',
            xaxis: {
              title: 'City'
            }
          };
        var data = [trace];
      
        Plotly.newPlot("plot", data, layout);

    });

}

d3.selectAll("#selDataset").on("change", updatePlotly);


function updatePlotly() {

    d3.json(url).then(function(data) {
        var dropdownMenu = d3.select("#selDataset");
        var dataset = dropdownMenu.property("value");
        var x = [];

        if (dataset === 'dataScience'){
            for (i=0; i<data.length; i++) {
                if (data[i].job_type === 'Data Scientist') {
                    x.push(data[i].City)
                }
            }

        };

        if (dataset === 'softwareEngineer'){
            for (i=0; i<data.length; i++) {
                if (data[i].job_type === 'Sowftware Engineer') {
                    x.push(data[i].City)
                }
            }

        }

        if (dataset === 'frontendDev'){
            for (i=0; i<data.length; i++) {
                if (data[i].job_type === 'Front-End Developer') {
                    x.push(data[i].City)
                }
            }

        }

        var trace = {
            x: x,
            type: 'histogram',
          };
        var data = [trace];

        var layout = {
            title: 'Job Count by City',
            xaxis: {
              title: 'City'
            }
        };
      
        Plotly.newPlot("plot", data, layout);

    });
}



  init();
