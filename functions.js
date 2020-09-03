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

function disputeData(caseType, arn, trxnDate, cnlxDate, amount, mrchName, chrbkRef) {
    this.caseType = caseType,
        this.arn = arn,
        this.trxnDate = trxnDate,
        this.cnlxDate = cnlxDate,
        this.amount = amount,
        this.mrchName = mrchName,
        this.chrbkRef = chrbkRef
}

function submitDispute(form) {
    const caseType = form.elements["casetype"].selectedIndex;

    const arn = form.arn.value;
    const amount = form.amount.value;
    const merch = form.merchant.value;
    const chrbk = form.chrgebck.value;
    console.log(arn);
    const chargebackData = new disputeData(caseType, arn, "", "", amount, merch, chrbk);

    const data = JSON.stringify(chargebackData);
    console.log(chargebackData);
    console.log(data);

    localStorage.setItem(chrbk, data);

    form.reset();
}

function displaySubmittedDisputes() {
    populateDropdown();
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while (i--) {
        values.push(localStorage.getItem(keys[i]));
    }

    return values;
}

function clearStorage() {
    localStorage.clear();
}

function populateDropdown() {
    const values = allStorage();
    var submissions = document.getElementById("submissions");
    keys = Object.keys(localStorage);

    console.log(localStorage);

    for (i = 0; i < values.length; i++) {
        var option = document.createElement("OPTION");

        var retrievedObject = localStorage.getItem(keys[i]);
        var parsedObject = JSON.parse(retrievedObject);
        //chargeback reference should be a unique values
        option.innerHTML = parsedObject.chrbkRef;
        option.value = i;
        submissions.options.add(option);
    }
    const textBox = document.getElementById('data');
    keys = Object.keys(localStorage)
    textBox.value = localStorage.getItem(keys[0]);
}

function update() {
    const i = document.getElementById("submissions").value;
    keys = Object.keys(localStorage)
    document.getElementById("data").value = localStorage.getItem(keys[i]);
}

function missingDataCheck() {
    
}

// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("submit");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks on the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}