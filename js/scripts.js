/***
 * FSJS Techdegree Project 4
 * Public API Request for an Employee Directory
 * By Stheven Cabral
 */


/**
 * Public Fetch request to the random user API. 
 */

fetch('https://randomuser.me/api/?results=12&format=json').then(results => {console.log(results.json())});