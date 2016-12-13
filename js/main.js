"use strict";

if(document.deviceready){
    document.addEventListener('deviceready',function(){
        app.onDeviceReady();    
});
}else{
    document.addEventListener('DOMContentLoaded', function(){
        app.onDeviceReady();
    });
};

var app = {
  pages: [],
  links: [],
  Btn:"",
  onDeviceReady: function(){
      serverData.getJSON();
      
    app.pages = document.querySelectorAll('[data-role="page"]');
    app.links = document.querySelectorAll('[data-role="links"]');
    document.querySelector(".refreshBtn").addEventListener("click", function(){
        localStorage.clear();
        document.querySelector(".results-list").innerHTML = "";
        document.querySelector(".standings").innerHTML = "";
        serverData.getJSON();
    }),                                                                                                       
    [].forEach.call(app.links, function(item){
      item.addEventListener("click", app.nav);
//      console.log(item.href);
    })
  },
    nav: function(ev){
    ev.preventDefault();  //stop the link from doing anything
//    console.log("clicked");
    var item = ev.currentTarget;  //the anchor tag
    var href = item.href;  //the href attribute
    var id = href.split("#")[1];  //just the letter to the right of "#"
    
    [].forEach.call(app.pages, function(item){
      if( item.id == id){
        item.className = "active";
      }else{
        item.className = "";
      }
    });
  },
  }

let serverData= {
    url:"https://griffis.edumedia.ca/mad9014/sports/quidditch.php",
    httpRequest: "GET",
    getJSON: function(){
/**********Add headers and options objects*********************************
***********Create an empty Request Headers instance***********************/
        let headers = new Headers();
/******** Add a header(s) , key value pairs sent to the server************/
        headers.append("Content-Type", "text/plain");
        headers.append("Accept", "application/json; charset=utf-8");
/****************show them in the console*********************************/
        console.dir("headers: " + headers.get("Content-Type"));
        console.dir("headers: " + headers.get("Accept"));
/****************Now the best way to get this data all together ***********            ***********is to use an options object: Create an options object *********/
        let options = {
            method:serverData.httpRequest,
            mode:"cors",
            headers:headers
        };
/***********make a request object so everything is in one place***********/
         let request = new Request(serverData.url, options);
//            console.log(request);
/*************************************************************************
                                FETCH
*************************************************************************/
        fetch(request)
            .then(function(response){
//                console.log(response);
            return response.json();
        })
        .then(function(data){
//            console.log(data);
/**************Call a function that uses the data we received************/
            displayData(data);
        })
//        .catch(function(err){
//            alert("Error: " + err.message);
//        });
    }
};
/**************************End of fetch call*****************************/

