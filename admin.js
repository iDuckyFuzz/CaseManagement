const database = firebase.database();
let dropdown = document.getElementById("submissions");
let ref = database.ref("Disputes");

const getKeys = () => {

    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            //add the list of ARN's to the dropdown so we can review the data
            let option = document.createElement("OPTION");
            option.innerHTML = childSnapshot.key;
            option.value = childSnapshot.key;
            dropdown.options.add(option);

            var childData = childSnapshot.val();
            var id = childData.id;
        });
    });

    fetchCaseData();
}

//TODO: update box to reflect data pulled from firebase
const fetchCaseData = (arn) => {
    var ref = database.ref("Disputes");
    ref.on('value', gotData, errData)
}

const gotData = (data) => {
    console.log(data.val());

    const firebasedata = document.getElementById('fireabasedata');
    const returnedData = data.val();
    firebasedata.value = returnedData.toString();
}

const errData = (err) => {
    console.log("Error!" + err);
}