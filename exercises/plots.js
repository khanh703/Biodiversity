

var Drinks = ["nonalcoholic beer", "nonalcoholic wine", "nonalcoholic martini", "nonalcoholic margarita", "ice tea", "nonalcoholic rum & coke", "nonalcoholic mai tai", "nonalcoholic gin & tonic"];
var PerDrinks = [22.7, 17.1, 9.9, 8.7, 7.2, 6.1, 6.0, 4.6]



// Create the Trace
var trace = {
  x: Drinks,
  y: PerDrinks,
  type: "bar"
};

var data = [trace];

var layout = {
  title: "Drink Chart",
  xaxis: {title: "Drinks"},
  yaxis: {title: "Percent Drinks Ordered"}
};
Plotly.newPlot("bar-plot", data, layout);



var pieTrace = {
  labels: Drinks,
  values: PerDrinks,
  type: 'pie'
};

var pieData = [pieTrace];

var pieLayout = {
  title: "'Pie' Chart",
};
Plotly.newPlot("pie-plot", pieData, pieLayout);



var scatterTrace = {
  x: Drinks,
  y: PerDrinks,
  mode: 'markers',
  type: 'scatter'
};

var scatterData = [scatterTrace];

var scatterLayout = {
  title: "'Scatter' Chart",
};
Plotly.newPlot("scatter-plot", scatterData, scatterLayout);


var numbers = [0,2,4,6,8];
var addFive = numbers.map(function(num){
    return num + 5;
});
console.log(addFive);

var words = ['one', 'two', 'three', 'four'];
var upperCased = words.map((str)=>{
    return str.toUpperCase()
});
console.log(upperCased);




// 12.2.1
var cities = [
  {
    "Rank": 1,
    "City": "San Antonio ",
    "State": "Texas",
    "Increase_from_2016": "24208",
    "population": "1511946"
  },
  {
    "Rank": 2,
    "City": "Phoenix ",
    "State": "Arizona",
    "Increase_from_2016": "24036",
    "population": "1626078"
  },
  {
    "Rank": 3,
    "City": "Dallas",
    "State": "Texas",
    "Increase_from_2016": "18935",
    "population": "1341075"
  }
];

var cityNames = cities.map((city)=>{
  return city.population;
});
console.log(cityNames);


// Filters
var numbers = [1,2,3,4,5];

var larger = numbers.filter(function(num){
    return num > 1;
});

console.log(larger);




var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
var sWords = words.filter((word)=>{
  return word[0].toLowerCase()=='s'
})
console.log('Words that begin with an "S" are ' + sWords)

// Sorting
var familyAge = [3,2,39,37,9];
var sortedAge = familyAge.sort((a,b) => a - b);
console.log(sortedAge);


// To slice to the end of an array, you can omit the second argument:
var words = ['seal', 'dog', 'scorpion', 'orangutan', 'salamander'];
words.slice(3, );









// ===========================================================================
// ===========================================================================
// 04-Stu_Filter_Warmup
// ===========================================================================



// Filter the top 15 cities with a population increase greater than 15,000
//  and then graph each city on the x-axis and the respective population on the y-axis.
console.log('top15Cities', top15Cities)
// 1. Create a custom filtering function that returns
//  the cities with a population increase greater than 15,000.
function filterCities(city)
{
  return city.Increase_from_2016 > 15000
}


// 2. Use filter() to pass the function as its argument
var filteredCities = top15Cities.filter(filterCities)

// Check to make sure you filtered your cities correctly
// HINT: console.log() is your friend.


// 3. Use the map method with the arrow function to return all the filtered cities' names.
var filteredCityNames = filteredCities.map(city=>{
    return city.City
})

//  Check your filtered cities
console.log('filteredCities', filteredCities)
console.log('filteredCityNames', filteredCityNames)

// 4. Use the map method with the arrow function to return all the filtered cities' populations.
var filteredCityPopulation = filteredCities.map(city=> city.population )

//  Check the populations of your filtered cities
console.log('filteredCityPopulation', filteredCityPopulation)

// 5. Create your trace.
var trace = {
    x: filteredCityNames,
    y: filteredCityPopulation,
    type: "bar"
}

// 6. Create the data array for our plot
var data = [trace];

// 7. Define our plot layout
var layout = {
    title: "Cities added population > 15,000",
    xaxis: { title : "Cities"},
    yaxis: { title : "Population"}
}

// 8. Plot the chart to a div tag with id "bar-plot"
Plotly.newPlot("bar-plot", data, layout)