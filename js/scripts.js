/***
 * FSJS Techdegree Project 4
 * Public API Request
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
 * Public fetch request to the random user API. 
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
 * @return {array} - returns the `randomUsers` array.
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
 * `displayModal` function - displays a modal with more details when the corresponding employee (random user) card is clicked to or viewed using the next or previos modal buttons.
 * @param {object} userToView - accepts a single user object whose card was clicked or viewed using the previous or next modal buttons.
 */

function displayModal(userToView) {
    /***
     * The following code adds a picture as well as name, email, phone, location, and birthday details to the modal window.
     * The modal window is appended to the `pageBody`.
     */
    let modalContent = ``;
    const newDiv = document.createElement('div');
    newDiv.className = 'modal-container';
    const birthMonth = userToView.dob.date.slice(5,7);
    const birthday = userToView.dob.date.slice(8,10);
    const birthYear = userToView.dob.date.slice(0,4);
    modalContent += 
    `<div class="modal">
        <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
        <div class="modal-info-container">
            <img class="modal-img" src="${userToView.picture.large}" alt="profile picture">
            <h3 id="name" class="modal-name cap">${userToView.name.first} ${userToView.name.last}</h3>
            <p class="modal-text">${userToView.email}</p>
            <p class="modal-text cap">${userToView.location.city}</p>
            <hr>
            <p class="modal-text">${userToView.phone}</p>
            <p class="modal-text">${userToView.location.street.number} ${userToView.location.street.name}, ${userToView.location.city}, ${userToView.location.state} ${userToView.location.postcode}</p>
            <p class="modal-text">Birthday: ${birthMonth}/${birthday}/${birthYear}</p>
        </div>
    </div>
    <div class="modal-btn-container">
        <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
        <button type="button" id="modal-next" class="modal-next btn">Next</button>
    </div>`;
    newDiv.innerHTML = modalContent;
    pageBody.appendChild(newDiv);

    /***
     * The following code calls the `togglePrevious` and `toggleNext`. 
     * If the search function was used, the `togglePrevious` and toggleNext` functions are passed in user objects from the `filteredUsers` array.
     * If the search function was used, the `togglePrevious` and toggleNext` functions are passed in user objects from the `randomUsers` array.
     * Conditions are also included that prevent use of the previous and next buttons when the end of the passed in array is reached.
     */
    if (filteredUsers.length > 0) {
        const clickedIndex = (filteredUsers.indexOf(userToView));
        if (clickedIndex !== 0) {
            togglePrevious(filteredUsers[clickedIndex - 1]);
        }
        if (clickedIndex !== filteredUsers.length -1) {
            toggleNext(filteredUsers[clickedIndex + 1]);
        }
    } else {
        const clickedIndex = (randomUsers.indexOf(userToView));
        if (clickedIndex !== 0) {
            togglePrevious(randomUsers[clickedIndex - 1]);
        }
        if (clickedIndex !== randomUsers.length -1) {
            toggleNext(randomUsers[clickedIndex + 1]);
        }
    }
    /***
     * Called the `closeModal` function so that the modal can be closed.
     */
    closeModal(); 
}


/***
 * `searchUsers` function - adds a keyup listener to the search input and pushes filtered results into the `filteredUsers` global variable.
 * The `displayUsers` and `cardClickEvent` are called on the `filteredUsers`array.
 * The `searchUsers` function is called.
 */

function searchUsers() {
    const search = document.getElementById('search-input');
    const searchSubmit = document.getElementById('search-submit');
    search.addEventListener('input', () => {
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

    searchSubmit.addEventListener('click', () => {
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


/***
 * `cardClickEvent` function - adds a click event listener to the user cards and calls the `displayModal` function on the clicked card.
 * @param {array} arrayOfUserObjects - accepts an array of user objects.
 */

function cardClickEvent(arrayOfUserObjects) {
    const card = document.querySelectorAll('.card');
    for (let i = 0; i < card.length; i += 1) {
        card[i].addEventListener('click', () => {
            displayModal(arrayOfUserObjects[i]);
        });
    }
}


/***
 * `togglePrevious` function - displays the previous user modal.
 * @param {object} prevUserObject - accepts a user object.
 */

function togglePrevious(prevUserObject) {
    const modalContainer = document.querySelector('.modal-container');
    const prevButton = document.getElementById('modal-prev');
    prevButton.addEventListener('click', () => {
        pageBody.removeChild(modalContainer);
        displayModal(prevUserObject);
    });
}


/***
 * `toggleNext` function - displays the next user modal.
 * @param {object} nextUserObject - accepts a user object.
 */

function toggleNext(nextUserObject) {
    const modalContainer = document.querySelector('.modal-container');
    const nextButton = document.getElementById('modal-next');
    nextButton.addEventListener('click', () => {
        pageBody.removeChild(modalContainer);
        displayModal(nextUserObject);
    });
}


/***
 * `closeModal` function - closes the modal window when the 'X' close button or outside the modal is clicked.
 */

function closeModal() {
    const modalContainer = document.querySelector('.modal-container');    
    modalContainer.addEventListener('click', (event) => {
        if (event.target.innerText === 'X' || event.target.classList.contains('modal-container')) {
            modalContainer.parentNode.removeChild(modalContainer);
        }
    });
}


