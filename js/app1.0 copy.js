"use strict"
document.addEventListener("DOMContentLoaded", function () {
    serverData.getJSON();
});
//localStorage.clear();


let serverData= {
    url : "https://griffis.edumedia.ca/mad9014/sports/quidditch.php"
    , httpRequest:"GET"
    , getJSON: function () {
        let headers = new Headers();
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
        // Now the best way to get this data all together is to use an options object:
        // Create an options object
        let options = {
            method: this.httpRequest
            , mode: "cors"
            , headers: headers
        };
        // Create an request object so everything we need is in one package
        let request = new Request(this.url, options);
        console.log(request);
        fetch(request).then(function (response) {
//            console.log(response);
            return response.json();
        }).then(function (data) {
//            console.log(data); // now we have JS data, let's display it
            localStorage.setItem("key", JSON.stringify(data));
            let myData = JSON.parse(localStorage.getItem("key"));
            console.log(myData);
    })
                }
};
            // Call a function that uses the data we recieved 
//            displayData(data);

            let scores = serverData.myData.scores;
            console.log(scores);
            let houses = myData.teams;
            console.log(houses);
            
            for( var i = 0; i <= scores.length; i++){
                console.log(scores[i]);
                let someDiv = document.createElement("div");
                let house = "";
/*************************** Date ***********************/
                let someDate = document.createElement("p");
                someDate.textContent = scores[i].date;
                someDate.className = "date";
/********************match 1 ****************************/
                let someTeam = document.createElement("p");
//                house = scores[i].games[0].home;
//                house = check(scores[i].games[0].home);
//                  console.log(house);
                
//                function check(houses) {
    var teamName = "";
//    for (let i = 0; i < serverData.houses.length; i++) {
        if (houses[i].id == houses){
            teamName = houses[i].name;
             console.log(teamName);
        }
    }
           
});
    
//                let addDiv = document.getElementById("date").appendChild(someDiv);
//                someDiv.appendchild(addDiv);
            }
        };
//        }).catch(function (err) {
//            alert("Error: " + err.message);
//        });
    


