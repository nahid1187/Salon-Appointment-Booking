const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "customer") {
    alert("Please login as customer");
    window.location.href = "Registration_Login.html";
}

const salonListDiv = document.getElementById("salonList");
const searchInput = document.getElementById("searchInput");

let salons = JSON.parse(localStorage.getItem("salons")) || [];

// Display salons
function displaySalons(list) {
    salonListDiv.innerHTML = "";

    if (list.length === 0) {
        salonListDiv.innerHTML = "<p>No salons found.</p>";
        return;
    }

    list.forEach(salon => {
        let servicesHTML = "";
        salon.services.forEach(service => {
            servicesHTML += `<li>${service.name} - $${service.price}</li>`;
        });

     salonListDiv.innerHTML += `
            <div class="card" onclick="selectSalon('${salon.salonName}')">
            <h3>${salon.salonName}</h3>
            <p><strong>Location:</strong> ${salon.location}</p>
            <ul>${servicesHTML}</ul>
            <p style="color:#667eea;font-weight:bold;">Click to book</p>
            </div>
            `;
    });
}

// Search salon by name
function searchSalon() {
    const keyword = searchInput.value.toLowerCase();

    const filteredSalons = salons.filter(salon =>
        salon.salonName.toLowerCase().includes(keyword)
    );

    displaySalons(filteredSalons);
}
function selectSalon(salonName){

localStorage.setItem("selectedSalon", salonName);

window.location.href = "book-appointment.html";

}

function selectSalon(salonName){

localStorage.setItem("selectedSalon", salonName);

window.location.href = "book-appointment.html";

}
// Initial load
displaySalons(salons);