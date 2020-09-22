const database = firebase.database();

const getKeys = () => {
    let dropdown = document.getElementById("submissions");
    let ref = database.ref("Disputes");

    ref.on("value", function (snapshot) {
        snapshot.forEach(function (childSnapshot) {

            //add the list of ARN's to the dropdown so we can review the data
            let option = document.createElement("OPTION");
            option.innerHTML = childSnapshot.key;
            option.value = childSnapshot.key;
            dropdown.options.add(option);

            var childData = childSnapshot.val();
            var id = childData.id;
            console.log(childData);
        });
    });
}

//TODO: update box to reflect data pulled from firebase