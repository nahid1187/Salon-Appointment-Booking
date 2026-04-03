const currentUser = JSON.parse(localStorage.getItem("currentUser"));

if(!currentUser || currentUser.role !== "customer"){
alert("Please login as customer");
window.location.href="Registration_Login.html";
}

let appointments =
JSON.parse(localStorage.getItem("appointments")) || [];

const table =
document.getElementById("appointmentTable");

function loadAppointments(){

table.innerHTML = "";

appointments.forEach((app,index)=>{

if(app.customerEmail === currentUser.email){

table.innerHTML += `
<tr>
<td>${app.salonName}</td>
<td>${app.serviceName}</td>
<td>${app.barber}</td>
<td>${app.date}</td>
<td>${app.time}</td>
<td>${app.status}</td>
<td>
${app.status !== "Cancelled"
? `<button onclick="cancelAppointment(${index})">Cancel</button>`
: "Cancelled"}
</td>
</tr>
`;

}

});

}

function cancelAppointment(index){

if(confirm("Are you sure you want to cancel this appointment?")){

appointments[index].status = "Cancelled";

localStorage.setItem("appointments",
JSON.stringify(appointments));

loadAppointments();

}

}

loadAppointments();