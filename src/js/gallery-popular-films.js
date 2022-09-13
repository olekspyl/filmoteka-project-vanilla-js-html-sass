import { renderModalOneFilm, onOpenModal } from './modal-film';
import { getMovieById } from './fetch-movie';
import { pagination } from './pagination';
import AxiosRequestService from './axiosRequest';
import createMarkup from './markupForGallery';
import {
  filmAddYearRelease,
  filmAddGenreList,
  filmAddUrl,
} from './functions-for-popular-gallery';

const requireData = new AxiosRequestService();

let config = {};
let total_films;
export let GENRES_FULL_INFO;
export let SEARCH_ACTIVE = 0;

const refs = {
  page: document.querySelector('a[data-page="home"]'),
  gallery: document.querySelector('.gallery'),
  cards: document.querySelectorAll('.card-set__item'),
};

export async function onGalleryClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const filmInfo = await getMovieById(e.currentTarget.id);
  renderModalOneFilm(filmInfo);
  onOpenModal();
}
function fetchFilms() {
  const films = requireData.getFilms();
  return films;
}

// async function fetchData() {
//   const data = await Promise.all([
//     requireData.getConfig(),
//     requireData.getGenre(),
//     requireData.getFilms(),
//   ]);
//   console.log('data', data);
//   GENRES_FULL_INFO = data[1].genres;
//   return data;
// }
async function fetchDataConfigAndGenre() {
  const data = await Promise.all([
    requireData.getConfig(),
    requireData.getGenre(),
  ]);

  const {
    images: { base_url, poster_sizes },
  } = data[0];

  const { genres } = data[1];

  console.log('data', data);
  GENRES_FULL_INFO = genres;
  return { base_url, poster_sizes, genres };
}
//////////////////////////////////////////////////////////////////////////////
async function loadPage() {
  const configAndGenreData = await fetchDataConfigAndGenre();
  config = configAndGenreData;
  // console.log('configAndGenre', configAndGenreData);
  const filmsData = await fetchFilms();

  pagination.reset(filmsData.total_results);

  console.log('films Data', filmsData);
  const dataForMurkup = preperDataForMurkup({
    configAndGenreData,
    filmsData,
  });
  // pagination.reset(total_films);
  // console.log('DatdataForMurkupa', dataForMurkup);
  renderGallery(dataForMurkup);
}
//////////////////////////////////////////////////////////////////////////////////////

function preperDataForMurkup(dataForModify) {
  const {
    configAndGenreData: { genres },
    configAndGenreData,
  } = dataForModify;
  // console.log('dataForModify', dataForModify);
  let modifedData = filmAddYearRelease(dataForModify);
  modifedData = filmAddGenreList({ genres, modifedData });
  modifedData = filmAddUrl({ configAndGenreData, modifedData });
  // console.log('configAndGenreData', configAndGenreData);
  return modifedData;
}

function renderGallery(popularFilms) {
  clearMarkup();
  // const popularFilms = await modifyData();
  const markup = createMarkup(popularFilms);
  addToHTML(markup);
  // console.log('in renderGallery');
}

if (refs.page.classList.contains('header-list__link--current')) {
  // onLoadMore();
  loadPage();
}

export async function onPaginLoadMore(currentPage) {
  requireData.page = currentPage;
  const filmsData = await fetchFilms();
  // console.log('films Data', filmsData);
  const configAndGenreData = config;
  const dataForMurkup = preperDataForMurkup({
    configAndGenreData,
    filmsData,
  });
  renderGallery(dataForMurkup);
}

export function addToHTML(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
  const galleryItems = document.querySelectorAll('.card-set__item');

  galleryItems.forEach(card =>
    card.removeEventListener('click', onGalleryClick)
  );
  galleryItems.forEach(card => card.addEventListener('click', onGalleryClick));
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

// pagination.on('afterMove', event => {
//   const currentPage = event.page;
//   if (!SEARCH_ACTIVE) {
//     onPaginLoadMore(currentPage);
//   }
//   // console.log(pagination.currentPage);
//   // requireData.page = currentPage;
// });
