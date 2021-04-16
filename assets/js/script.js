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

// var containerCycle = function (task) {
//    $(".event-section").each(function () {
//         containerId = $(".event-section");
//         for (var i = 0; i < containerId.length; i++){

//         }
// //         if (task === containerId) {

// //             container.append(task[i].value);
// //             console.log(task.attr("taskId"));
// //             debugger;
// //         }
//         console.log($(containerId));

// //         console.log("didn't work")
//     })

// };

var loadTasks = function () {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    if (!tasks) {
        tasks = {};
    }
    
    var objectInfo = Object.keys(tasks);
    var objectInfoLength = objectInfo.length;
    console.log(objectInfo);
    const textContainer = document.querySelectorAll(".event-section");
    // textContainer.forEach(function () {

    for(var i = 0; i < textContainer.length; i++){
        
        id = false;
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
    
//         var k = 0;
//  var t=9;
//    var divLoop = function(){
//         for (var i = 0; i < 9; i++) {
//         var text = tasks[t];
//         if (textContainer[i].attributes[1].value === objectInfo[k]) {
//             var spanText = $(textContainer).children("span")
//             var taskSpan = $("<span>")
//             .addClass("task-text")
//             .addClass(".event-section")
//             .attr("taskId", status)
//             .text(text);
//         $("task-text").innerHTML = "<span>" + text + "</span>";
//         // replace textarea with new content
//         $(spanText[i]).replaceWith(taskSpan);
            
            



//             console.log(typeof textContainer);
//             console.log(typeof objectInfo);
           
//         } else{
//             continue;
//         }
       
        

//     }
// }

// t++;
// k++;
// debugger;
// divLoop()

    // })




    // for (const [key, value] of Object.entries(objectInfo)) {
    //     var taskEl = $("<span>").addClass("test-text").val(value).attr("taskId", key);



    //     if (key === textContainer[i].id) {

    //     //     container.append(taskEl[i].value);
    //     //     console.log(taskEl.attr("taskId"));
    //     console.log("it worked")

    //     }else{

    //     console.log(taskEl.attr("taskId"));
    //     console.log("it didn't work");
    //     }


    // }

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

// var createTasks = function (taskText, taskTime) {
//     var taskEl = $("<span>").addClass("tast-text").text(value).attr("taskId", key);

//     console.log(taskEl.attr("taskId"));
// };

// function to check tasks against current time
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

    // $(targetEl).replaceWith(textInput);

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
    // recreate p
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
// containerCycle();
loadTasks();
auditTasksTime();