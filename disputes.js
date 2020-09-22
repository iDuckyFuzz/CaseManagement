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
const readData = () => {
    let test = firebase.database.DataSnapshot.getChildren();
    let ref = database.ref('34534645');
    ref.on('value', gotData, errData)
    console.log("working!");
}

const gotData = (data) => {
    console.log(data.val());

    const firebasedata = document.getElementById('fireabasedata');
    const returnedData = data.val();
    firebasedata.value = returnedData.acct_id;
}

const errData = (err) => {
    console.log("Error!" + err);
}

const submitDispute = (form) => {
    const caseType = form.elements["casetype"].selectedIndex;

    let missingRequired = false;
    let arn;
    form.arn.value === "" ? missingRequired = true : arn = form.arn.value;
    let acctid;
    form.acctid.value === "" ? missingRequired = true : acctid = form.acctid.value;
    let amount;
    form.amount.value === "" ? missingRequired = true : amount = form.amount.value;
    let merch;
    form.merchant.value === "" ? missingRequired = true : merch = form.merchant.value;
    let chrbk;
    form.chrgebck.value === "" ? missingRequired = true : chrbk = form.chrgebck.value;
    let trxnDate;
    form.trxndate.value === "" ? missingRequired = true : trxnDate = form.trxndate.value;
    let cnclDate;
    form.cancellation.value === "" ? missingRequired = true : cnclDate = form.cancellation.value;

    console.log(arn);
    const chargebackData = new disputeData(caseType, arn, acctid, trxnDate, cnclDate, amount, merch, chrbk);

    const data = JSON.stringify(chargebackData);
    console.log(chargebackData);
    console.log(data);

    localStorage.setItem(chrbk, data);

    //add something here to update modal with error message if 
    //certain detail on the form is not provided
    let modal = document.getElementById("myModal");
    let modalTitle = document.getElementById("modal-title");
    let modalMessage = document.getElementById("modal-message");

    if (!missingRequired) {
        modalTitle.innerHTML = "Dispute Submitted Succesfully"
        modalMessage.innerHTML = "Click anywhere on the page to continue..."
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
    } else {
        modalTitle.innerHTML = "ERROR!: Failed To Submit Dispute"
        modalMessage.innerHTML = "Please Check Your Submission"
        modal.style.display = "block";
    }
}

let modal = document.getElementById("myModal");
let span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = () => {
    modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = (event) => {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}