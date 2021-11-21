// The option changed function
function optionChanged(){
  // GET THE SELECT OPTION VALUE
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");
  // When the value in the select box changes, then change the horizontal bar chart
  filteredSampleData = samples.filter(entry => entry.id === dataset)[0];
  
  // HORIZONTAL BAR GRAPH
  // Select top 10 sample values
  let top_ten_sample_values = filteredSampleData.sample_values.slice(0, 10).reverse();
  let top_ten_sample_otu_ids = filteredSampleData.otu_ids.map(entry => 'OTU ' + entry).slice(0, 10).reverse();
  let top_ten_sample_otu_labels = filteredSampleData.otu_labels.slice(0, 10).reverse();
  // Create a trace object
  let bar_trace1 = {
    x: top_ten_sample_values,
    y: top_ten_sample_otu_ids,
    text: top_ten_sample_otu_labels,
    type: "bar",
    orientation: "h"
  };
  // Create a data array with the above trace
  let bar_data = [bar_trace1];
  // Use `layout` to define a title
  Plotly.newPlot("bar", bar_data);

  // DEMOGRAPHIC INFO
  filteredMetaData = metadata.filter(entry => entry.id === parseInt(dataset))[0];
  // console.log(filteredMetaData);
  let tbody = d3.select("#sample-metadata").append("tbody");
  for (const [key, value] of Object.entries(filteredMetaData)) {
    let row = tbody.append("tr");
    var cell = row.append("td");
    cell.text(`${key}: ${value}`);
  };

  // BUBBLE CHART
  var bubble_trace1 = {
      x: filteredSampleData.otu_ids,
      y: filteredSampleData.sample_values,
      mode: 'markers',
      marker: {
        size: filteredSampleData.sample_values,
        color: filteredSampleData.otu_ids,
        colorscale: 'Earth'
      }
  };
  var bubble_data = [bubble_trace1];
  var bubble_layout = {
      showlegend: false,
      xaxis: {
        title: 'OTU ID'
      }
  };
  Plotly.newPlot('bubble', bubble_data, bubble_layout);



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
