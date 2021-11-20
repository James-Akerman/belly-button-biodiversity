// The option changed function
function optionChanged(){
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // When the value in the select box changes, then change the horizontal bar chart
  filteredData = samples.filter(entry => entry.id === dataset)[0];
  // CREATE THE HORIZONTAL BAR GRAPH
  // Select top 10 sample values
  let top_ten_sample_values = filteredData.sample_values.slice(0, 10).reverse();
  let top_ten_sample_otu_ids = filteredData.otu_ids.map(entry => 'OTU ' + entry).slice(0, 10).reverse();
  let top_ten_sample_otu_labels = filteredData.otu_labels.slice(0, 10).reverse();
  // Create a trace object
  let trace1 = {
    x: top_ten_sample_values,
    y: top_ten_sample_otu_ids,
    text: top_ten_sample_otu_labels,
    type: "bar",
    orientation: "h"
  };
  // Create a data array with the above trace
  let plot_data = [trace1];
  // Use `layout` to define a title
  let layout = {
    title: "Basic horizontal barplot",
  };
  Plotly.newPlot("bar", plot_data, layout);
  };


d3.json("samples.json").then((importedData) => {
  data = [importedData];
  // Seperate the data into different arrays of metadata, names, and sample data
  metadata = data.map(entry => entry.metadata)[0];
  names = data.map(entry => entry.names)[0];
  samples = data.map(entry => entry.samples)[0];
  // Assign each test subject id to the select dropdown menu
  var sample_ids = samples.map(entry => entry.id);
  var selector = d3.select("#selDataset");
  sample_ids.forEach((sample) => {
    selector
        .append("option")
        .text(sample)
        .property("value", sample);
  });
  optionChanged();
});
