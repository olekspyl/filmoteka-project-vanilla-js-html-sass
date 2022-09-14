import { getMovieById } from './fetch-movie';
import Notiflix from 'notiflix';

let watchedMovies = [];
let queueMovies = [];

const modalWrap = document.querySelector('.film-card');
// const libraryWrap = document.querySelector('.library-list');
modalWrap.addEventListener('click', onModalClick);

function onModalClick(evt) {
  if (evt.target.classList.contains('description-button__watched')) {
    onBtnAddToWatchedClick(evt);
  }

  if (evt.target.classList.contains('description-button__queue')) {
    onBtnAddToQueueClick(evt);
  }

  if (evt.target.classList.contains('remove-button__watched')) {
    // console.log(evt.target);
    onBtnRemoveFromWatchedClick(evt);
  }

  if (evt.target.classList.contains('remove-button__queue')) {
    // console.log(evt.target);
    onBtnRemoveFromQueueClick(evt);
  }
}

async function onBtnAddToWatchedClick(evt) {
  const dataWatched = JSON.parse(localStorage.getItem('watchedMovies'));
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  if (dataWatched === null || dataWatched === '[]') {
    watchedMovies.push(selectedMovie);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));

    evt.target.textContent = 'remove from watched';
    evt.target.classList.remove('description-button__watched');
    evt.target.classList.add('remove-button__watched');

    Notiflix.Notify.success('This movie added to Watched.');
  } else {
    watchedMovies = dataWatched;
    for (let i = 0; i < watchedMovies.length; i += 1) {
      if (watchedMovies[i].id === selectedMovie.id) {
        return Notiflix.Notify.failure(
          'This movie has already been added to Watched.'
        );
      }
    }
    watchedMovies.push(selectedMovie);
    localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));

    evt.target.textContent = 'remove from watched';
    evt.target.classList.remove('description-button__watched');
    evt.target.classList.add('remove-button__watched');

    Notiflix.Notify.success('This movie added to Watched.');
  }
}

async function onBtnAddToQueueClick(evt) {
  const dataQueue = JSON.parse(localStorage.getItem('queueMovies'));

  const selectedMovie = await getMovieById(evt.target.dataset.id);

  if (dataQueue === null || dataQueue === '[]') {
    queueMovies.push(selectedMovie);
    localStorage.setItem('queueMovies', JSON.stringify(queueMovies));

    evt.target.textContent = 'remove from queue';
    evt.target.classList.remove('description-button__queue');
    evt.target.classList.add('remove-button__queue');

    Notiflix.Notify.success('This movie added to Queue.');
  } else {
    queueMovies = dataQueue;
    for (let i = 0; i < queueMovies.length; i += 1) {
      if (queueMovies[i].id === selectedMovie.id) {
        return Notiflix.Notify.failure(
          'This movie has already been added to Queue.'
        );
      }
    }

    queueMovies.push(selectedMovie);
    localStorage.setItem('queueMovies', JSON.stringify(queueMovies));

    Notiflix.Notify.success('This movie added to Queue.');
  }
}

async function onBtnRemoveFromWatchedClick(evt) {
  const dataWatched = JSON.parse(localStorage.getItem('watchedMovies'));
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  for (let i = 0; i < dataWatched.length; i += 1) {
    if (dataWatched[i].id === selectedMovie.id) {
      dataWatched.splice(i, 1);
      localStorage.setItem('watchedMovies', JSON.stringify(dataWatched));

      evt.target.textContent = 'add to watched';
      evt.target.classList.remove('remove-button__watched');
      evt.target.classList.add('description-button__watched');

      Notiflix.Notify.success('This movie has been removed from Watched.');
    }
  }
}

async function onBtnRemoveFromQueueClick(evt) {
  const dataQueue = JSON.parse(localStorage.getItem('queueMovies'));
  const selectedMovie = await getMovieById(evt.target.dataset.id);

  for (let i = 0; i < dataQueue.length; i += 1) {
    if (dataQueue[i].id === selectedMovie.id) {
      dataQueue.splice(i, 1);
      localStorage.setItem('queueMovies', JSON.stringify(dataQueue));

      evt.target.textContent = 'add to queue';
      evt.target.classList.remove('remove-button__queue');
      evt.target.classList.add('description-button__queue');

      Notiflix.Notify.success('This movie has been removed from Queue.');
    }
  }
}
