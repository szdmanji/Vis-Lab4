// Lab Four
d3.csv('wealth-health-2014.csv', d3.autoType).then(data=> { 
    console.log('countries', data);
    
    const margin = {top: 20, right: 20, botton: 20, left: 20};
    const width = 700;
    const height = 570;
    const innerWidth = width - margin.left - margin.right;
    const innerHeight = height - margin.top - margin.bottom;

    const svg = d3.select('.chart')
        .append('svg')
        .attr("width", width + margin.left + margin.right)
        .attr("height", height) //+ margin.top + margin.bottom)
        .append('g')
        .attr('transform','translate(' + margin.left + ',' + margin.top + ')');
        
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Income))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.LifeExpectancy))
        .range([height-40, 0]);    

    const xAxis = d3.axisBottom()
        .scale(xScale)
        .ticks(5, "s")

    const yAxis = d3.axisLeft()
        .scale(yScale)

    const colorScale = d3.scaleOrdinal(d3.schemeTableau10)
    
    const PopulationMin = d3.min(data, d=>d.Population), PopulationMax = d3.max(data, d=>d.Population);

    const PopulationScale = d3.scaleLinear()
        .domain([PopulationMin, PopulationMax])
        .range([5, 30]);

    svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .attr("transform", `translate(5, 530)`); 

    svg.append('g')
        .attr('class', 'axis y-axis')
        .call(yAxis)
        .attr("transform", `translate(5,0)`); 

    svg.selectAll('.chart')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', d=>colorScale(d.Region))
        .attr('opacity', 0.5)
        .attr('stroke', 'black')
        .attr("r", d=> PopulationScale(d.Population))
        .attr('cx', d=>xScale(d.Income))
        .attr('cy', d=>yScale(d.LifeExpectancy))
        .on("mouseenter", (event, d) => {
            const pos = d3.pointer(event, window);
            d3.select(".tooltip")
                // show the tooltip
                .style('display', 'block')
                .style("left", pos[0] + 10 + "px")
                .style("top", pos[1] + 10 + "px")
                .html(
                    "Country: " + d.Country + "<br>" +
                    "Region: " + d.Region + "<br>" +
                    "Population: " + d.Population + "<br>" +
                    "Income: " + d.Income + "<br>" +
                    "Life Expectancy: " + d.LifeExpectancy)
            })
        .on("mouseleave", (event, d) => {
            d3.select('.tooltip').style('display', 'none')
        })
        
        const legend = svg.selectAll("legend")
        .data(colorScale.domain())
        .enter()
        .append('rect')
        .attr('x', 500)
        .attr('y', (d,i) => i * 24 + 337)
        .attr("height", 15)
        .attr("width", 15)
        .attr('fill', d=>colorScale(d))
        .attr('stroke', d=>colorScale(d))

    svg.selectAll("labels")
        .data(colorScale.domain())
        .enter()
        .append('text')
        .attr('x', 525)
        .attr('y', (d,i) => i * 24 + 350)
        .text(function(d) { return d; })

    svg.append("text")
		.attr('x', 650)
        .attr('y', 525)
        .text("Income")
        
    svg.append("text")
		.attr('x', 0)
        .attr('y', 0)
        .text("Life Expectancy")
       


});