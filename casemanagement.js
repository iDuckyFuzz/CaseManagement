const getOptionValue = (select) => {
    const listDetails = select;
    if(listDetails!=="")
    {
        document.getElementById("workstreams").style.visibility = "visible";
    }
}

const getSubOptionValue = (select) => {
    const listDetails = select;
    if(listDetails!=="")
    {
        document.getElementById("cases").style.visibility = "visible";
    }
}

const populateAccountData = (select) => {
    const listDetails = select;
    if(listDetails!=="")
    {
        document.getElementById("acctid").value = listDetails;
    }
} 