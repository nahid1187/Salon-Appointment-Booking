const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

let salons = JSON.parse(localStorage.getItem("salons")) || [];

function getMySalon(){
    return salons.find(s => s.ownerEmail === currentUser.email);
}

// LOAD BARBERS
function loadBarbers(){

    const salon = getMySalon();
    const container = document.getElementById("barberList");

    container.innerHTML = "";

    if(!salon || !salon.barbers) return;

    salon.barbers.forEach((barber,index)=>{

        container.innerHTML += `
        <div class="barber-item">
            <div>${barber}</div>
            <button class="delete" onclick="deleteBarber(${index})">Delete</button>
        </div>
        `;
    });
}

// ADD BARBER
function addBarber(){

    const name = document.getElementById("barberName").value;

    if(!name){
        alert("Enter barber name");
        return;
    }

    let salon = getMySalon();

    if(!salon){
        salon = {
            ownerEmail: currentUser.email,
            salonName: "",
            location: "",
            services: [],
            barbers: []
        };
        salons.push(salon);
    }

    salon.barbers.push(name);

    localStorage.setItem("salons", JSON.stringify(salons));

    document.getElementById("barberName").value = "";

    loadBarbers();
}

// DELETE BARBER
function deleteBarber(index){

    let salon = getMySalon();

    salon.barbers.splice(index,1);

    localStorage.setItem("salons", JSON.stringify(salons));

    loadBarbers();
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

loadBarbers();