/***
 * FSJS Techdegree Project 4
 * Public API Request for an Employee Directory
 * By Stheven Cabral
 */


/***
 * `pageBody` global variable captures the <body> element.
 * `searchContainer` global variable captures the <div> container with the class `search-container`.
 * `galleryContainer` global variable captures the <div> container with the class `gallery`.
 * `randomUsers` global variable initiates an empty array that will hold 12 user objects from the random user API.
 * `filteredUsers` global variables initiates an empty array that will hold search filtered user objects.
 */

 
 const pageBody = document.querySelector('body');
 const searchContainer = document.querySelector('.search-container');
 const galleryContainer = document.getElementById('gallery');
 let randomUsers = [];
 let filteredUsers = [];
 

/**
 * Public Fetch request to the random user API. 
 * The data is parsed to JSON, then the `displayUsers` function is called on the data results.
 * The output of the `storeUsers` function is returned and is then passed into the `cardClickEvent` function.
 */

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(users => users.json())
.then(data => {
    displayUsers(data.results);
    return storeUsers(data.results)})
.then((data) => {cardClickEvent(data)});


/***
 * `addSearchBar` function - adds a search bar to the page.
 * Called the `addSearchBar` function.
 */

function addSearchBar() {
    searchContainer.innerHTML = 
    `<form action="#" method="get">
       <input type="search" id="search-input" class="search-input" placeholder="Search...">
       <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
   </form>`;
}
addSearchBar();


/***
 * `storeUsers` function - pushes user objects to the `randomUsers` array.
 * @param {array} arrayOfUserObjects - accepts an array of objects.
 * @return {array} - Array of random users.
 */

function storeUsers(arrayOfUserObjects) {
    for (let i = 0; i < arrayOfUserObjects.length; i += 1) {
        randomUsers.push(arrayOfUserObjects[i]);
    }
    return randomUsers;
}


/***
 * `displayUsers` function - displays the fetched 12 random users on screen as employee cards.
 * @param {array} arrayOfUserObjects - accepta an array of user objects.
 */

function displayUsers(arrayOfUserObjects) {
    let galleryContent = ``;
    for (let i = 0; i < arrayOfUserObjects.length; i += 1) {
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
}


/***
 * `displayModal` function - displays a modal with more employee details when the corresponding employee card is clicked.
 * @param {object} clickedUser 
 */

function displayModal(clickedUser) {
    let modalContent = ``;
    const newDiv = document.createElement('div');
    newDiv.className = 'modal-container';
    const birthMonth = clickedUser.dob.date.slice(5,7);
    const birthday = clickedUser.dob.date.slice(8,10);
    const birthYear = clickedUser.dob.date.slice(0,4);
    modalContent += 
    `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${clickedUser.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${clickedUser.name.first} ${clickedUser.name.last}</h3>
            <p class="modal-text">${clickedUser.email}</p>
            <p class="modal-text cap">${clickedUser.location.city}</p>
            <hr>
            <p class="modal-text">${clickedUser.phone}</p>
            <p class="modal-text">${clickedUser.location.street.number} ${clickedUser.location.street.nae}, ${clickedUser.location.city}, ${clickedUser.location.state} ${clickedUser.location.postcode}</p>
            <p class="modal-text">Birthday: ${birthMonth}/${birthday}/${birthYear}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
    newDiv.innerHTML = modalContent;
    pageBody.appendChild(newDiv);

    if (filteredUsers.length > 0) {
        const clickedIndex = (filteredUsers.indexOf(clickedUser));
        if (clickedIndex !== 0) {
            togglePrevious(filteredUsers[clickedIndex - 1]);
        }
        if (clickedIndex !== filteredUsers.length -1) {
            toggleNext(filteredUsers[clickedIndex + 1]);
        }
    } else {
        const clickedIndex = (randomUsers.indexOf(clickedUser));
        if (clickedIndex !== 0) {
            togglePrevious(randomUsers[clickedIndex - 1]);
        }
        if (clickedIndex !== randomUsers.length -1) {
            toggleNext(randomUsers[clickedIndex + 1]);
        }
    }
    closeModal(); 
}


/***
 * Search bar functionality.
 */

function searchUsers() {
    const search = document.querySelector('#search-input');
    search.addEventListener('keyup', () => {
        filteredUsers = [];
        galleryContainer.innerHTML = ``;
        for (let i = 0; i < randomUsers.length; i += 1) {
            if (randomUsers[i].name.first.toLowerCase().includes(search.value.toLowerCase()) || randomUsers[i].name.last.toLowerCase().includes(search.value.toLowerCase())) {
            filteredUsers.push(randomUsers[i]);
            }
        }
    displayUsers(filteredUsers);
    cardClickEvent(filteredUsers);
    });
};
searchUsers();



function cardClickEvent(arrayOfUserObjects) {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i += 1) {
        card[i].addEventListener('click', () => {
            displayModal(arrayOfUserObjects[i]);
        });
    }
}


function togglePrevious(prevUserObject) {
    const modalContainer = document.querySelector('.modal-container');
    const prevButton = document.getElementById('modal-prev');
    prevButton.addEventListener('click', () => {
        pageBody.removeChild(modalContainer);
        displayModal(prevUserObject);
    });
}


function toggleNext(nextUserObject) {
    const modalContainer = document.querySelector('.modal-container');
    const nextButton = document.getElementById('modal-next');
    nextButton.addEventListener('click', () => {
        pageBody.removeChild(modalContainer);
        displayModal(nextUserObject);
    });
}

function closeModal() {
    const modalContainer = document.querySelector('.modal-container');    
    modalContainer.addEventListener('click', (event) => {
        if (event.target.innerText === 'X' || event.target.classList.contains('modal-container')) {
            modalContainer.parentNode.removeChild(modalContainer);
        }
    });
}


