// Lab Four
d3.csv('wealth-health-2014.csv', d3.autoType).then(data=> { 
    console.log('countries', data);
    
    const margin = ({top: 20, right: 20, botton: 20, left: 20});
    const width = 650-margin.left-margin.right, height = 500-margin.top-margin.bottom;

    const svg = d3.select('.chart')
        .append('svg')
        .attr('width', width + margin.left + margin.right)
        .attr('height', height + margin.top + margin.bottom)
        .append('g')
        .attr('transform','translate('+margin.left+','+margin.top+')');
        
    const xScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.Income))
        .range([0, width]);

    const yScale = d3.scaleLinear()
        .domain(d3.extent(data, d=>d.LifeExpectancy))
        .range([height, 0]);    

    const xAxis = d3.axisBottom()
        .scale(xScale)

    svg.append('g')
        .attr('class', 'axis x-axis')
        .call(xAxis)
        .attr('transform', 'translate(0, ${height})')

    svg.selectAll('.income')
        .data(data)
        .enter()
        .append('circle')
        .attr('opacity', 0.8)
        .attr("r", 5)
        .attr('cx', d=>xScale(d.Income))
        .attr('cy', d=>yScale(d.LifeExpectancy));

});