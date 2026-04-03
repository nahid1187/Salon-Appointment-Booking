const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

let appointments = JSON.parse(localStorage.getItem("appointments")) || [];
let salons = JSON.parse(localStorage.getItem("salons")) || [];

const table = document.getElementById("appointmentTable");

// GET MY SALON
function getMySalon(){
    return salons.find(s => s.ownerEmail === currentUser.email);
}

// LOAD APPOINTMENTS
function loadAppointments(){

    const mySalon = getMySalon();

    table.innerHTML = "";

    appointments.forEach((app,index)=>{

        if(app.salonName === mySalon?.salonName){

            table.innerHTML += `
            <tr>
            <td>${app.customerEmail}</td>
            <td>${app.serviceName}</td>
            <td>${app.barber}</td>
            <td>${app.date}</td>
            <td>${app.time}</td>
            <td class="${app.status.toLowerCase()}">${app.status}</td>
            <td>
            <button class="accept" onclick="updateStatus(${index}, 'Accepted')">Accept</button>
            <button class="reject" onclick="updateStatus(${index}, 'Rejected')">Reject</button>
            <button class="done" onclick="updateStatus(${index}, 'Completed')">Done</button>
            </td>
            </tr>
            `;
        }

    });

}

// UPDATE STATUS
function updateStatus(index,status){

    appointments[index].status = status;

    localStorage.setItem("appointments", JSON.stringify(appointments));

    loadAppointments();
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

loadAppointments();