// ================= USER CHECK =================
const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if (!currentUser || currentUser.role !== "customer") {
    alert("Access denied!");
    window.location.href = "Registration_Login.html";
}

// ================= DATA =================
let salons = JSON.parse(localStorage.getItem("salons")) || [];
let appointments = JSON.parse(localStorage.getItem("appointments")) || [];

const container = document.getElementById("salonList");

// ================= TIME SLOT =================
function generateTimeSlots(){
    let slots = [];
    for(let hour = 10; hour < 20; hour++){
        slots.push(`${hour}:00 - ${hour}:30`);
        slots.push(`${hour}:30 - ${hour+1}:00`);
    }
    return slots;
}

// ================= LOAD UI =================
function loadSalons(){

    container.innerHTML = `
        <div class="salon-card">
            <h3>Select Salon</h3>

            <input type="text" id="locationSearch"
            placeholder="Search by name or location..."
            onkeyup="filterSalon()" />

            <div class="form-group">
                <label>Salon</label>
                <select id="salonSelect" onchange="renderForm()">
                    <option value="">Select Salon</option>
                    ${salons.map((s,i)=>`<option value="${i}">${s.salonName}</option>`).join("")}
                </select>
            </div>

            <div id="bookingForm"></div>
        </div>
    `;
}

// ================= FILTER (FIXED + IMPROVED) =================
function filterSalon(){

    const keyword = document.getElementById("locationSearch").value.toLowerCase();
    const select = document.getElementById("salonSelect");

    select.innerHTML = `<option value="">Select Salon</option>`;

    salons.forEach((s,i)=>{

        if(
            (s.location && s.location.toLowerCase().includes(keyword)) ||
            (s.salonName && s.salonName.toLowerCase().includes(keyword))
        ){
            select.innerHTML += `<option value="${i}">${s.salonName}</option>`;
        }

    });
}

// ================= RENDER FORM =================
function renderForm(){

    const index = document.getElementById("salonSelect").value;

    if(index === ""){
        document.getElementById("bookingForm").innerHTML = "";
        return;
    }

    const salon = salons[index];

    document.getElementById("bookingForm").innerHTML = `
        <img src="${salon.image || 'https://via.placeholder.com/300'}"
             style="width:100%; border-radius:10px; margin-bottom:10px;">

        <p>
        <strong>${salon.salonName}</strong> - ${salon.location}<br>
        ⭐ Rating: ${salon.rating || "No rating"} 
        (${salon.reviews ? salon.reviews.length : 0} reviews)
        </p>

        <div class="form-group">
            <label>Service</label>
            <select id="service">
                <option value="">Select Service</option>
                ${salon.services.map(s=>`<option value="${s.name}">${s.name}</option>`).join("")}
            </select>
        </div>

        <div class="form-group">
            <label>Barber</label>
            <select id="barber" onchange="updateSlots()">
                <option value="">Select Barber</option>
                ${salon.barbers.map(b=>`<option value="${b}">${b}</option>`).join("")}
            </select>
        </div>

        <div class="form-group">
            <label>Date</label>
            <input type="date" id="date"
            min="${new Date().toISOString().split('T')[0]}"
            onchange="updateSlots()">
        </div>

        <div class="form-group">
            <label>Time Slot</label>
            <select id="time">
                <option value="">Select Time Slot</option>
            </select>
        </div>

        <button onclick="book(${index})">Book Appointment</button>

        <hr>

        <h4>Rate this Salon (Optional)</h4>

        <div class="form-group">
            <select id="rating">
                <option value="">Skip rating</option>
                <option value="5">⭐⭐⭐⭐⭐</option>
                <option value="4">⭐⭐⭐⭐</option>
                <option value="3">⭐⭐⭐</option>
                <option value="2">⭐⭐</option>
                <option value="1">⭐</option>
            </select>
        </div>

        <button onclick="submitRating(${index})">Submit Rating</button>

        <div id="message"></div>
    `;
}

// ================= UPDATE SLOTS =================
function updateSlots(){

    const index = document.getElementById("salonSelect").value;
    const salon = salons[index];

    const barber = document.getElementById("barber").value;
    const date = document.getElementById("date").value;
    const timeSelect = document.getElementById("time");

    timeSelect.innerHTML = `<option value="">Select Time Slot</option>`;

    if(!barber || !date) return;

    const allSlots = generateTimeSlots();

    allSlots.forEach(slot => {

        const isBooked = appointments.some(app =>
            app.salonName === salon.salonName &&
            app.barber === barber &&
            app.date === date &&
            app.time === slot &&
            app.status !== "Cancelled"
        );

        if(isBooked){
            timeSelect.innerHTML += `<option disabled>${slot} (Booked)</option>`;
        } else {
            timeSelect.innerHTML += `<option value="${slot}">${slot}</option>`;
        }

    });
}

// ================= BOOK =================
function book(index){

    const salon = salons[index];

    const service = document.getElementById("service").value;
    const barber = document.getElementById("barber").value;
    const date = document.getElementById("date").value;
    const time = document.getElementById("time").value;

    if(!service || !barber || !date || !time){
        document.getElementById("message").innerHTML =
        `<p style="color:red;">⚠️ Fill all fields</p>`;
        return;
    }

    const isBooked = appointments.some(app =>
        app.salonName === salon.salonName &&
        app.barber === barber &&
        app.date === date &&
        app.time === time &&
        app.status !== "Cancelled"
    );

    if(isBooked){
        document.getElementById("message").innerHTML =
        `<p style="color:red;">❌ Slot already booked</p>`;
        return;
    }

    appointments.push({
        customerEmail: currentUser.email,
        salonName: salon.salonName,
        serviceName: service,
        barber,
        date,
        time,
        status: "Pending"
    });

    localStorage.setItem("appointments", JSON.stringify(appointments));

    document.getElementById("message").innerHTML =
    `<p style="color:green;">✅ Appointment booked successfully!</p>`;

    updateSlots();
}

// ================= RATING (FIXED) =================
function submitRating(index){

    const rating = document.getElementById("rating").value;

    if(!rating){
        return; // optional
    }

    const salon = salons[index];

    if(!salon.reviews){
        salon.reviews = [];
    }

    const existing = salon.reviews.find(
        r => r.user === currentUser.email
    );

    if(existing){
        existing.rating = Number(rating);
    } else {
        salon.reviews.push({
            user: currentUser.email,
            rating: Number(rating)
        });
    }

    updateAverageRating(index);

    localStorage.setItem("salons", JSON.stringify(salons));

    document.getElementById("rating").value = "";

    document.getElementById("message").innerHTML =
    `<p style="color:green;">⭐ Rating saved!</p>`;

    renderForm();
}

// ================= AVERAGE RATING =================
function updateAverageRating(index){

    const salon = salons[index];

    if(!salon.reviews || salon.reviews.length === 0){
        salon.rating = 0;
        return;
    }

    const total = salon.reviews.reduce((sum,r)=> sum + r.rating, 0);

    salon.rating = (total / salon.reviews.length).toFixed(1);
}

// ================= LOGOUT =================
function logout(){
    localStorage.removeItem("currentUser");
    localStorage.removeItem("rememberUser");
    window.location.href = "Registration_Login.html";
}

// ================= INIT =================
loadSalons();