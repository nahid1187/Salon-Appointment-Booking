const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "salon") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

let salons = JSON.parse(localStorage.getItem("salons")) || [];

function getMySalon(){
    return salons.find(s => s.ownerEmail === currentUser.email);
}

// LOAD SERVICES
function loadServices(){

    const salon = getMySalon();
    const container = document.getElementById("serviceList");

    container.innerHTML = "";

    if(!salon || !salon.services) return;

    salon.services.forEach((service,index)=>{

        container.innerHTML += `
        <div class="service-item">
            <div class="service-info">
                ${service.name} - $${service.price}
            </div>
            <button class="delete" onclick="deleteService(${index})">Delete</button>
        </div>
        `;
    });
}

// ADD SERVICE
function addService(){

    const name = document.getElementById("serviceName").value;
    const price = document.getElementById("servicePrice").value;

    if(!name || !price){
        alert("Fill all fields");
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

    salon.services.push({ name, price });

    localStorage.setItem("salons", JSON.stringify(salons));

    document.getElementById("serviceName").value = "";
    document.getElementById("servicePrice").value = "";

    loadServices();
}

// DELETE SERVICE
function deleteService(index){

    let salon = getMySalon();

    salon.services.splice(index,1);

    localStorage.setItem("salons", JSON.stringify(salons));

    loadServices();
}

// LOGOUT
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

loadServices();