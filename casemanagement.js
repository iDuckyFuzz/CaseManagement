function getOptionValue(select){
    const listDetails = select;
    if(listDetails!=="")
    {
        document.getElementById("workstreams").style.visibility = "visible";
    }
}

function getSubOptionValue(select){
    const listDetails = select;
    if(listDetails!=="")
    {
        document.getElementById("cases").style.visibility = "visible";
    }
}