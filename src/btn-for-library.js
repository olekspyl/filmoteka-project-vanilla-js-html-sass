import createMarkup from './js/markupForGallery';

let watchedMovies = [];
let queueMovies = [];

const libraryWrap = document.querySelector('.library-list');
const watchedBtn = document.querySelector('.library--btn__watched');
const queueBtn = document.querySelector('.library--btn__queue');

watchedBtn.addEventListener('click', onBtnWatchedClick);
queueBtn.addEventListener('click', onBtnQueueClick);

onLibraryLinkClick();

function onLibraryLinkClick() {
  libraryWrap.innerHTML = ' ';

  watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  queueMovies = JSON.parse(localStorage.getItem('queueMovies'));
  const noWatched = watchedMovies === null;
  const noQueue = queueMovies === null;

  if (noWatched && noQueue) {
    const emptyLibrary = `<div class="empty-library"> 
    <img class="empty-library__img" src="./images/header-in-desktop.jpg" alt="library is empty" />
    <p class="empty-library__title">YOUR LIBRARY IS EMPTY!</p>
    </div>`;
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
  libraryWrap.innerHTML = createMarkup(savedMovies);
}

function onBtnQueueClick() {
  libraryWrap.innerHTML = ' ';
  watchedBtn.classList.remove('library--btn--active');
  queueBtn.classList.add('library--btn--active');

  queueMovies = JSON.parse(localStorage.getItem('queueMovies'));
  const noQueue = queueMovies === null || queueMovies === '[]';

  if (noQueue) {
    const emptyQueue = `<div class="container empty-library"> 
        <img class="empty-library__img" src="images/empty_library.jpg" alt="queue is empty" />
        <p class="empty-library__title">NO MOVIES TO WATCH IN QUEUE!</p>
        </div>`;
    libraryWrap.innerHTML = emptyQueue;
  } else {
    renderMarkup(queueMovies);
  }
}

function onBtnWatchedClick() {
  libraryWrap.innerHTML = ' ';
  queueBtn.classList.remove('library--btn--active');
  watchedBtn.classList.add('library--btn--active');

  watchedMovies = JSON.parse(localStorage.getItem('watchedMovies'));
  const noWatched = watchedMovies === null || watchedMovies === '[]';

  if (noWatched) {
    const emptyWatched = `<div class="container empty-library"> 
        <img class="empty-library__img" src="images/empty_library.jpg" alt="watched is empty" />
        <p class="empty-library__title">NO MOVIES IN WATCHED!</p>
        </div>`;
    libraryWrap.innerHTML = emptyWatched;
  } else {
    renderMarkup(watchedMovies);
  }
}
