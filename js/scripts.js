/***
 * FSJS Techdegree Project 4
 * Public API Request for an Employee Directory
 * By Stheven Cabral
 */


/***
 * `randomUsers
 */

 let randomUsers = [];
 const searchContainer = document.querySelector('.search-container');
 const galleryContainer = document.getElementById('gallery');
 const pageBody = document.querySelector('body');


/**
 * Public Fetch request to the random user API. 
 */

fetch('https://randomuser.me/api/?results=12&nat=us')
.then(users => users.json())
.then(data => {
    storeUsers(data.results);
    return displayUsers(data.results)})
.then((data) => {cardClickEvent(data)});


/***
 * `displayUsers` function - displays the 12 random users on screen.
 */

function storeUsers(randomUsersObject) {
    for (let i = 0; i < randomUsersObject.length; i += 1) {
        randomUsers.push(randomUsersObject[i]);
    }
}

function displayUsers(randomUsersObject) {
    let galleryContent = ``;
    for (let i = 0; i < randomUsersObject.length; i += 1) {
        galleryContent += 
        `<div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${randomUsersObject[i].picture.large}" alt="profile picture">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${randomUsersObject[i].name.first} ${randomUsersObject[i].name.last}</h3>
                <p class="card-text">${randomUsersObject[i].email}</p>
                <p class="card-text cap">${randomUsersObject[i].location.city}, ${randomUsersObject[i].location.state}</p>
            </div>
        </div>`;
    }
    galleryContainer.innerHTML = galleryContent;
    return randomUsers;
}

function addSearchBar() {
     searchContainer.innerHTML = 
     `<form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
    </form>`;
}
addSearchBar();

function displayModal(clickedUser) {
    let modalContent = ``;
    const newDiv = document.createElement('div');
    newDiv.className = 'modal-container';
    const clickedIndex = (randomUsers.indexOf(clickedUser));
    console.log(clickedUser);
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
    togglePrevious(randomUsers[clickedIndex - 1]);
    toggleNext(randomUsers[clickedIndex + 1]);
}


/***
 * Search bar functionality.
 */
const search = document.querySelector('#search-input');
search.addEventListener('keyup', () => {
    let filteredUsers = [];
    galleryContainer.innerHTML = ``;
    
    for (let i = 0; i < randomUsers.length; i += 1) {
        if (randomUsers[i].name.first.toLowerCase().includes(search.value.toLowerCase()) || randomUsers[i].name.last.toLowerCase().includes(search.value.toLowerCase())) {
            filteredUsers.push(randomUsers[i]);
        }
    }
    displayUsers(filteredUsers);
    cardClickEvent(filteredUsers);
    // Add a new parameter at line 68 that accepts and array of Users, and replace randomUsers. Then add array arguments where displayModal is used.
});
// const studentListItems = document.querySelectorAll('.student-item');
// const studentNames = document.querySelectorAll('.student-details h3');
// function searchList(searchInput, names, students) {
//     let searchResults = [];
 
//     for (let i = 0; i < students.length; i += 1) {
//        students[i].style.display = 'none';
//        if (searchInput.value.length !== 0 && names[i].textContent.toLowerCase().includes(searchInput.value.toLowerCase())) {
//           students[i].style.display = 'block';
//           searchResults.push(students[i]);
//           showPage(searchResults, 1);
//        } else if (searchInput.value.length === 0) {
//           students[i].style.display = 'block';
//           searchResults.push(students[i]);
//           showPage(studentListItems, 1);
//        }
//     }
//     adjustPagination(searchResults);
//     addNoResultAlert(searchResults);
//   }


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

// function closeModal() {}


