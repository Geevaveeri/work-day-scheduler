var currentDate = moment().format("dddd, MMMM Do YYYY");
var tasks = {};
var currentTime = parseInt(moment().format("H"));

// Function to keep date correct
$("#currentDay").text(currentDate);

// checks current date and event times ever 30 minutes
setInterval(function () {
    auditTasksItem();
    $("#currentDay").text(currentDate);

}, 500000);

// function to save tasks to local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));

    if (!tasks) {
        tasks = {};
    }

    $.each(tasks, function(list, arr){
        arr.forEach(function(task){
            createTasks(task.text, task.time);
        })
    })

};

var createTasks = function(taskText, taskTime){
    var taskEl = $("<span>").addClass("tast-text").text(taskText);

    $("#" + taskTime).append(taskEl);
};

// function to check tasks against current time
var auditTasksTime = function () {

    $(".event-section").each(function (i) {
        var date = $(this).attr("id");


        // remove old classes from element
        $(".event-secion").removeClass("past present future");

        if (date === currentTime) {
            $(this).addClass("present");
        }
        else if (date < currentTime) {
            $(this).addClass("past");
        }
        else if (date > currentTime) {
            $(this).addClass("future");
        }

    })

};

// task text was clicked
$(".event-section").on("click", function () {
    //  get current text of element
    var text = $(this)
        .text()
        .trim();


    // replace span element with a new textarea
    var textInput = $("<textarea>").addClass("textarea").attr("cols", "75").attr("rows", "1").val(text);

    $(this).append(textInput);

    // auto focus new element
    textInput.trigger("focus");

});

// save button was clicked
$(".saveBtn").on("click", function () {
    // get current value of text area
    var text = $("textarea").val();

    // get position in calander
    var status = $(this)
        // .closest(".event-section")
        .attr("id")

    // update task in array and re-save
    tasks[status] = text;

    saveTasks();
    // recreate p
    var taskSpan = $("<span>")
        .addClass("task-text")
        .text(text);

    // replace textarea with new content
    $(".textarea").replaceWith(taskSpan);
});

// loadTasks();
auditTasksTime();
console.log(tasks);