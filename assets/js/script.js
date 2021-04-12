var currentDate = moment().format("dddd, MMMM Do YYYY");
var tasks = {};
var currentTime = parseInt(moment().format("H"));
// Function to keep date correct
$("#currentDay").text(currentDate);

// checks current date and event times ever 30 minutes
function timeCheck() {
    setInterval(function () {
        auditTasksItem();
        $("#currentDay").text(currentDate);

    }, 500000);
};

// function to save tasks to local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    var objectInfo = tasks;

    // $(".event-section").each(function(i){
    //     var date = $(this).attr("id");

    for (const [key, value] of Object.entries(objectInfo)) {
        var taskEl = $("<span>").addClass("tast-text").text(value).attr("taskId", key);

        if (taskEl.attr("taskId") === $(".event-section").attr("id")) {
            $(taskEl).append(".event-section");
            console.log(taskEl.attr("taskId"));
            debugger;
        }

        console.log(taskEl.attr("taskId"));
    }

    // })
    // createTasks(task[i], task.);
    // if (!tasks) {
    //     tasks = {};
    // }

    // $.each(tasks, function (list, arr) {
    //     arr.forEach(function (task) {
    //         createTasks(task.text, task.time);
    //     })
    // })

};

var createTasks = function (taskText, taskTime) {
    var taskEl = $("<span>").addClass("tast-text").text(value).attr("taskId", key);

    console.log(taskEl.attr("taskId"));
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

// task div container was clicked
$(".event-section").on("click", function () {
    //  get current text of element
    var text = $(this)
        .text()
        .trim();


    // replace span element with a new textarea
    var textInput = $("<textarea>").addClass("textarea").attr("cols", "75").attr("rows", "1").val(text);

    $(".task-text").remove();

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
        .attr("id").replace("btn-", "");

    // update task in array and re-save
    tasks[status] = text;

    saveTasks();
    // recreate p
    var taskSpan = $("<span>")
        .addClass("task-text")
        .addClass(".event-section")
        .text(text);

    // replace textarea with new content
    $(".textarea").replaceWith(taskSpan);
});
timeCheck()
loadTasks();
auditTasksTime();