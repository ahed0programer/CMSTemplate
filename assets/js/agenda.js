const tasks = [
    { time: "03:30 AM", title: "Task 1: Morning Exercise" },
    { time: "11:30 PM", title: "Task 2: Bedtime Reading" }
];

function plotTasks() {
    tasks.forEach(task => {
        let [hour, minutes] = task.time.split(/:| /);
        const period = task.time.split(" ")[1]; // AM or PM

        const timeline = period === "AM" ? document.querySelectorAll('.timeline')[0] : document.querySelectorAll('.timeline')[1];
        const hours = timeline.querySelectorAll('.timeline-hour');

        let hourIndex = parseInt(hour, 10) - 1;
        if (hourIndex < 0) hourIndex = 11; // Handle 12 AM/PM

        const hourBlock = hours[hourIndex];
        const taskDot = document.createElement("button");
        taskDot.className = "task-dot";
        taskDot.setAttribute("data-bs-toggle", "tooltip");
        taskDot.setAttribute("data-bs-placement", "top");
        taskDot.setAttribute("title", task.title);

        // Position the dot relative to the minutes (e.g., 30 minutes is halfway between the hour blocks)
        taskDot.style.left = `${parseInt(minutes, 10) / 60 * 100}%`;

        hourBlock.appendChild(taskDot);
    });
}

plotTasks();
