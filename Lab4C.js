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
    let hr;

    if (hours > 12) {
        hr = hours - 12;
    } else if (hours === 0) {
        hr = 12;
    }
    
    const msg = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${hr}:${minutes} ${hours >= 12 ? "PM" : "AM"}.`;

    document.getElementById("current-date").innerHTML = msg;
}
//Add Student
document.getElementById("studentForm").addEventListener("submit", addStudent);

studentList = [];

function addStudent(event){
    event.preventDefault(); 

    const studentNumber = generateStudentNumber();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;

    if (!name || !age || !email || !course) {
        alert("Please fill in all fields.");
        return;
    }

    //kulang pa pang validate name, age, and email

    const student = {
        studentNumber: studentNumber,
        name: name,
        age: age,
        email: email,
        course: course
    };

    studentList.push(student);
    alert(`Student ${name} has been added with Student Number: ${studentNumber}`);

    //eme eme lng ni danay 

    // Display student info nga naka list
    const studentsNiNiko = document.getElementById("studentsNiNiko");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${name}</strong>, ${age} years old, studying <em>${course}</em> (${email})`;
    studentsNiNiko.appendChild(listItem)
  
    // Clear form fields
    document.getElementById("studentForm").reset();
}

function generateStudentNumber() {
    const year = new Date().getFullYear().toString()
    let studentNumber;
    do {
        const studentId = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
        studentNumber = year + studentId.toString().padStart(5, "0"); // Format as YYYY-XXXXX
    } while (studentList.some(student => student.studentNumber === studentNumber));
    return studentNumber;
}