function displayData(data){
/*******************set data to local storage***************************/
    localStorage.setItem("key",JSON.stringify(data));
//    console.log(data);
    
    let myData = JSON.parse(localStorage.getItem("key"));
//    console.log(myData);
    
//    console.log(myData.teams);
//    console.log(myData.scores);
    
    let points = myData.scores;
    let houses = myData.teams;
    
    let houseList = [];
    
    houses.forEach(function (value){
        var house = {
            teamID: value.id,
            houseName: getHouseNames(houses, value.id),
            wins: 0,
            loss: 0,
            tie: 0,
            points: 0,
        };
        houseList.push(house);
    })
    
    let table = document.querySelector(".results-list");
    let table2 = document.querySelector(".standings");
/**************clear existing items********************/
    table.innerHTML="";
//    console.log(myData);
/*************Get points values***********************/
    
    points.forEach(function(value){
        let games = value.games
//        console.log(games);
        
        let homeTeam = null;
        let awayTeam = null;
        
    console.log(houseList);
        games.forEach(function(value2){
            let homeScore = value2.home_score;
//            console.log(homeScore);
            let awayScore = value2.away_score;
//            console.log(awayScore);
            
            homeTeam = getHouseNames(houses, value2.home);
            awayTeam = getHouseNames(houses, value2.away);
              
        if (homeScore > awayScore){
            for (var i = 0; i < houseList.length; i++){
                if(value2.home == houseList[i].teamID){
                    houseList[i].wins++; houseList[i].points = houseList[i].points + homeScore;} }
            for (var i = 0; i < houseList.length; i++){
                if(value2.away == houseList[i].teamID){
                    houseList[i].loss++; houseList.points = houseList.points + awayScore;} }
                }   
        if (awayScore > homeScore){
                for (var i = 0; i < houseList.length; i++){
                    if(value2.away == houseList[i].teamID){
                        houseList[i].wins++; houseList[i].points = houseList[i].points + awayScore;} }
                for (var i = 0; i < houseList.length; i++){
                    if(value2.home == houseList[i].teamID){
                        houseList[i].loss++; houseList[i].points = houseList[i].points + homeScore;} }
                    }
        if (homeScore == awayScore){
            for (var i = 0; i < houseList.length; i++){
                if(value2.home == houseList[i].teamID){
                   houseList[i].tie++; houseList[i].points = houseList[i].points + homeScore;} }
            for (var i = 0; i < houseList.length; i++){
                if(value2.away == houseList[i].teanID){
                    houseList[i].tie++; houseList[i].points = houseList[i].points + awayScore;}}
                }
            
        let th = document.createElement("th");
        th.textContent = value.date;
            th.setAttribute("colspan",3);
            
        let tr = document.createElement("tr");
        tr.className = "score";
        
//          let tr = document.createElement("tr");
            let home = document.createElement("td");
            home.className = "vsHome"
            home.innerHTML = homeTeam;
            
            let vs = document.createElement("td");
            vs.textContent=" vs ";
            
            let away = document.createElement("td");
            away.className = "vsAway";
            away.innerHTML = awayTeam;
            
            let div = document.createElement("div");
            div.id = "house";
            div.className = homeTeam;
            let div2 = document.createElement("div");
            div2.id = "house";
            div2.className = awayTeam;
            
            let originalLogo = document.querySelector("section.template svg");
            let copyLogo = originalLogo.cloneNode(true);
            let copyLogo2 = originalLogo.cloneNode(true);
            
            div.appendChild(copyLogo);
//            console.log(div);
            div2.appendChild(copyLogo2);
//            console.log(div2);
            home.appendChild(div);
//            console.log(home);
            away.appendChild(div2);
//            console.log(div2);
            tr.appendChild(home);
//            console.log(tr);
            tr.appendChild(vs);
            tr.appendChild(away);
            table.appendChild(th);
            table.appendChild(tr);  
                   
        })
          
    })
    
    houseList.sort(sorting("points"));
    
    
    houseList.forEach(function(value3){
        
            let tHouse = value3.houseName;
            let tWins = value3.wins
            let tLoss = value3.loss;
            let tTie = value3.tie;
            let tPoints = value3.points;
        
            let tableHouse = document.createElement("td");
            tableHouse.innerHTML = tHouse;
           
            let tr = document.createElement("tr");
            let tr2 = document.createElement("tr");
            
            let house = document.createElement("th");
            house.innerHTML = "Houses";
            let wins = document.createElement("th");
            wins.innerHTML = "Wins";
            let tie = document.createElement("th");
            tie.innerHTML = "Ties";
            let loss = document.createElement("th");
            loss.innerHTML = "Losses";
            let points = document.createElement("th");
            points.innerHTML ="Total Points";
        
            let tableWins = document.createElement ("td");
            tableWins.className = "tableWins";
            tableWins.innerHTML = tWins;
        
            let tableLoss = document.createElement ("td");
            tableLoss.className = "tableLoss";
            tableLoss.innerHTML = tLoss;
        
            let tableTie = document.createElement ("td");
            tableTie.className = "tableTie";
            tableTie.innerHTML = tTie;
        
            let tablePoints = document.createElement ("td");
            tablePoints.className = "tablePoints";
            tablePoints.innerHTML = tPoints;
        
            let div = document.createElement("div");
            div.id="house"
            div.className= tHouse;
        
            let originalLogo = document.querySelector("section.template svg");
            let copyLogo = originalLogo.cloneNode(true);
        
        tr2.appendChild(div);
        div.appendChild(copyLogo);
//        console.log(div);
        
        table2.appendChild(tr);
        tr.appendChild(house);
        tr.appendChild(wins);
        tr.appendChild(tie);
        tr.appendChild(loss);
        tr.appendChild(points);
        
        tr2.appendChild(tableWins);
        tr2.appendChild(tableTie);
        tr2.appendChild(tableLoss);
        tr2.appendChild(tablePoints);
        table2.appendChild(tr2);
     
//        console.log("house: " + tHouse + " wins: " + tWins + " Losses: " + tLoss + " Ties: " + tTie + " points: " + tPoints);
    })
}
/***************checking ID -> Names************/
function getHouseNames(teams, id){
    
    for (var i = 0; i < teams.length; i++){
        if(teams[i].id == id){
            return teams[i].name;
        }
    }
    return "?!?!?!";
}
/**********************Sorting*******************/
function sorting(property){
    var sortOrder = 1;
    if(property[0] === "-"){
        sortOrder = -1;
        property = property.substr(1);
    }
    return function (b,a) {
        var result = (a[property]< b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
         return result * sortOrder;
    }
}
/******************Refresh***********************/
function refreshBtn(){
    localStorage.clear();
    serverData.getJSON();
    tables.innerHTML= "";
}