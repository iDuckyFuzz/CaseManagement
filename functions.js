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
    this.caseType=caseType,
    this.arn=arn,
    this.trxnDate=trxnDate,
    this.cnlxDate=cnlxDate,
    this.amount=amount,
    this.mrchName=mrchName,
    this.chrbkRef=chrbkRef
}

let key = 0;

function submitDispute(form){
    const caseType = form.elements["casetype"].selectedIndex;
    
    const arn = form.arn.value;
    const amount = form.amount.value;
    const merch = form.merchant.value;
    const chrbk = form.chrgebck.value;
    console.log(arn);
    const chargebackData = new disputeData(caseType,arn,"","",amount,merch,chrbk);

    const data = JSON.stringify(chargebackData);
    console.log(chargebackData);
    console.log(data);

    localStorage.setItem(key, data);
    key++;
}

function displaySubmittedDisputes(){
    const textBox = document.getElementById('data');

    textBox.value = allStorage();
    
}

function allStorage() {

    var values = [],
        keys = Object.keys(localStorage),
        i = keys.length;

    while ( i-- ) {
        values.push( localStorage.getItem(keys[i]) );
    }

    return values;
}