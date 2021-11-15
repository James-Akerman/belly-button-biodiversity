// Fetch the JSON data and console log it
// data = JSON.parse("samples.json");
// console.log(data);
d3.json("samples.json", function (d) {
    console.log(d);
});

