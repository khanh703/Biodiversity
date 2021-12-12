function init() {
  // Grab a reference to the dropdown select element
  var selector = d3.select("#selDataset");

  // Use the list of sample names to populate the select options
  d3.json("samples.json").then((data) => {
    var sampleNames = data.names;

    sampleNames.forEach((sample) => {
      selector
        .append("option")
        .text(sample)
        .property("value", sample);
    });

    // Use the first sample from the list to build the initial plots
    var firstSample = sampleNames[0];
    buildCharts(firstSample);
    buildMetadata(firstSample);
  });
}

// Initialize the dashboard
init();

function returnCircleSize(item)
{
  console.log('item', item)
  return 30;
}

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  buildMetadata(newSample);
  buildCharts(newSample);
  
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    var demographicTableHtml = "";
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    Object.entries(result).forEach(([key, value]) => {
      //PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
      demographicTableHtml += `<tr><td>${key.toUpperCase()}</td><td>${value}</td></tr>`
    });
    PANEL.html(demographicTableHtml)

  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {

  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {

    // 3. Create a variable that holds the samples array. 
    var allSamples = data.samples;
    var allMetadata = data.metadata;

    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var filteredSamples = allSamples.filter(element => (parseInt(element.id) == parseInt(sample)));

    //  5. Create a variable that holds the first sample in the array.
    var firstSample = filteredSamples[0];

    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otu_ids = firstSample['otu_ids'];
    var otu_labels = firstSample['otu_labels'];
    var sample_values = firstSample['sample_values'];
    
    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 
    var sortedSamples = otu_ids.map((otu_id, idx) => {
      return {
        "otu_id": "OTU " + otu_id,
        "otu_label": otu_labels[idx],
        "sample_value": sample_values[idx]
      }
    }).sort((a,b)=>{
      b.sample_value < a.sample_value
    })
    var yticks = sortedSamples.map(t => t.otu_id).slice(0,10).reverse();

    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        x: sortedSamples.map(t => t.sample_value).slice(0,10).reverse(),
        y: yticks,
        type: "bar",
        orientation: "h",
        text: sortedSamples.map(t => t.otu_label).slice(0,10).reverse()
      }
    ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
        title: "Top 10 Bacteria Cultures Found"
    };
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);


    // 1. Create the trace for the bubble chart.
    var max_marker_size = 45;
    var bubbleData = [
      {
        x: otu_ids,
        y: sample_values,
        text: otu_labels,
        mode: 'markers',
        marker: {
          sizemode:'area',
          color: otu_ids,
          colorscale: 'Earth',
          size: sample_values,
          sizeref: .57 * Math.max(...sample_values) / (max_marker_size**2)
        },
        colors: yticks,
        type: "scatter"
      }
    ];

    // 2. Create the layout for the bubble chart.
    var bubbleLayout = {
      title: "Bacteria Cultures Per Sample",
      xaxis: {title:"OTU ID"}
    };
    
    // 3. Use Plotly to plot the data with the layout.
    Plotly.newPlot("bubble", bubbleData, bubbleLayout);







    // 1. Create a variable that filters the metadata array for the object with the desired sample number.
    var filteredMetadata = allMetadata.filter(element => (parseInt(element.id) == parseInt(sample)));
    

    // 2. Create a variable that holds the first sample in the metadata array.
    var firstMetadata = filteredMetadata[0];

    // Create variables that hold the otu_ids, otu_labels, and sample_values.


    // 3. Create a variable that holds the washing frequency.
      wfreq = firstMetadata.wfreq;
      d3.selectAll('#wfreqValue').html(wfreq);

        // 4. Create the trace for the gauge chart.
        var gaugeData = [
          {
            value: wfreq,
            title: { text: "<b>Belly Button Washing Frequency</b><br>Scrubs Per Week" },
            type: "indicator",
            mode: "gauge+number",
            gauge: {
              axis: {range: [null,10], tickwidth: 1, tickcolor: "red" },
              bar: {color: "black"},
              steps: [
                { range: [0, 2], color: "red" },
                { range: [2, 4], color: "orange" },
                { range: [4, 6], color: "yellow" },
                { range: [6, 8], color: "lightgreen" },
                { range: [8, 10], color: "green" }
              ],
            }
          }
        ];
        
        // 5. Create the layout for the gauge chart.
        var gaugeLayout = { width: 500, height: 500, margin: { t: 0, b: 0 } };
    
        // 6. Use Plotly to plot the gauge data and layout.
        Plotly.newPlot('gauge', gaugeData, gaugeLayout);

  });
}
