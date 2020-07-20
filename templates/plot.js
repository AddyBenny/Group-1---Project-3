var url = "http://127.0.0.1:4545/"

function getData() {
    d3.json(url).then(function(data) {
        console.log(data)
    });
}
getData()

function getData() {
    d3.json(url).then(function(data) {
        console.log(data[0].City);

    });

}