function showCurrentDate() {
    const currentDate = new Date();

    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()]; 
    const day = currentDate.getDate();
    const weekday = weekdays[currentDate.getDay()];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
    
    const msg = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${hours>= 12 ? hours - 12 : hours}:${minutes} ${hours >= 12 ? "PM" : "AM"}.`;

    document.getElementById("current-date").innerHTML = msg;
}