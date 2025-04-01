function showCurrentDate() {
    const currentDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const weekday = weekdays[currentDate.getDay()];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");

    let hr = hours % 12 || 12;  // Converts 0 -> 12
    const period = hours >= 12 ? "PM" : "AM";

    const msg = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${hr}:${minutes} ${period}.`;
    document.getElementById("current-date").innerHTML = msg;
}

// Array to store students
let studentList = [];

// Add Student Event Listener
document.getElementById("studentForm").addEventListener("submit", addStudent);

function addStudent(event) {
    event.preventDefault();

    const studentNumber = generateStudentNumber();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;

    // Validation
    if (!name || !age || !email || !course) {
        alert("Please fill in all fields.");
        return;
    }

    const namePattern = /^[a-zA-Z\s]+ [a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        alert("Invalid Format: Please enter your full name (First Last).");
        return;
    }

    if (age < 18) {
        alert("You're too young, enroll in high school first.");
        return;
    } else if (age > 99) {
        alert("You're too old, rest now.");
        return;
    }

    const emailPattern = /^[a-zA-Z0-9]+@up\.edu\.ph$/;
    if (!emailPattern.test(email)) {
        alert("Invalid email format: Please enter a valid UP Mail (Name123@up.edu.ph).");
        return;
    }

    // Create Student Object
    const student = {
        studentNumber,
        name,
        age,
        email,
        course
    };

    // Add to Student List
    studentList.push(student);
    console.log(studentList);
    setTimeout(() => displayStudents(), 100);

    alert(`Student ${name} has been added with Student Number: ${studentNumber}`);

    // Display Student
    displayStudents();

    // Clear form fields
    document.getElementById("studentForm").reset();

}

// Generate Unique Student Number
function generateStudentNumber() {
    const year = new Date().getFullYear().toString();
    let studentNumber;
    do {
        const studentId = Math.floor(Math.random() * 10000) + 1;
        studentNumber = year + studentId.toString().padStart(5, "0");
    } while (studentList.some(student => student.studentNumber === studentNumber));
    return studentNumber;
}

// Display Students in List
function displayStudents(filteredStudents = studentList) {
    const studentsNiNiko = document.getElementById("studentsNiNiko");
    studentsNiNiko.innerHTML = ""; // Clear the list

    filteredStudents.forEach(student => {
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${student.name}</strong> {${student.studentNumber}}, ${student.age} years old, studying <em>${student.course}</em> (${student.email})`;
        studentsNiNiko.appendChild(listItem);
    });
}

// Search Student
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const searchQuery = document.getElementById("searchInput").value.trim().toLowerCase();

    if (!searchQuery) {
        alert("Please enter a name or student number to search.");
        return;
    }

    // Declare filteredStudents before using it
    let filteredStudents = studentList.filter(student =>
        student.name.toLowerCase().includes(searchQuery) || student.studentNumber.includes(searchQuery)
    );

    if (filteredStudents.length === 0) {
        alert("No student found.");
        displayStudents(studentList);  // Show all students again
    } else {
        displayStudents(filteredStudents);
    }
});
document.getElementById("searchInput").addEventListener("input", function() {
    if (this.value.trim() === "") {
        displayStudents(studentList);
    }
});


//<!-- Display Students -->