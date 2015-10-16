var Chart = {

    _getDomain: function(data, width) {
        return d3.scale.ordinal()
            .domain(data.map(function(item) {return item.label}).sort())
            .rangeRoundBands([0, width], 0.05);
    },

    _getCodomain: function(maxValue, height) {
      return  d3.scale.linear().range([height, 0])
          .domain([0, maxValue]);
    },

    _updateXAxis: function(chart, x) {
        var xAxis = d3.svg.axis()
            .scale(x)
            .orient('bottom');

        chart.select('.x-axis')
            .transition()
            .duration(500)
            .call(xAxis);
    },

    _updateYAxis: function(chart, y, maxValue) {
        var yAxis = d3.svg.axis()
            .scale(y)
            .orient('left')
            .ticks(maxValue)
            .tickFormat(d3.format('0f'));

        chart.select('.y-axis')
            .transition()
            .duration(500)
            .call(yAxis);
    },

    draw: draw = function(chartElement, data) {
        var maxValue = d3.max(data, function(item) {
            return item.value;
        });

        var y = this._getCodomain(maxValue, chartElement.innerHeight),
            x = this._getDomain(data, chartElement.innerWidth);

        this._updateXAxis(chartElement.chart, x);
        this._updateYAxis(chartElement.chart, y, maxValue);

        var barSelection = chartElement.chart.selectAll('.bar').data(data);

        barSelection.enter()
            .append('rect')
            .attr('class', 'bar')
            .attr('height', 0)
            .attr('y', chartElement.innerHeight)
            .append('svg:title');

        barSelection
            .transition()
            .duration(500)
            .attr('x',function(item, index) {
                return x(item.label);
            })
            .attr('y', function(item) {
                return y(item.value);
            })
            .attr('width', x.rangeBand())
            .attr('height', function(item) {
                return chartElement.innerHeight -  y(item.value);
            })
            .select('title')
            .text(function(item){
                return [item.label, item.value].join(':');
            });

        barSelection.exit()
            .transition()
            .duration(500)
            .attr('height', 0)
            .attr('y', chartElement.innerHeight)
            .remove();
        
    },

    createChartElement: function(width, height, margin) {
        margin = margin || {};
        ['top', 'right', 'bottom', 'left'].forEach(function(item) {
            if (!margin.hasOwnProperty(item)) {
                margin[item] = 0;
            }
        });

        var innerWidth = width - margin.left - margin.right,
            innerHeight = height - margin.top - margin.bottom;

        var chart =  d3.select('.chart-wrapper')
            .append('svg')
            .attr('class', 'chart')
            .attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom)
            .append('g')
            .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');

        chart.append('g')
            .attr('class', 'x-axis')
            .attr('transform', 'translate(0,' + innerHeight + ')');

        chart.append('g')
            .attr('class', 'y-axis')
            .attr('transform', 'rotate(0)');

        return {
            chart: chart,
            width: width,
            height: height,
            innerWidth: innerWidth,
            innerHeight: innerHeight
        };
    }
};