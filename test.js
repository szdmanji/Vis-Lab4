

d3.csv('wealth-health-2014.csv', d3.autoType).then(data=> { 
    console.log('countries', data);

    
    const margin = {top: 20, right: 10, bottom: 20, left: 10};
    const width = 400-margin.left-margin.right;
    const height = 300-margin.top-margin.bottom;

    const svg = d3.select('.chart').append('svg')
        .attr('width', width+ margin.left+ margin.right)
        .attr('height', height+ margin.top+ margin.bottom)
        .append('g')
        .attr('transform','translate('+margin.left+','+margin.right+')')

    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Income))
        .range([0, width]);

    const colorScale = d3.scaleSequential(d3.interpolateBlues)
        .domain(d3.extent(data, d=>d.Income));

    const xAxis = d3.axisBottom(xScale)
        .ticks(5,'s');
    
    const 

    svg.append('g')
        .call(xAxis)
    svg.selectAll('.income')
        .data(data)
        .enter()
        .append('circle')
        .attr('fill', d=>colorScale(d.Income))
        .attr('class', 'income')
        .attr('stroke', 'black')
        .attr('opacity', 0.8)
        .attr('r', 5)
        .attr('cx', d=>xScale(d.Income))
        .attr('cx', d=>xScale(d.Income));

    
});

