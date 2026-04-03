const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "customer") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

let salons = JSON.parse(localStorage.getItem("salons")) || [];

// LOAD DASHBOARD STATS
function loadStats(){

    // TOTAL SALONS
    document.getElementById("totalSalons").innerText =
    salons.length;

    // TOTAL BARBERS
    let totalBarbers = 0;

    salons.forEach(salon => {
        totalBarbers += salon.barbers ? salon.barbers.length : 0;
    });

    document.getElementById("totalBarbers").innerText =
    totalBarbers;

    // OPEN SALONS (for now = total salons)
    document.getElementById("openSalons").innerText =
    salons.length;
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

// INIT
loadStats();