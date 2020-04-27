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

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(users => users.json())
.then(data => {
    console.log(data);
    displayUsers(data)});


/***
 * `displayUsers` function - displays the 12 random users on screen.
 */

function displayUsers (randomUsersObject) {
    let galleryContent = ``;
    const arrayOfUserObjects = randomUsersObject.results;
    for (let i = 0; i < arrayOfUserObjects.length; i += 1) {
        randomUsers.push(arrayOfUserObjects[i]);
        galleryContent += `<div class="card">
                           <div class="card-img-container">
                           <img class="card-img" src="${arrayOfUserObjects[i].picture.large}" alt="profile picture">
                           </div>
                           <div class="card-info-container">
                             <h3 id="name" class="card-name cap">${arrayOfUserObjects[i].name.first} ${arrayOfUserObjects[i].name.last}</h3>
                             <p class="card-text">${arrayOfUserObjects[i].email}</p>
                             <p class="card-text cap">${arrayOfUserObjects[i].location.city}, ${arrayOfUserObjects[i].location.state}</p>
                           </div>
                           </div>`
    }
    galleryContainer.innerHTML = galleryContent;
}


