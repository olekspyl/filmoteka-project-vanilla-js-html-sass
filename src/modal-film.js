import { getMovieById } from './fetch-movie';

const modalOneFilmRef = document.querySelector('.film-card');
const backdropRef = document.querySelector('.backdrop');

const renderModalOneFilm = modalFilm => {
  const {
    poster_path,
    title,
    id,
    vote_average,
    vote_count,
    popularity,
    original_title,
    genres,
    overview,
  } = modalFilm;

  const genresList = genres.map(item => item.name).join(', ');

  const markupModalOneFilm = `<div class="film-card__image-block">
        <img
          class="film-card__image"
          src="https://image.tmdb.org/t/p/original${poster_path}"
          alt="film"
        />
      </div>
      <div class="film-card__description">
        <h1 class="film-card__description-title">${title}</h1>
        <ul class="film-card__description-set">
          <li class="description-set">
            <p class="description-set__text">Vote / Votes</p>
            <p class="description-set__value">
              <span class="description-set__rating">${vote_average}</span>
              <span class="description-set__separator">/</span>
              <span class="description-set__vote">${vote_count}</span>
            </p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Popularity</p>
            <p class="description-set__value">${popularity}</p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Original Title</p>
            <p class="description-set__value">${original_title}</p>
          </li>
          <li class="description-set">
            <p class="description-set__text">Genre</p>
            <p class="description-set__value">${genresList}</p>
          </li>
        </ul>
        <div class="film-card__description-about">
          <h2 class="description-about__title">About</h2>
          <p class="description-about__text">${overview}</p>
        </div>
        <div class="film-card__description-button">
          <button class="description-button description-button__watched" data-id="${id}">
            add to Watched
          </button>
          <button class="description-button description-button__queue" data-id="${id}">
            add to queue
          </button>
        </div>
      </div>
    </div>`;

  modalOneFilmRef.insertAdjacentHTML('afterbegin', markupModalOneFilm);
};

document.addEventListener('keydown', event => {
  if (event.code === 'escape') {
    console.log(e.code);
    backdropRef.classList.add('visually-hidden');
  }
  if (event.code === 'e') {
    backdropRef.classList.remove('visually-hidden');
  }
});

// const onKeyPress = e => {
//   if (e.code === 'Escape') {
//     refs.body.style.overflow = 'visible';
//     refs.body.removeEventListener('keydown', onKeyPress);
//   }
// };
