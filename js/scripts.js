/***
 * FSJS Techdegree Project 4
 * Public API Request for an Employee Directory
 * By Stheven Cabral
 */


/***
 * `randomUsers
 */

 let randomUsers = [];


/**
 * Public Fetch request to the random user API. 
 */

fetch('https://randomuser.me/api/?results=12')
.then(users => users.json())
.then(data => {
    for (let i = 0; i < data.results.length; i += 1) {
        randomUsers.push(data.results[i]);
    }
    console.log(randomUsers);
});


