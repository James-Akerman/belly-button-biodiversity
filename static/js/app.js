d3.json("samples.json").then((importedData) => {
  
  data = importedData;

  // Step 1: Seperate the data into different arrays of metadata, names, and sample data
  const metadata = [];
  const names = [];
  const samples = [];
  sample_length = data['metadata'].length;  // All the arrays are of the same length: 153
  for (let i = 0; i < sample_length; i++) {
     metadata.push(data['metadata'][i]);
     names.push(data['names'][i]);
     samples.push(data['samples'][i]);
  };

  // Step 2: divide each object in each array
      // Divide the metadata data

      // Divide the name data

      // Divide the sample data
      sample_otu_ids = samples.map(entry => entry.otu_ids);
      console.log(sample_otu_ids);



});


  //2.Create a horizontal bar chart with a dropdown menu to display the top 10 OTUs found in that individual.
  // -Use sample_values as the values for the bar chart.
  // -Use otu_ids as the labels for the bar chart.
  // -Use otu_labels as the hovertext for the chart.


  // Get the sample ids, sample values, otu_ids, and otu_labels
//   var sample_ids = [];
//   var sample_values = [];
//   var otu_ids = [];
//   var otu_labels = [];

//   for (let i = 0; i < sample_amount; i++) {
//     sample_ids.push(samples[i]['id']);
//     otu_ids.push(samples[i]['otu_ids']);
//     otu_labels.push(samples[i]['otu_labels']);
//     sample_values.push(samples[i]['sample_values']);
//   };

//   console.log(otu_ids);

// // Create a trace object
// var trace1 = {
//   y: otu_ids,
//   x: sample_values,
//   type: "bar",
//   oriantation: 'h'
// };


// // Create a data array with the above trace
// var data = [trace1];

// // Use `layout` to define a title
// var layout = {
//   title: "Basic horizontal barplot"
// };

// // Render the plot to the `plot1` div
// Plotly.newPlot("bar", data, layout);

  // });