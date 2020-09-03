let count = 0;

/*This Script allows people to enter by using a form that asks for a
UserID and Password*/
function pasuser(form) {
    if (form.id.value == "PLW293") {
        if (form.pass.value == "Password123") {
            location = "home.html"
        } else {
            count++;
            console.print(count);
            alert("Invalid Password")
            if (count === 3) {
                alert("Your account has been locked please contact 1111!");
            }
        }
    } else {
        alert("Invalid UserID");
    }
}

function submitDispute(form){
    const casetype = form.elements["casetype"].selectedIndex;
    console.log(casetype);

    const arn = form.arn.value;
    console.log(arn);
}