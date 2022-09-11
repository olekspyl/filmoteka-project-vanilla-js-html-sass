import createMarkup from './js/markupForGallery';

let watchedMovies = [];
let queueMovies = [];

const libraryLink = document.querySelector('.js-my-library');
const libraryWrap = document.querySelector('.library-list');

libraryLink.addEventListener("click", onLibraryLinkClick);

function onLibraryLinkClick() {
    libraryWrap.innerHTML = ' ';

    watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
    queueMovies = JSON.parse(localStorage.getItem('queueMovies'));
    const noWatched = watchedMovies === null;
    const noQueue = queueMovies === null;

    if (noWatched && noQueue) {
        const emptyLibrary = `<div class="empty-library"> <img class="empty-library__img" src="images/empty_library.jpg" alt="library is empty" /> <p class="empty-library__title">YOUR LIBRARY IS EMPTY!</p> </div>`;
        libraryWrap.innerHTML = emptyLibrary;
    }

    if (!noQueue) {
        renderMarkup(queueMovies);
    }

    if (!noWatched) { 
        renderMarkup(watchedMovies);
    }
}

function renderMarkup(savedMovies) {
    libraryWrap.innerHTML= createMarkup(savedMovies);
}
