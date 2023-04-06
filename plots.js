// to do: recode for less lines, standardize variables
// layout could be global except for price

// this section creates the first plot, 'plot'
// initial data load
let pickle = allyear_hosts;

// make the first trace
let trace1 = {
  x:pickle.map(row => row.Host_Since_Year),
  y:pickle.map(row => row.Id),
  type: "bar"
};

//put it in the right form as an array, can skip by making trace1 an array in and of itself
let traceData = [trace1];

// make our base layout with a title and centered via margins
let layout = {
  title: "Hosts Per Year All Cities",
  xaxis:{title:'Year',showticklabels:true,dtick:1},
  yaxis:{title:'Total Number of Hosts'},
  margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }
};

// plot it to the div 'plot'
Plotly.newPlot("plot", traceData, layout);

// this section is the first interactive graph
// this will build a chart that lets you see host numbers by city

// initial load for city level data
let city_host_data = city_data;

// define some variables to host each part of the array that corresponds to a city
let bangkok = Object.values(city_data.bangkok);
let hongkong = Object.values(city_data.hongkong);
let istanbul = Object.values(city_data.istanbul);
let london = Object.values(city_data.london);
let newyork = Object.values(city_data.newyork);
let paris = Object.values(city_data.paris);
let singapore = Object.values(city_data.singapore);



// make a function called init
// this loads the initial chart
// we define the data manually here and the layout as well
function init() {
  let data = [{
    x:bangkok.map(row => row.Host_Since_Year),
    y:bangkok.map(row => row.Id),
    type: "bar"
  }];

  let layout2 = {
    title: "Hosts Signed Up by Year (Bangkok)",
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Total Number of Hosts'},
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }};

  Plotly.newPlot("plot2", data, layout2);
};


// Now we're looking to update the chart when someone changes the city in the dropdown
// On change to the DOM, call getData()
d3.selectAll("#selDataset").on("change", getData);

