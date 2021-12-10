console.log(cityGrowths);
var sortedCities = cityGrowths.sort((a,b) =>
a.Increase_from_2016 - b.Increase_from_2016).reverse(); 

var topFiveCities = sortedCities.slice(0,5)
console.log(topFiveCities)

var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));

console.log('topFiveCityNames', topFiveCityNames)
console.log('topFiveCityGrowths', topFiveCityGrowths)

var trace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
var data = [trace];
var layout = {
    title: "Most Rapidly Growing Cities",
    xaxis: {title: "City" },
    yaxis: {title: "Population Growth, 2016-2017"}
  };
  Plotly.newPlot("bar-plot", data, layout);




// Skill drill
var sortedCities = cityGrowths.sort((a,b) =>
a.population - b.population).reverse(); 

var topFiveCities = sortedCities.slice(0,7)
console.log(topFiveCities)

var topFiveCityNames = topFiveCities.map(city => city.City);
var topFiveCityGrowths = topFiveCities.map(city => parseInt(city.Increase_from_2016));
var popTrace = {
    x: topFiveCityNames,
    y: topFiveCityGrowths,
    type: "bar"
  };
var populationData = [popTrace];
var layout = {
    title: "Cities by Population",
    xaxis: {title: "City" },
    yaxis: {title: "Population, 2016-2017"}
  };
  Plotly.newPlot("population-plot", populationData, layout);
  