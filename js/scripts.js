/***
 * FSJS Techdegree Project 4
 * Public API Request for an Employee Directory
 * By Stheven Cabral
 */


/***
 * `randomUsers
 */

 let randomUsers = [];
 const galleryContainer = document.getElementById('gallery');


/**
 * Public Fetch request to the random user API. 
 */

fetch('https://randomuser.me/api/?results=12')
.then(users => users.json())
.then(data => {
    console.log(data);
    displayUsers(data)});

function displayUsers (arrayOfUsers) {
    let galleryContent = ``;
    for (let i = 0; i < arrayOfUsers.results.length; i += 1) {
        randomUsers.push(data.results[i]);
        galleryContent += `<div class="card">
                           <div class="card-img-container">
                           <img class="card-img" src="https://placehold.it/90x90" alt="profile picture">
                           </div>
                           <div class="card-info-container">
                             <h3 id="name" class="card-name cap">first last</h3>
                             <p class="card-text">email</p>
                             <p class="card-text cap">city, state</p>
                           </div>
                        </div>`
    }
}