//this function will run based on the above action
function getData() {
  let dropdownMenu = d3.select("#selDataset");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");


  // big if block here
  // acts like a switch statement so if the dropdown = something
  // use that something to make the data (the trace)
  // easiest way but least efficient is to just recreate the plot
  if (dataset == 'Bangkok') {
    data = [{
      x:bangkok.map(row => row.Host_Since_Year),
      y:bangkok.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'Hong Kong') {
    data = [{
      x:hongkong.map(row => row.Host_Since_Year),
      y:hongkong.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'Istanbul') {
    data = [{
      x:istanbul.map(row => row.Host_Since_Year),
      y:istanbul.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'London') {
    data = [{
      x:london.map(row => row.Host_Since_Year),
      y:london.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'New York City') {
    data = [{
      x:newyork.map(row => row.Host_Since_Year),
      y:newyork.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'Paris') {
    data = [{
      x:paris.map(row => row.Host_Since_Year),
      y:paris.map(row => row.Id),
      type: "bar"}];
  }
  else if (dataset == 'Singapore') {
    data = [{
      x:singapore.map(row => row.Host_Since_Year),
      y:singapore.map(row => row.Id),
      type: "bar"}];
  }
// Call function to update the chart
  updatePlotly(data,`Hosts Signed Up by Year (${dataset})`);
};

// we define our update here which just creates a new plot
// i think a more efficient way could be find to update instead of replace? 
// not sure how much time that would save. 
function updatePlotly(newdata,some_title) {
  let layout = {
    title: some_title,
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Total Number of Hosts'},
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("plot2", newdata, layout);
};




// this section is the second interactive graph
// this will build a chart that lets you see host/superhost numbers by city

// initial load for city level data
let superhost_city = super_year_data;

// define some variables to host each part of the array that corresponds to a city
let sy_bangkok = Object.values(super_year_data.bangkok);
let sy_hongkong = Object.values(super_year_data.hongkong);
let sy_istanbul = Object.values(super_year_data.istanbul);
let sy_london = Object.values(super_year_data.london);
let sy_newyork = Object.values(super_year_data.newyork);
let sy_paris = Object.values(super_year_data.paris);
let sy_singapore = Object.values(super_year_data.singapore);

// make a function called plot3init
// this loads the initial chart
// we define the data manually here and the layout as well
function plot3init() {
  let data = [{
    x:sy_bangkok.map(row => row.Host_Since_Year),
    y:sy_bangkok.map(row => row.Id),
    type: "bar",
    transforms: [{
      type: 'groupby',
      groups: sy_bangkok.map(row => row.Superhost),
    }]
  }];

  let layout2 = {
    title: "Superhosts by City and by Year (Bangkok)",
    barmode: 'group',
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Total Number of Hosts'},
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }};

  Plotly.newPlot("plot3", data, layout2);
};

// Now we're looking to update the chart when someone changes the city in the dropdown
// On change to the DOM, call getData2()
d3.selectAll("#selDataset2").on("change", getData2);

//this function will run based on the above action
function getData2() {
  let dropdownMenu = d3.select("#selDataset2");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");


  // big if block here
  // acts like a switch statement so if the dropdown = something
  // use that something to make the data (the trace)
  // easiest way but least efficient is to just recreate the plot
  if (dataset == 'Bangkok') {
    data = [{
      x:sy_bangkok.map(row => row.Host_Since_Year),
      y:sy_bangkok.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_bangkok.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Hong Kong') {
    data = [{
      x:sy_hongkong.map(row => row.Host_Since_Year),
      y:sy_hongkong.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_hongkong.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Istanbul') {
    data = [{
      x:sy_istanbul.map(row => row.Host_Since_Year),
      y:sy_istanbul.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_istanbul.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'London') {
    data = [{
      x:sy_london.map(row => row.Host_Since_Year),
      y:sy_london.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_london.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'New York City') {
    data = [{
      x:sy_newyork.map(row => row.Host_Since_Year),
      y:sy_newyork.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_newyork.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Paris') {
    data = [{
      x:sy_paris.map(row => row.Host_Since_Year),
      y:sy_paris.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_paris.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Singapore') {
    data = [{
      x:sy_singapore.map(row => row.Host_Since_Year),
      y:sy_singapore.map(row => row.Id),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: sy_singapore.map(row => row.Superhost),
        }]
    }];
  }
// Call function to update the chart
  updatePlotly2(data,`Superhosts by City and by Year (${dataset})`);
};

function updatePlotly2(newdata,some_title) {
  let layout2 = {
    title: some_title,
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Total Number of Hosts'},
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("plot3", newdata, layout2);
};

// this section is the second interactive graph
// this will build a chart that lets you see host/superhost numbers by city

// initial load for city level data
let superhost_cost_city = super_cost_data;

// define some variables to host each part of the array that corresponds to a city
let syc_bangkok = Object.values(super_cost_data.bangkok);
let syc_hongkong = Object.values(super_cost_data.hongkong);
let syc_istanbul = Object.values(super_cost_data.istanbul);
let syc_london = Object.values(super_cost_data.london);
let syc_newyork = Object.values(super_cost_data.newyork);
let syc_paris = Object.values(super_cost_data.paris);
let syc_singapore = Object.values(super_cost_data.singapore);

// make a function called plot3init
// this loads the initial chart
// we define the data manually here and the layout as well
function plot4init() {
  let data = [{
    x:syc_bangkok.map(row => row.Host_Since_Year),
    y:syc_bangkok.map(row => Math.round(row.Price_USD)),
    type: "bar",
    transforms: [{
      type: 'groupby',
      groups: syc_bangkok.map(row => row.Superhost),
    }]
  }];

  let layout4 = {
    title: "Superhosts Price by City and by Year (Bangkok)",
    barmode: 'group',
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Avg Price'},
    margin: {
    l: 100,
    r: 100,
    t: 100,
    b: 100
  }};

  Plotly.newPlot("plot4", data, layout4);
};

// Now we're looking to update the chart when someone changes the city in the dropdown
// On change to the DOM, call getData3()
d3.selectAll("#selDataset3").on("change", getData3);

//this function will run based on the above action
function getData3() {
  let dropdownMenu = d3.select("#selDataset3");
  // Assign the value of the dropdown menu option to a variable
  let dataset = dropdownMenu.property("value");


  // big if block here
  // acts like a switch statement so if the dropdown = something
  // use that something to make the data (the trace)
  // easiest way but least efficient is to just recreate the plot
  if (dataset == 'Bangkok') {
    data = [{
      x:syc_bangkok.map(row => row.Host_Since_Year),
      y:syc_bangkok.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_bangkok.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Hong Kong') {
    data = [{
      x:syc_hongkong.map(row => row.Host_Since_Year),
      y:syc_hongkong.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_hongkong.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Istanbul') {
    data = [{
      x:syc_istanbul.map(row => row.Host_Since_Year),
      y:syc_istanbul.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_istanbul.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'London') {
    data = [{
      x:syc_london.map(row => row.Host_Since_Year),
      y:syc_london.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_london.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'New York City') {
    data = [{
      x:syc_newyork.map(row => row.Host_Since_Year),
      y:syc_newyork.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{  
        type: 'groupby',
        groups: syc_newyork.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Paris') {
    data = [{
      x:syc_paris.map(row => row.Host_Since_Year),
      y:syc_paris.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_paris.map(row => row.Superhost),
        }]
    }];
  }

  else if (dataset == 'Singapore') {
    data = [{
      x:syc_singapore.map(row => row.Host_Since_Year),
      y:syc_singapore.map(row => Math.round(row.Price_USD)),
      type: "bar",
      transforms: [{
        type: 'groupby',
        groups: syc_singapore.map(row => row.Superhost),
        }]
    }];
  }
// Call function to update the chart
  updatePlotly3(data,`Superhosts Price by City and by Year (${dataset})`);
};

function updatePlotly3(newdata,some_title) {
  let layout4 = {
    title: some_title,
    xaxis:{title:'Year',showticklabels:true,dtick:1},
    yaxis:{title:'Avg Price'},
    margin: {
      l: 100,
      r: 100,
      t: 100,
      b: 100
    }
  };
  Plotly.newPlot("plot4", newdata, layout4);
};

init();
plot3init();
plot4init();

