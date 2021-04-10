var currentDate = moment().format("dddd, MMMM Do YYYY");
var taskSection
var tasks = {};
var currentTime = parseInt(moment().format("h"));

// Function to keep date correct
$("#currentDay").text(currentDate);

// checks current date and event times ever 30 minutes
setInterval(function () {

    $("#currentDay").text(currentDate);
    $(".row").attr("id").each(function () {
        auditTasks($(this));
    })

}, 1800000);

// function to save tasks to local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// function to check tasks against current time
var auditTasks = function () {
    // get date from the task element
    var date = $(".row")
        .attr("id")

    // remove old classes from element
    $(".event-secion").removeClass("past present future");

    if (date === currentTime) {
        $(".event-section").addClass("present");
    }
    else if (date < currentTime) {
        $(".event-section").addClass("past");
    }
    else if (date > currentTime) {
        $(".event-section").addClass("future");
    }
};
auditTasks();

// task text was clicked
$(".event-section").on("click","span", function () {
    //  get current text of span element
    var text = $(this)
        .text()
        .trim();

    // replace span element with a new textarea
    var textInput = $("<textarea>").addClass("textarea").attr("cols", "75").val(text);
    $(this).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");
    console.log(text);
    debugger
});

// save button was clicked
$(".saveBtn").on("click", function () {
    // get current value of text area
    var text = $("textarea").val();

    // get position in calander
    var status = $(this)
        .closest(".row")
        .attr("id")

    // update task in array and re-save
    tasks[status] = text;

    // recreate span
    var taskSpan = $("<span>")
        .addClass("task-text")
        .text(text);

    // replace textarea with new content
    $(".textarea").replaceWith(taskSpan);
})
console.log(tasks);
