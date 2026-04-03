const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

let salons = JSON.parse(localStorage.getItem("salons")) || [];

// LOAD PROFILE
function loadProfile(){

    const mySalon = salons.find(
        s => s.ownerEmail === currentUser.email
    );

    if(mySalon){
        document.getElementById("salonName").value = mySalon.salonName;
        document.getElementById("location").value = mySalon.location;

        document.getElementById("displaySalonName").innerText =
        mySalon.salonName;
    }
}

// SAVE PROFILE
function saveProfile(){

    const salonName = document.getElementById("salonName").value;
    const location = document.getElementById("location").value;

    let existing = salons.find(
        s => s.ownerEmail === currentUser.email
    );

    if(existing){
        existing.salonName = salonName;
        existing.location = location;
    } else {
        salons.push({
            ownerEmail: currentUser.email,
            salonName,
            location,
            services: [],
            barbers: []
        });
    }

    localStorage.setItem("salons", JSON.stringify(salons));

    alert("Profile updated successfully!");

    loadProfile();
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

loadProfile();