import { getMovieById } from './fetch-movie';
import Notiflix from 'notiflix';

let watchedMovies = [];
let queueMovies = [];

const modalWrap = document.querySelector('.film-card');
modalWrap.addEventListener('click', onModalClick);

function onModalClick(evt) {
    if (evt.target.classList.contains('description-button__watched')) {
        onBtnAddToWatchedClick(evt);
    }

    if (evt.target.classList.contains('description-button__queue')) {
        onBtnAddToQueueClick(evt);
    }
}

async function onBtnAddToWatchedClick(evt) {
    const dataWatched = JSON.parse(localStorage.getItem('watchedMovies'));
    const selectedMovie = await getMovieById(evt.target.dataset.id);

    if (dataWatched === null || dataWatched === '[]') {
        watchedMovies.push(selectedMovie);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));

        Notiflix.Notify.success('This movie added to Watched.');
    }
    else {
        watchedMovies = dataWatched;
        for (let i = 0; i < watchedMovies.length; i += 1) {

            if (watchedMovies[i].id === selectedMovie.id) {
                return Notiflix.Notify.failure('This movie has already been added to Watched.');
            }
        }
        watchedMovies.push(selectedMovie);
        localStorage.setItem('watchedMovies', JSON.stringify(watchedMovies));

        Notiflix.Notify.success('This movie added to Watched.');
    }
}

async function onBtnAddToQueueClick(evt) {
    const dataQueue = JSON.parse(localStorage.getItem('queueMovies'));
    const selectedMovie = await getMovieById(evt.target.dataset.id);

    if (dataQueue === null || dataQueue === '[]') {
        queueMovies.push(selectedMovie);
        localStorage.setItem('queueMovies', JSON.stringify(queueMovies));

        
        Notiflix.Notify.success('This movie added to Queue.');
    }
    else {
        queueMovies = dataQueue;
        for (let i = 0; i < queueMovies.length; i += 1) {

            if (queueMovies[i].id === selectedMovie.id) {
                
                return Notiflix.Notify.failure('This movie has already been added to Queue.');
            }
        }

        queueMovies.push(selectedMovie);
        localStorage.setItem('queueMovies', JSON.stringify(watchedMovies));

        Notiflix.Notify.success('This movie added to Queue.');
    }
}
