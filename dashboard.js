const user = JSON.parse(localStorage.getItem('currentUser'));

if (!user) {
    alert('Please login first');
    window.location.href = 'Registration_Login.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        localStorage.removeItem('currentUser');
        window.location.href = 'Registration_Login.html';
    }
}

document.addEventListener('DOMContentLoaded', function() {
    const nameSpan = document.getElementById('username');
    if (nameSpan && user) {
        nameSpan.innerText = user.name;
    }
});
const appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

const salons =
JSON.parse(localStorage.getItem("salons")) || [];

if(user && user.role === "salon"){

const mySalon = salons.find(
s => s.ownerEmail === user.email
);

if(mySalon){

const myAppointments = appointments.filter(
a => a.salonName === mySalon.salonName
);

document.getElementById("totalAppointments").innerText =
myAppointments.length;

/* today's date */

const today = new Date().toISOString().split("T")[0];

const todayAppointments = myAppointments.filter(
a => a.date === today
);

document.getElementById("todayAppointments").innerText =
todayAppointments.length;

/* unique customers */

const customers =
[...new Set(myAppointments.map(a=>a.customerEmail))];

document.getElementById("totalCustomers").innerText =
customers.length;

/* total services */

document.getElementById("totalServices").innerText =
mySalon.services.length;

}

}