const database = firebase.database();

function disputeData(caseType, arn, acctid, trxnDate, cnlxDate, amount, mrchName, chrbkRef) {
    this.caseType = caseType,
        this.arn = arn,
        this.acctid = acctid,
        this.trxnDate = trxnDate,
        this.cnlxDate = cnlxDate,
        this.amount = amount,
        this.mrchName = mrchName,
        this.chrbkRef = chrbkRef
}

//testing retrieving data
function readData() {
    let ref = database.ref('34534645');
    ref.on('value', gotData, errData)
    console.log("working!");
}

function gotData(data) {
    console.log(data.val());

    const firebasedata = document.getElementById('fireabasedata');
    const returnedData = data.val();
    firebasedata.value = returnedData.acct_id;
}

function errData(err) {
    console.log("Error!" + err);
}

function submitDispute(form) {
    const caseType = form.elements["casetype"].selectedIndex;

    let missingRequired = false;
    let arn;
    form.arn.value === "" ? missingRequired = true : arn = form.arn.value;
    let acctid;
    form.arn.value === "" ? missingRequired = true : acctid = form.acctid.value;
    let amount;
    form.arn.value === "" ? missingRequired = true : amount = form.amount.value;
    let merch;
    form.arn.value === "" ? missingRequired = true : merch = form.merchant.value;
    let chrbk;
    form.arn.value === "" ? missingRequired = true : chrbk = form.chrgebck.value;
    let trxnDate;
    form.arn.value === "" ? missingRequired = true : trxnDate = form.trxndate.value;
    let cnclDate;
    form.arn.value === "" ? missingRequired = true : cnclDate = form.cancellation.value;

    console.log(arn);
    const chargebackData = new disputeData(caseType, arn, acctid, trxnDate, cnclDate, amount, merch, chrbk);

    const data = JSON.stringify(chargebackData);
    console.log(chargebackData);
    console.log(data);

    localStorage.setItem(chrbk, data);

    //add something here to update modal with error message if 
    //certain detail on the form is not provided
    let modal = document.getElementById("myModal");
    modal.style.display = "block";

    if (!missingRequired) {

        database.ref(arn).set({
            case_type: caseType,
            acct_id: acctid,
            trxn_date: trxnDate,
            cncl_date: cnclDate,
            amount: amount,
            merch: merch,
            cb_ref: chrbk
        })

        form.reset();
    }else{
        alert("Error! Data is missing from a required field.")
    }
}

function displaySubmittedDisputes() {
    populateDropdown();
    readData();
}

function allStorage() {

    const values = [],
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
    let submissions = document.getElementById("submissions");
    keys = Object.keys(localStorage);

    console.log(localStorage);

    for (i = 0; i < values.length; i++) {
        let option = document.createElement("OPTION");

        const retrievedObject = localStorage.getItem(keys[i]);
        const parsedObject = JSON.parse(retrievedObject);
        //chargeback reference should be a unique values
        option.innerHTML = parsedObject.chrbkRef;
        option.value = i;

        //may need to implement a better fix here
        if (option.innerHTML != "undefined") {
            submissions.options.add(option);
        }
    }
    const textBox = document.getElementById("data");
    keys = Object.keys(localStorage)
    textBox.value = localStorage.getItem(keys[0]);
}

function update() {
    const i = document.getElementById("submissions").value;
    keys = Object.keys(localStorage)
    document.getElementById("data").value = localStorage.getItem(keys[i]);
    readData();
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}