/*This Script allows people to enter by using a form that asks for a
UserID and Password*/
function pasuser(form) {
if (form.id.value=="PLW293") { 
if (form.pass.value=="Password123") {              
location="home.html" 
} else {
alert("Invalid Password")
}
} else {  alert("Invalid UserID")
}
}