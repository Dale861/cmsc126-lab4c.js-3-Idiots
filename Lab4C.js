function timeNow() {
    const currentDate = new Date();
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const weekdays = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    const year = currentDate.getFullYear();
    const month = months[currentDate.getMonth()];
    const day = currentDate.getDate();
    const weekday = weekdays[currentDate.getDay()];
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes().toString().padStart(2, "0");
    let hr = hours % 12 || 12;
     
    const msg = `Today is ${month} ${day}, ${year}, ${weekday}. <br>The current time is ${hr}:${minutes} ${hours >= 12 ? "PM" : "AM"}.`;
        document.getElementById("current-date").innerHTML = msg;
    }

// Create Student Object
function STUDENT(studentNumber, name, age, email, course) {
    this.studentNumber = studentNumber;
    this.name = name;       
    this.age = age;
    this.email = email;
    this.course = course;
};

let studentList = [];

document.getElementById("studentForm").addEventListener("submit", add_student);

function add_student(event) {
    event.preventDefault();

    let valid = true;

    const studentNumber = generateStudentNumber();
    const name = document.getElementById("name").value.trim();
    const age = document.getElementById("age").value.trim();
    const email = document.getElementById("email").value.trim();
    const course = document.getElementById("course").value;

    // Validation
    if (!name || !age || !email || !course) {
        valid = false;
        document.getElementById("allFieldsError").textContent = "Please fill out all fields.";
    }else {
        document.getElementById("allFieldsError").textContent = ""; 
    }

    const namePattern = /^[a-zA-Z\s]+ [a-zA-Z\s]+$/;
    if (!namePattern.test(name)) {
        valid = false;
        document.getElementById("nameError").textContent = "Please enter a valid name (FirstName LastName).";
    }else {
        document.getElementById("nameError").textContent = ""; 
    }
    
    if (age < 18) {
        valid = false;
        document.getElementById("ageError").textContent = "You must be at least 18 years old to register.";
    } else if (age > 99) {
        valid = false;
        document.getElementById("ageError").textContent = "You're too old, rest now."; 
    } else {
        document.getElementById("ageError").textContent = ""; 
    }

    const emailPattern = /^[a-zA-Z0-9]+@up\.edu\.ph$/;
    if (!emailPattern.test(email)) {
        valid = false;
        document.getElementById("emailError").textContent = "Invalid email format: Please enter a valid UP Mail (Name123@up.edu.ph).";
    }else {
        document.getElementById("emailError").textContent = ""; 
    }

    if (!valid) {
        return; 
    }

    const student = new STUDENT(studentNumber, name, age, email, course);

    // Add to studentList
    studentList.push(student);
    console.log(studentList);
  

    alert(`Student ${name} has been added with Student Number: ${studentNumber}`);

    // const studentsNiNiko = document.getElementById("studentsNiNiko");
    // const listItem = document.createElement("li");
    // listItem.innerHTML = `<strong>${name} </strong>{${studentNumber}}, ${age} years old, studying <em>${course}</em> (${email})`;
    // studentsNiNiko.appendChild(listItem)

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
document.getElementById("searchForm").addEventListener("submit", find_student);
function find_student(event) {
    event.preventDefault();
    
    const searchInput = document.getElementById("searchInput");
    const searchQuery = searchInput.value.trim().toLowerCase();
    const searchResults = document.getElementById("searchResults"); // New container for search results


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
searchResults.innerHTML = `
    <h3>Student Found:</h3>
    <table border="1">
        <thead>
            <tr>
                <th>Student Number</th>
                <th>Name</th>
                <th>Age</th>
                <th>UP Mail</th>
                <th>Course</th>
            </tr>
        </thead>
        <tbody id="tableBody">
        </tbody>
    </table>
`;

// Display search result in structured format
searchResults.innerHTML = `<h3>Student Found:</h3>`;

filteredStudents.forEach(student => {
    const table = document.createElement("table");
    table.border = "1";
    table.innerHTML = `
        <tr><th>Student Number</th><td>${student.studentNumber}</td></tr>
        <tr><th>Name</th><td>${student.name}</td></tr>
        <tr><th>Age</th><td>${student.age}</td></tr>
        <tr><th>UP Mail</th><td>${student.email}</td></tr>
        <tr><th>Course</th><td>${student.course}</td></tr>
    `;

    searchResults.appendChild(table);
});


};

// Automatically reset when the user clears the search input
document.getElementById("searchInput").addEventListener("input", function() {
    if (this.value.trim() === "") {
        document.getElementById("searchResults").innerHTML = ""; // Clear search results

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

