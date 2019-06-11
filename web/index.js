const baseUrl = "http://localhost:3000/api";

function createRow(id, name, duration) {
    const tr = document.createElement("tr");

    const numElement = document.createElement("th");
    numElement.setAttribute("scope", "row");
    numElement.innerHTML = id;

    const nameElement = document.createElement("td");
    nameElement.innerHTML = name;

    const durationElement = document.createElement("td");
    durationElement.innerHTML = `${duration}`;

    tr.appendChild(numElement);
    tr.appendChild(nameElement);
    tr.appendChild(durationElement);

    return tr;
}

function loadCourses() {
    fetch(`${baseUrl}/courses`, {
        method: "GET"
    })
    .then(response => response.json())
    .then(response => {
        console.log(response);

        const table = document.getElementById("courses-table");
        table.innerHTML = "";

        for (let i = 0; i < response.length; i++) {
            const line = response[i];
            const row = createRow(i + 1, line.name, line.duration)
            table.appendChild(row);
        }        
    });
}

function addCourse(name, duration) {
    const data = {
        name: name,
        duration: parseInt(duration)
    };

    fetch(`${baseUrl}/courses`, {
        method: "POST",
        body: JSON.stringify(data),
        headers:{
            'Content-Type': 'application/json'
        }
    })
    .then(response => {
        console.log(response);
        loadCourses();
    })
}

loadCourses();

const courseNameElement = document.getElementById("add-course-name");
const courseDurationElement = document.getElementById("add-course-duration");

const form = document.getElementById("add-course-form");
form.addEventListener("submit", e => {
    e.preventDefault();

    const name = courseNameElement.value;
    const duration = courseDurationElement.value;
 
    addCourse(name, duration);
});
