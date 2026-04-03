const currentUser = JSON.parse(localStorage.getItem("currentUser"));

// 🔐 PROTECT ADMIN PAGE
if (!currentUser || currentUser.role !== "admin") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

// DATA
let users = JSON.parse(localStorage.getItem("salonUsers")) || [];
let salons = JSON.parse(localStorage.getItem("salons")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const dataArea = document.getElementById("dataArea");

// ================= USERS =================
function showUsers(){

    let html = `
    <h3>All Users</h3>
    <table>
    <tr>
    <th>Name</th>
    <th>Email</th>
    <th>Role</th>
    <th>Action</th>
    </tr>
    `;

    users.forEach((u,i)=>{
        html += `
        <tr>
        <td>${u.name}</td>
        <td>${u.email}</td>
        <td>${u.role}</td>
        <td>
            <button class="delete" onclick="deleteUser(${i})">Delete</button>
        </td>
        </tr>
        `;
    });

    html += "</table>";
    dataArea.innerHTML = html;
}

// DELETE USER
function deleteUser(index){
    if(confirm("Delete this user?")){
        users.splice(index,1);
        localStorage.setItem("salonUsers", JSON.stringify(users));
        showUsers();
    }
}

// ================= SALONS =================
function showSalons(){

    let html = `
    <h3>All Salons</h3>
    <table>
    <tr>
    <th>Salon Name</th>
    <th>Action</th>
    </tr>
    `;

    salons.forEach((s,i)=>{
        html += `
        <tr>
        <td>${s.salonName}</td>
        <td>
            <button class="delete" onclick="deleteSalon(${i})">Delete</button>
        </td>
        </tr>
        `;
    });

    html += "</table>";
    dataArea.innerHTML = html;
}

// DELETE SALON
function deleteSalon(index){
    if(confirm("Delete this salon?")){
        salons.splice(index,1);
        localStorage.setItem("salons", JSON.stringify(salons));
        showSalons();
    }
}

// ================= APPOINTMENTS =================
function showAppointments(){

    let html = `
    <h3>All Appointments</h3>
    <table>
    <tr>
    <th>Salon</th>
    <th>Service</th>
    <th>Date</th>
    <th>Time</th>
    <th>Action</th>
    </tr>
    `;

    appointments.forEach((a,i)=>{
        html += `
        <tr>
        <td>${a.salonName}</td>
        <td>${a.serviceName}</td>
        <td>${a.date}</td>
        <td>${a.time}</td>
        <td>
            <button class="delete" onclick="deleteAppointment(${i})">Delete</button>
        </td>
        </tr>
        `;
    });

    html += "</table>";
    dataArea.innerHTML = html;
}

// DELETE APPOINTMENT
function deleteAppointment(index){
    if(confirm("Delete this appointment?")){
        appointments.splice(index,1);
        localStorage.setItem("appointments", JSON.stringify(appointments));
        showAppointments();
    }
}

// ================= LOGOUT =================
function logout(){

    // remove login session
    localStorage.removeItem("currentUser");

    // 🔥 remove remember me (important)
    localStorage.removeItem("rememberUser");

    window.location.href = "Registration_Login.html";
}