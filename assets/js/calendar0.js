// displaying calendar
$(document).ready(function () {
    let today = new Date();
    let currentMonth = today.getMonth();
    let currentYear = today.getFullYear();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    function generateCalendar(month, year, index) {
        const daysInMonth = new Date(year, month + 1, 0).getDate();
        const firstDay = new Date(year, month, 1).getDay();
        const calendar = $('#calendar' + index);
        calendar.empty();

        if (index == 1) {
            const daysOfWeek = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
            for (let i = 0; i < daysOfWeek.length; i++) {
                calendar.append('<div class="calendar-header">' + daysOfWeek[i] + '</div>');
            }
        }

        for (let i = 0; i < firstDay; i++) {
            calendar.append('<div class="calendar-day-empty"></div>');
        }

        for (let i = 1; i <= daysInMonth; i++) {
            const day = pad(i);
            const date = `${year}-${pad(month + 1)}-${day}`;
            let action = "show_tasks_in_date('" + date + "')"
            const dayElement = $('<div class="calendar-day" role="button" onclick="' + action + '">' + i + ' <div class="task-day">4</div></div>');
            if (year === today.getFullYear() && month === today.getMonth() && i === today.getDate()) {
                dayElement.addClass('today');
            } else {
                // the days that have task wil be highlight
                if (date in tasksByDate) {
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
        if (currentMonth === 11) {
            nextMonth = 0
        } else {
            nextMonth = currentMonth + 1
        }
        generateCalendar(currentMonth, currentYear, 1);
        generateCalendar(nextMonth, currentYear, 2);
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
        if (currentMonth === 11) {
            nextMonth = 0
        } else {
            nextMonth = currentMonth + 1
        }

        generateCalendar(currentMonth, currentYear, 1);
        generateCalendar(nextMonth, currentYear, 2);
        $('#currentMonth').text(months[currentMonth] + " " + currentYear);
        $('#nextMonth').text(months[nextMonth] + " " + currentYear);
    }

    $('#nextMonthbtn').click(showNextMonth);
    $('#prevMonthbtn').click(showPrevMonth);

    $('#nextMonthbtn2').click(showNextMonth);
    $('#prevMonthbtn2').click(showPrevMonth);


    if (currentMonth === 11) {
        nextMonth = 0
    } else {
        nextMonth = currentMonth + 1
    }

    generateCalendar(currentMonth, currentYear, 1);
    generateCalendar(nextMonth, currentYear, 2);

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
    }).then(function () {
        swal("", "You entered : " + $("#input-field").val(), "success")
    });
})

function pad(number) {
    return number < 10 ? '0' + number : number;
}

const tasksByDate = {
    "2024-07-31": [
        { task: "Task 1", time: "10:00 AM" },
        { task: "Task 2", time: "11:30 AM" },
        { task: "Task 3", time: "2:00 PM" }
    ],
    "2024-08-01": [
        { task: "Task A", time: "9:00 AM" },
        { task: "Task B", time: "1:00 PM" }
    ],
    "2024-08-05": [
        { task: "Task A", time: "10:30 AM" }
    ],
    "2024-08-10": [
        { task: "Task 1", time: "3:00 PM" },
        { task: "Task 2", time: "4:30 PM" },
        { task: "Task 3", time: "6:00 PM" }
    ],
    "2024-08-15": [
        { task: "Task A", time: "11:00 AM" },
        { task: "Task B", time: "2:00 PM" }
    ],
    "2024-08-22": [
        { task: "Task x", time: "10:00 AM" },
        { task: "Task y", time: "1:30 PM" },
        { task: "Task 3", time: "4:00 PM" },
        { task: "Task 4", time: "6:30 PM" }
    ]
};

function show_tasks_in_date(date) {
    const tasksListElement = $("#tasks");
    tasksListElement.html("");

    if (date in tasksByDate) {
        const tasks = tasksByDate[date];

        const eventDate = new Date(date);
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayName = dayNames[eventDate.getDay()];
        const formattedDate = `${dayName} ${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' })} ${eventDate.getFullYear()}`;

        const todayDate = `
            <div class="today-date">
                <div class="event-day">${dayName}</div>
                <div class="event-date">${formattedDate}</div>
            </div>
        `;
        tasksListElement.append(todayDate);

        tasks.forEach((taskObj, index) => {
            const accordionId = `accordion-${index + 1}`;
            const headingId = `heading${index + 1}`;
            
            const event = `
                <div class="accordion" id="${accordionId}">
                    <div class="accordion-item">
                        <h2 class="accordion-header" id="${headingId}">
                            <button class="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-${index + 1}" aria-expanded="false" aria-controls="collapse-${index + 1}">
                                <div class="events">
                                    <div class="event">
                                        <div class="title">
                                            <i class="fas fa-circle"></i>
                                            <h3 class="event-title">${taskObj.task}</h3>
                                        </div>
                                        <div class="event-time">
                                            <span class="event-time">${taskObj.time}</span>
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </h2>
                        <div id="collapse-${index + 1}" class="accordion-collapse collapse" aria-labelledby="${headingId}" data-bs-parent="#${accordionId}">
                            <div class="accordion-body">
                                <strong>This is the ${index + 1} item's accordion body.</strong> It is hidden by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                            </div>
                        </div>
                    </div>
                </div>
            `;
            tasksListElement.append(event);
        });
    } else {
        const eventDate = new Date(date);
        const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
        const dayName = dayNames[eventDate.getDay()];
        const formattedDate = `${dayName} ${eventDate.getDate()} ${eventDate.toLocaleString('default', { month: 'long' })} ${eventDate.getFullYear()}`;
    
        const todayDate = `
            <div class="today-date">
                <div class="event-day">${dayName}</div>
                <div class="event-date">${formattedDate}</div>
            </div>
        `;
        tasksListElement.append(todayDate);
    
        const noTasksMessage = `
            <div class="events">
                <div class="event">
                    <div class="title">
                        <i class="fas fa-circle"></i>
                        <h3 class="event-title">No tasks for this date.</h3>
                    </div>
                </div>
            </div>
        `;
        tasksListElement.append(noTasksMessage);
    }
}

// Call the function with a date to display tasks for that date
show_tasks_in_date("2024-08-22");  // You can pass any date from tasksByDate here



function add_task() {
    swal("", "You entered : " + $("#input-field").val(), "success")
}
