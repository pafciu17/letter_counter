var init = function() {
    var text = document.getElementById('text_input').textContent,
        margin = {top: 20, right: 20, bottom: 20, left: 40};
        data = Data.getLetterDistribution(text),
        chartElement = Chart.createChartElement(window.innerWidth, 400, margin);

    Chart.draw(chartElement, data);

    var inputCallback = Utils.debounce(function(event) {
        data = Data.getLetterDistribution(event.target.value);
        Chart.draw(chartElement, data);
    }, 500);

    document.getElementById('text_input').addEventListener('keyup', inputCallback);
};

window.addEventListener('load', init);