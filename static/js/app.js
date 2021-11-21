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
      text: filteredSampleData.otu_labels,
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

  // GAUGE CHART
    // let gauge_data = [{
    // type: "pie",
    // showlegend: false,
    // hole: 0.4,
    // rotation: 90,
    // values: [40,5,5,5,5,5,5,5,5],
    // labels: ["","0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "7-8", "8-9"],
    // direction: "clockwise",
    // marker: {
    //   colors: [
    //         'rgb(255, 255, 255)',
    //         'rgb(232,226,202)',
    //         'rgb(226,210,172)',
    //         'rgb(223,189,139)',
    //         'rgb(223,162,103)',
    //         'rgb(226,126,64)',
    //         'rgb(226,126,64)',
    //         'rgb(226,126,64)',
    //         'rgb(226,126,64)'
    //   ]
    // },
    // hoverinfo: 'skip',
    // textposition: 'none',
    // }];

    // let gauge_layout = {
    //   title: "Belly Button Washing Frequency".bold() + "<br>" + 'Scrubs per Week',
    // };

    // let gauge_data = [
    //   {
    //     domain: { x: [0, 1], y: [0, 1] },
    //     // value: 2,
    //     title: { text: "Belly Button Washing Frequency".bold() + "<br>" + 'Scrubs per Week' },
    //     type: "indicator",
    //     mode: "gauge",
    //     gauge: {
    //       axis: { range: [0, 9], showticklabels: false },
    //       steps: [
    //         {names: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "7-8", "8-9"]},
    //         { range: [0, 1], color: "blue"},
    //         { range: [1, 2], color: "red" },
    //         { range: [2, 3], color: "green" },
    //         { range: [3, 4], color: "yellow" },
    //         { range: [4, 5], color: "orange" },
    //         { range: [5, 6], color: "pink" },
    //         { range: [6, 7], color: "lightblue" },
    //         { range: [7, 8], color: "purple" },
    //         { range: [8, 9], color: "lightgreen" },
    //       ],
    //       threshold: {
    //         line: { color: "red", width: 4 },
    //         thickness: 0.75,
    //         value: 490
    //       },
    //       labels: ["0-1", "1-2", "2-3", "3-4", "4-5", "5-6", "7-8", "8-9"],
    //     }
    //   }
    // ];
    
    // let gauge_layout = { 
    //   width: 600, 
    //   height: 450, 
    //   margin: { t: 0, b: 0 } };

    gauge_data = [{
      values: [50, 10, 10, 10, 10, 10],
      labels: [" ", "Debug", "Info", "Warn", "Error", "Fatal"],
      marker: {
          'colors': [
              'rgb(255, 255, 255)',
              'rgb(232,226,202)',
              'rgb(226,210,172)',
              'rgb(223,189,139)',
              'rgb(223,162,103)',
              'rgb(226,126,64)'
          ]
      },
      domain: {"x": [0, 0.48]},
      name: "Gauge",
      hole: .3,
      type: "pie",
      direction: "clockwise",
      rotation: 90,
      showlegend: false,
      textinfo: "label",
      textposition: "inside",
      hoverinfo: "none"
  }]

  gauge_layout = {
    title: { 
      text: "Belly Button Washing Frequency".bold() + "<br>" + 'Scrubs per Week', 
      x: 0.1
    },
    shapes: [
        {
          // Debug
          path: 'M 0.235 0.5 L 0.14 .60 L 0.245 0.5 Z',
          // Info
          // path: 'M 0.235 0.5 L 0.19 0.65 L 0.245 0.5 Z',
          // Warn
          // path: 'M 0.235 0.5 L 0.24 0.72 L 0.245 0.5 Z',
          // Error
          // path: 'M 0.235 0.5 L 0.29 0.65 L 0.245 0.5 Z',
          // Fatal
          // path: 'M 0.235 0.5 L 0.35 0.57 L 0.245 0.5 Z',

          fillcolor: 'red',
          line: {
            width: 0.4
          },
        }
    ],
    }
  Plotly.newPlot('gauge', gauge_data, gauge_layout);

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
