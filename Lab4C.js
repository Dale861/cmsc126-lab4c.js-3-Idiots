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
    let hr;
 
    if (hours > 12) {
         hr = hours - 12;
    } else if (hours === 0) {
         hr = 12;
    }else{
         hr = hours;
    }
     
    const msg = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${hr}:${minutes} ${hours >= 12 ? "PM" : "AM"}.`;
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
    // sa example mo sa ppt sir mayara to document.getElementById('usernameError').textContent = 'error chuchu'
     //wala ko to sir kay ga gamit lng ko return. paano to ga work imo sir if wala return?
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

    const studentsNiNiko = document.getElementById("studentsNiNiko");
    const listItem = document.createElement("li");
    listItem.innerHTML = `<strong>${name} </strong>{${studentNumber}}, ${age} years old, studying <em>${course}</em> (${email})`;
    studentsNiNiko.appendChild(listItem)

    // Clear form fields
    document.getElementById("studentForm").reset();

}

// Generate Unique Student Number
function generateStudentNumber() {
    const year = new Date().getFullYear().toString();
    let studentNumber;
    do {
        const studentId = Math.floor(Math.random() * 10000) + 1; // Random number between 1 and 10000
         studentNumber = year + studentId.toString().padStart(5, "0"); // Format as YYYY-XXXXX
    } while (studentList.some(student => student.studentNumber === studentNumber));
    return studentNumber;
}


// Search Student
document.getElementById("searchForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value.trim().toLowerCase();
    const searchResults = document.getElementById("searchResults"); // New container for search results

    // Clear previous search results
    searchResults.innerHTML = "";

    if (!searchQuery) {
        searchResults.innerHTML = "<p>Please enter a name or student number to search.</p>";
        return;
    }

    let filteredStudents = studentList.filter(student =>
        student.name.toLowerCase().includes(searchQuery) || student.studentNumber.includes(searchQuery)
    );

    if (filteredStudents.length === 0) {
        searchResults.innerHTML = "<p>No student found.</p>";
        return;
    }

    // Display search result in structured format
    searchResults.innerHTML = `<h3>Student Found:</h3>`;

    filteredStudents.forEach(student => {
        const studentDiv = document.createElement("div");
        studentDiv.innerHTML = `
            <p><strong>Student Number:</strong> ${student.studentNumber}</p>
            <p><strong>Name:</strong> ${student.name}</p>
            <p><strong>Age:</strong> ${student.age}</p>
            <p><strong>UP Mail:</strong> ${student.email}</p>
            <p><strong>Course:</strong> ${student.course}</p>
            <hr>
        `;
        searchResults.appendChild(studentDiv);
    });
});

// Automatically reset when the user clears the search input
document.getElementById("searchInput").addEventListener("input", function() {
    if (this.value.trim() === "") {
        document.getElementById("searchResults").innerHTML = ""; // Clear search results
        displayStudents(studentList); // Show all students again
    }
});


//<!-- Display Students -->
function display_list() {
    const studentsContainer = document.getElementById("studentsContainer");
    studentsContainer.innerHTML = "";

    if (studentList.length === 0) {
        studentsContainer.innerHTML = "<p>No students available.</p>";
        return;
    }

    const table = document.createElement("table");
    table.border = "1";
    
    const headerRow = document.createElement("tr");
    headerRow.innerHTML = "<th>Student Number</th><th>Name</th><th>Age</th><th>UP Mail</th><th>Course</th>";
    table.appendChild(headerRow);

    studentList.forEach(student => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${student.studentNumber}</td>
            <td>${student.name}</td>
            <td>${student.age}</td>
            <td>${student.email}</td>
            <td>${student.course}</td>
        `;
        table.appendChild(row);
    });

    studentsContainer.appendChild(table);
}

const displayAllButton = document.createElement("button");
displayAllButton.textContent = "Display All";
displayAllButton.addEventListener("click", display_list);

document.body.appendChild(displayAllButton); 

document.body.appendChild(document.createElement("br"));
const studentsContainer = document.createElement("div");
studentsContainer.id = "studentsContainer";
document.body.appendChild(studentsContainer);

