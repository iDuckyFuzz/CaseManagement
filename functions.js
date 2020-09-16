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
function readData(){
    var ref = database.ref('34534645');
    ref.on('value', gotData, errData)
    console.log("working!");
}

function gotData(data){
    console.log(data.val());

    const firebasedata = document.getElementById('fireabasedata');
    const returnedData = data.val();
    firebasedata.value = returnedData.acct_id;
}

function errData(err){
    console.log("Error!" + err);
}

function submitDispute(form) {
    const caseType = form.elements["casetype"].selectedIndex;

    const arn = form.arn.value;
    const acctid = form.acctid.value;
    const amount = form.amount.value;
    const merch = form.merchant.value;
    const chrbk = form.chrgebck.value;

    const trxnDate = form.trxndate.value;
    const cnclDate = form.cancellation.value;

    console.log(arn);
    const chargebackData = new disputeData(caseType, arn, acctid, trxnDate, cnclDate, amount, merch, chrbk);

    const data = JSON.stringify(chargebackData);
    console.log(chargebackData);
    console.log(data);

    localStorage.setItem(chrbk, data);

    //add something here to update modal with error message if 
    //certain detail on the form is not provided
    var modal = document.getElementById("myModal");
    modal.style.display = "block";

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
}

function displaySubmittedDisputes() {
    populateDropdown();
    readData();
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

        //may need to implement a better fix here
        if(option.innerHTML != "undefined")
        {
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

var modal = document.getElementById("myModal");
var span = document.getElementsByClassName("close")[0];
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