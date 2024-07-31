// displaying calendar
$(document).ready(function() {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function generateCalendar(month, year , index) {
        const daysInMonth = new Date(year, month+1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const calendar = $('#calendar'+index);
        calendar.empty();

        const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        for (let i = 0; i < daysOfWeek.length; i++) {
            calendar.append('<div class="calendar-header">' + daysOfWeek[i] + '</div>');
        }

        for (let i = 0; i < firstDay; i++) {
            calendar.append('<div class="calendar-day-empty"></div>');
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = pad(i);
            const date = `${year}-${pad(month+1)}-${day}`;
            let action = "show_tasks_in_date('"+date+"')"
            const dayElement = $('<div class="calendar-day" role="button" onclick="'+action+'">' + i + ' <div class="task-day">4</div></div>');
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayElement.addClass('today');
            }else{
                  // the days that have task wil be highlight
                if( date in tasksByDate){
                dayElement.addClass('highlight');
            }
            }
          
            calendar.append(dayElement);
        }
    }

    function showNextMonth() {
        if (currentMonth === 11) {
            currentMonth = 0;
            currentYear++;
        } else {
            currentMonth++;
        }
        if (currentMonth===11) {
            nextMonth=0
        }else{
            nextMonth=currentMonth+1
        }
        generateCalendar(currentMonth, currentYear , 1);
        generateCalendar(nextMonth, currentYear , 2);
        $('#currentMonth').text(months[currentMonth] + " " + currentYear);
        $('#nextMonth').text(months[nextMonth] + " " + currentYear);
    }

    function showPrevMonth() {
        if (currentMonth === 0) {
            currentMonth = 11;
            currentYear--;
        } else {
            currentMonth--;
        }
        if (currentMonth===11) {
            nextMonth=0
        }else{
            nextMonth=currentMonth+1
        }
        
        generateCalendar(currentMonth, currentYear , 1);
        generateCalendar(nextMonth, currentYear , 2);
        $('#currentMonth').text(months[currentMonth] + " " + currentYear);
        $('#nextMonth').text(months[nextMonth] + " " + currentYear);
    }

    $('#nextMonthbtn').click(showNextMonth);
    $('#prevMonthbtn').click(showPrevMonth);


    if (currentMonth===11) {
    nextMonth=0
    }else{
    nextMonth=currentMonth+1
    }

    generateCalendar(currentMonth, currentYear , 1);
    generateCalendar(nextMonth, currentYear , 2);
    
    $('#currentMonth').text(months[currentMonth] + " " + currentYear);
    $('#nextMonth').text(months[nextMonth] + " " + currentYear);
});

// add task 
$("#alert_add_task").click(function (e) {
    swal({
    title: "Input Something",
    html: '<br><input class="form-control" placeholder="Input Something" id="input-field">',
    content: {
        element: "input",
        attributes: {
        placeholder: "Input Something",
        type: "text",
        id: "input-field",
        className: "form-control",
        },
    },
    buttons: {
        cancel: {
        visible: true,
        className: "btn btn-danger",
        },
        confirm: {
        className: "btn btn-success",
        },
    },
    }).then( function () {
    swal("", "You entered : " + $("#input-field").val(), "success")
    });
})

function pad(number) {
    return number < 10 ? '0' + number : number;
}

const tasksByDate = {
    "2024-07-31": ["Task 1", "Task 2", "Task 3"],
    "2024-08-01": ["Task A", "Task B"],
    "2024-08-05": ["Task A"],
    "2024-08-10": ["Task 1", "Task 2", "Task 3"],
    "2024-08-15": ["Task A", "Task B"],
    "2024-08-22": ["Task x", "Task y" , "Task 3" ,"Task 4"],
  };
  


function show_tasks_in_date(date) {
    tasksListElement=$("#tasks")
    tasksListElement.html("");

    // Check if the date exists in the tasksByDate object
    if (date in tasksByDate) {
    const tasks = tasksByDate[date];

    tasks.forEach(element => {
        const task = "<h6>" + element + "</h6>";
        tasksListElement.append(task);
    });
    } else {
        // Optionally, handle the case when no tasks are found for the given date
        tasksListElement.append("<p>No tasks for this date.</p>");
    }
}
    