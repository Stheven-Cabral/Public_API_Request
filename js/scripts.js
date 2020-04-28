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
 const pageBody = document.querySelector('body');


/**
 * Public Fetch request to the random user API. 
 */

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(users => users.json())
.then(data => {return displayUsers(data)})
.then((data) => {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i += 1) {
        card[i].addEventListener('click', () => {
            console.log(data[i]);
        });
    }
});


/***
 * `displayUsers` function - displays the 12 random users on screen.
 */

function displayUsers(randomUsersObject) {
    let galleryContent = ``;
    const arrayOfUserObjects = randomUsersObject.results;
    for (let i = 0; i < arrayOfUserObjects.length; i += 1) {
        randomUsers.push(arrayOfUserObjects[i]);
        galleryContent += 
        `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${arrayOfUserObjects[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${arrayOfUserObjects[i].name.first} ${arrayOfUserObjects[i].name.last}</h3>
                <p class="card-text">${arrayOfUserObjects[i].email}</p>
                <p class="card-text cap">${arrayOfUserObjects[i].location.city}, ${arrayOfUserObjects[i].location.state}</p>
            </div>
        </div>`;
    }
    galleryContainer.innerHTML = galleryContent;
    return randomUsers;
}

function displayModal(clickedUser) {
    let modalContent = ``;
    const birthMonth =
    const birthday = clickedUser.dob.date.slice(6,8);
    const birthYear =
    modalContent += 
    `<div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${clickedUser.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${clickedUser.name.first} ${clickedUser.name.last}</h3>
                <p class="modal-text">${clickedUser.email}</p>
                <p class="modal-text cap">${clickedUser.location.city}</p>
                <hr>
                <p class="modal-text">${clickedUser.phone}</p>
                <p class="modal-text">${clickedUser.location.street.number} ${clickedUser.location.street.nae}, ${clickedUser.location.city}, ${clickedUser.location.state} ${clickedUser.location.postcode}</p>
                <p class="modal-text">Birthday: 10/21/2015</p>
            </div>
        </div>

        <div class="modal-btn-container">
            <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
            <button type="button" id="modal-next" class="modal-next btn">Next</button>
        </div>
    </div>`;
}


