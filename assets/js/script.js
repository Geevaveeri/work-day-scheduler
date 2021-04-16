var currentDate = moment().format("dddd, MMMM Do YYYY");
var tasks = {};
var currentTime = parseInt(moment().format("H"));
// Function to keep date correct
$("#currentDay").text(currentDate);

// checks current date and event times ever 30 minutes
function timeCheck() {
    setInterval(function () {
        auditTasksTime();
        $("#currentDay").text(currentDate);

    }, 500000);
};

// function to save tasks to local storage
var saveTasks = function () {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// function that replaces tasks in correct time slot after refresh
var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = {};
    }
    
    var objectInfo = Object.keys(tasks);
    console.log(objectInfo);
    const textContainer = document.querySelectorAll(".event-section");

    for(var i = 0; i < textContainer.length; i++){
        
        
        for(const [key, value] of Object.entries(tasks)){
            if (key === textContainer[i].attributes[1].value){
                text = value;
                var spanText = $(textContainer).children("span")
                            var taskSpan = $("<span>")
                            .addClass("task-text")
                            .addClass(".event-section")
                            .attr("taskId", status)
                            .text(text);
                        $("task-text").value =  text ;
                        // replace textarea with new content
                        $(spanText[i]).append(taskSpan);
                        
                        
            }
        }
      
    }


};

var auditTasksTime = function () {

    $(".event-section").each(function (i) {
        var date = $(this).attr("id");


        // remove old classes from element
        $(".event-secion").removeClass("past present future");

        if (date === currentTime) {
            // remove old classes from element
            $(".event-secion").removeClass("past present future");
            $(this).addClass("present");
        }
        else if (date < currentTime) {
            // remove old classes from element
            $(".event-secion").removeClass("past present future");
            $(this).addClass("past");
        }
        else if (date > currentTime) {
            // remove old classes from element
            $(".event-secion").removeClass("past present future");
            $(this).addClass("future");
        }

    })

};

// task div container was clicked
$(".event-section").on("click", function (event) {
    var textSpan = $(this).children("span");

    //  get current text of element
    var text = textSpan
        .text()
        .trim();


    // replace span element with a new textarea
    var textInput = $("<textarea>").addClass("textarea").attr("cols", "75").attr("rows", "1").val(text);


    $(textSpan).replaceWith(textInput);

    // auto focus new element
    textInput.trigger("focus");


});

// save button was clicked
$(".saveBtn").on("click", function () {
    // get current value of text area
    var text = $("textarea").val();

    // get position in calander
    var status = $(this)

        .attr("id").replace("btn-", "");

    // update task in array and re-save
    tasks[status] = text;

    saveTasks();
    // recreate span
    var taskSpan = $("<span>")
        .addClass("task-text")
        .addClass(".event-section")
        .attr("taskId", status)
        .text(text);
    $("task-text").innerHTML = "<span>" + text + "</span>";
    // replace textarea with new content
    $(".textarea").replaceWith(taskSpan);

});

$(".event-section").focusout( function () {
    // get current value of text area
    var text = $("textarea").val();

    // get position in calander
    var status = $(this)

        .attr("id").replace("btn-", "");

    // update task in array and re-save
    tasks[status] = text;

    saveTasks();
    // recreate span
    var taskSpan = $("<span>")
        .addClass("task-text")
        .addClass(".event-section")
        .attr("taskId", status)
        .text(text);
    $("task-text").innerHTML = "<span>" + text + "</span>";
    // replace textarea with new content
    $(".textarea").replaceWith(taskSpan);

});

timeCheck();
loadTasks();
auditTasksTime();