var currentDate = moment().format("dddd, MMMM Do YYYY");

$("#currentDay").text(currentDate);

setInterval(function () {

    $("#currentDay").text(currentDate);

}, 1800000);

console.log(currentDate);