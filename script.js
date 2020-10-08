// Lab Four

var countries;

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=> { 
    console.log('countries', data);
    countries = data;
});
const width = 700;
const height = 550;

let margin = {top: 20, right: 10, botton: 20, left: 10};

const svg = d3.select('.chart')
    .append('svg')
    .attr('width', width)
    .attr('height', height)
    
const xScale = d3
    .scaleLinear()
    .domain()
    .range()