// ================= USER CHECK =================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

// ================= DATA =================
let salons = JSON.parse(localStorage.getItem("salons")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

// ================= GET MY SALON =================
function getMySalon(){
    return salons.find(s => s.ownerEmail === currentUser.email);
}

// ================= LOAD STATS =================
function loadStats(){

    const mySalon = getMySalon();

    if(!mySalon){
        console.log("No salon found");
        return;
    }

    // TOTAL SERVICES
    const servicesCount = mySalon.services ? mySalon.services.length : 0;
    document.getElementById("totalServices").innerText = servicesCount;

    // TOTAL BARBERS
    const barbersCount = mySalon.barbers ? mySalon.barbers.length : 0;
    document.getElementById("totalBarbers").innerText = barbersCount;

    // TOTAL APPOINTMENTS
    const totalAppointments = appointments.filter(app =>
        app.salonName === mySalon.salonName
    ).length;

    document.getElementById("totalAppointments").innerText = totalAppointments;
}

// ================= LOGOUT =================
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

// ================= INIT =================
loadStats();