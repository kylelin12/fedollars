var eightyThree = [542, 392, 69.5, 66.3, 56.9];
var zeroZero = [1230, 801, 254, 84.5, 113];
var dataMeaning = ["Individual Income Taxes", "Payroll Taxes", "Corporate Income Taxes", "Excise Taxes", "Other Taxes"];

var chart = d3.select(".chart");
var bar = chart.selectAll("div");

var barUpdate, barEnter, dataNow;

barUpdate = bar.data(eightyThree);
dataNow = 0;
barEnter = barUpdate.enter().append("div");

var dataSources = ["http://federal-budget.insidegov.com/l/86/1983", "http://federal-budget.insidegov.com/l/103/2000"];

var changeData = function () {
    switch(dataNow) {
        case 0:
            barEnter.data(zeroZero);
            dataNow = 1;
            updateBars();
            break;
        case 1:
            barEnter.data(eightyThree);
            dataNow = 0;
            updateBars();
            break;
    }
};

var aniTrans = function () {
    switch (dataNow) {
        case 0:
            barEnter.transition().duration(function (d) {
                return d * 2;
            }).style("width", function (d) {
                return d * 3 + "px";
            });
            break;
        case 1:
            barEnter.transition().duration(function (d) {
                return d * 2;
            }).style("width", function (d) {
                return d * 1.45 + "px";
            });
            break;
    }
};


var addText = function () {
    barEnter.html(function (d, f) {
        return dataMeaning[f] + "<br>" + d + " Billion USD";
    });
};

var changeYear = function () {
    var curYear = document.getElementById("curYear");
    var curYearSource = d3.select("#dataSource");
    switch (dataNow) {
        case 0:
            curYear.innerHTML = "Federal Revenue - 1983";
            curYearSource.html("Data Source of 1983 Federal Revenue");
            curYearSource.attr("href", dataSources[0]);
            break;
        case 1:
            curYear.innerHTML = "Federal Revenue - 2000 (Scale adjusted to fit on maximized page)";
            curYearSource.html("Data Source of 2000 Federal Revenue");
            curYearSource.attr("href", dataSources[1]);
            break;
    }
};

var updateBars = function () {
    aniTrans();
    addText();
    changeYear();
};

var changeYearButton = document.getElementById("toggleBtn");

changeYearButton.addEventListener("click", changeData);

updateBars();