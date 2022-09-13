import { onGalleryClick } from './gallery-popular-films';

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
    libraryWrap.classList.remove('gallery');
    const emptyLibrary = `<div class="empty-library"> 
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

function onBtnQueueClick() {
  libraryWrap.innerHTML = ' ';
  watchedBtn.classList.remove('library--btn--active');
  queueBtn.classList.add('library--btn--active');

  queueMovies = JSON.parse(localStorage.getItem('queueMovies'));
  const noQueue = queueMovies === null || queueMovies === '[]';

  if (noQueue) {
    const emptyQueue = `<div class="container empty-library"> 
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
        <p class="empty-library__title">NO MOVIES IN WATCHED!</p>
        </div>`;
    libraryWrap.innerHTML = emptyWatched;
  } else {
    renderMarkup(watchedMovies);
  }
}

function renderMarkup(savedMovies) {
  console.log(savedMovies);
  libraryWrap.innerHTML = createMarkup(savedMovies);
  const galleryItems = document.querySelectorAll('.card-set__item');

  galleryItems.forEach(card =>
    card.removeEventListener('click', onGalleryClick)
  );
  galleryItems.forEach(card => card.addEventListener('click', onGalleryClick));
}

function createMarkup(movies) {
  return movies
    .map(movie => {
      const { poster_path, title, id, genres, release_date } = movie;

      const genresList = genres.map(item => item.name).join(', ');
      const releaseYear = release_date.slice(0, 4);

      return `
      <li class="card-set__item" id="${id}">
      <a href='#' id='${id}' class="card-link">
      <img id="${id}"
          loading="lazy"
          src="https://image.tmdb.org/t/p/original${poster_path}"
          alt="${title}"
          class="card-set__img "
          
      />
    
      <h3 class="card-set__title">${title}</h3>
      <div class="card-set__description" id="${id}">
      <span class="card-set__genre" id="${id}">
          ${genresList} &nbsp| ${releaseYear}
      </span>
      
      </div>
      </a>
      </li>
      `;
    })
    .join('');
}
