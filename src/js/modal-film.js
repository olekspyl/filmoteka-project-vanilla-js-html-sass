import { getMovieById } from './fetch-movie';

const modalOneFilmRef = document.querySelector('.film-card');
const backdropRef = document.querySelector('.backdrop');
const closeModalBtnRef = document.querySelector('.film-card__button-close');
const modalRef = document.querySelector('.data-modal');

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

// document.addEventListener('keydown', event => {
//   if (event.code === 'escape') {
//     console.log(e.code);
//     backdropRef.classList.add('visually-hidden');
//   }

// const testFilm = {
//   adult: false,
//   backdrop_path: '/jsoz1HlxczSuTx0mDl2h0lxy36l.jpg',
//   genres: [28, 12, 14],
//   genre_ids: [28, 12, 14],
//   id: 616037,
//   media_type: 'movie',
//   original_language: 'en',
//   original_title: 'Thor: Love and Thunder',
//   overview:
//     'After his retirement is interrupted by Gorr the God Butcher, a galactic killer who seeks the extinction of the gods, Thor Odinson enlists the help of King Valkyrie, Korg, and ex-girlfriend Jane Foster, who now wields Mjolnir as the Mighty Thor. Together they embark upon a harrowing cosmic adventure to uncover the mystery of the God Butcher’s vengeance and stop him before it’s too late.',
//   popularity: 5471.218,
//   poster_path: '/pIkRyD18kl4FhoCNQuWxWu5cBLM.jpg',
//   release_date: '2022-07-06',
//   title: 'Thor: Love and Thunder',
//   video: false,
//   vote_average: 6.819,
//   vote_count: 2878,
// };

// renderModalOneFilm(testFilm);

(() => {
  const refs = {
    openModalBtn: document.querySelector('[data-modal-open]'),
    closeModalBtn: document.querySelector('[data-modal-close]'),
    modal: document.querySelector('[data-modal]'),
  };

  closeModalBtnRef.addEventListener('click', toggleModal);

  function toggleModal() {
    modalRef.classList.add('is-hidden');
  }
})();
