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
    watchedBtn.classList.remove('library--btn--active');
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
      const { poster_path, title, id, genres, release_date, vote_average } =
        movie;

      const vote = vote_average.toFixed(1);
      let formatedGenres;
      let genresList;
      genresList = genres.map(item => item.name).slice(0, 2);
      if (genres.length > 2) {
        genresList.push('Other');
      }
      formatedGenres = genresList.join(', ');
      // const genresList = genres.map(item => item.name).slice(0, 2);
      // genresList.push('Other');

      // const formatedGenres = genresList.join(', ');
      const releaseYear = release_date.slice(0, 4);
      let formatedPosterPath = '';
      if (poster_path === null) {
        formatedPosterPath = 'uc4RAVW1T3T29h6OQdr7zu4Blui.jpg';
      } else {
        formatedPosterPath = poster_path;
      }
      return `
      <li class="card-set__item" id="${id}">
      <a href='#' id='${id}' class="card-link">
       <picture>
                    <source srcset="
                    http://image.tmdb.org/t/p/w780/${formatedPosterPath} 1x,
                   http://image.tmdb.org/t/p/original/${formatedPosterPath} 2x" media="(min-width: 1280px)" type="image/jpeg" />
                    <source srcset="
                    http://image.tmdb.org/t/p/w342/${formatedPosterPath} 1x,
                    http://image.tmdb.org/t/p/w500/${formatedPosterPath} 2x" media="(min-width: 768px)" type="image/jpeg" />
                    <source srcset="
                    http://image.tmdb.org/t/p/w185/${formatedPosterPath} 1x,
                    http://image.tmdb.org/t/p/w342/${formatedPosterPath} 2x" media="(max-width: 480px)" type="image/jpeg" />
         <img id="${id}
          loading="lazy"
          src="http://image.tmdb.org/t/p/w342/${formatedPosterPath}"
          alt="${title}"
          class="card-set__img "/>
      </picture>
      
    
      <h3 class="card-set__title">${title}</h3>
      <div class="card-set__description" id="${id}">
      <span class="card-set__genre flex" id="${id}">
          ${formatedGenres} &nbsp| ${releaseYear}
          <span class="vote"> ${vote}</span>
      </span>
      
      </div>
      </a>
      </li>
      `;
    })
    .join('');
}
