import {
  renderModalOneFilm,
  toggleModal,
  initEventListener,
} from './modal-film';
import { getMovieById } from './fetch-movie';
import { pagination } from './pagination';
import AxiosRequestService from './axiosRequest';
import createMarkup from './markupForGallery';

const requireData = new AxiosRequestService();

let config;
let total_films;

const refs = {
  page: document.querySelector('a[data-page="home"]'),
  gallery: document.querySelector('.gallery'),
  cards: document.querySelectorAll('.card-set__item'),
  // loadMoreBtn: document.querySelector('.load-more'),
};

// refs.loadMoreBtn.addEventListener('click', onLoadMore);

async function onGalleryClick(e) {
  e.preventDefault();
  e.stopPropagation();
  const filmInfo = await getMovieById(e.currentTarget.id);
  renderModalOneFilm(filmInfo);
  toggleModal();
  initEventListener();
}
async function fetchConfig() {
  config = await requireData.getConfig();
  console.log('Config', config);
}
async function fetchData() {
  const data = await Promise.all([
    requireData.getConfig(),
    requireData.getGenre(),
    requireData.getFilms(),
  ]);
  // console.log('data', data);
  return data;
}

async function modifyData() {
  const data = await fetchData();
  const { images } = data[0];
  // console.log('images', images);
  const { genres } = data[1];
  // console.log('genres', genres);

  const { results, total_results } = data[2];
  total_films = total_results;

  const filmAddYearRelease = results.map(result => {
    const { release_date } = result;
    const releaseYear = release_date.slice(0, 4);
    return { releaseYear, ...result };
  });
  // console.log('filmAddYearRelise', filmAddYearRelise);

  const filmAddGenreList = filmAddYearRelease.map(film => {
    const { genre_ids } = film;
    const filmGenreList = genresList(genre_ids);
    return { filmGenreList, ...film };
  });
  // console.log('filmGenreList', filmAddGenreList);
  const filmAddUrl = filmAddGenreList.map(film => {
    const { base_url } = images;

    return { base_url, ...film };
  });
  // console.log('fbase_url', filmAddUrl);

  function genresList(genre_ids) {
    const genresNames = [];
    for (let i = 0; i < genre_ids.length; i += 1) {
      if (i < 2) {
        genresNames.push(genresById(genre_ids[i]));
      } else {
        genresNames.push('Other');
        break;
      }
    }
    return genresNames.join(', ');
  }

  function genresById(id) {
    for (const genre of genres) {
      if (genre.id === id) {
        //   console.log(genre.name);
        return genre.name;
      }
    }
  }
  return filmAddUrl;
}

async function renderGallery() {
  clearMarkup();
  const popularFilms = await modifyData();
  const markup = createMarkup(popularFilms);
  addToHTML(markup);
  // console.log('in renderGallery');
}

if (refs.page.classList.contains('header-list__link--current')) {
  onLoadMore();
}

async function onLoadMore() {
  const gallery = await renderGallery();
  // console.log('total_films', total_films);
  pagination.reset(total_films);
}

function addToHTML(markup) {
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

pagination.on('afterMove', event => {
  const currentPage = event.page;
  // console.log(pagination.currentPage);
  requireData.page = currentPage;
  renderGallery();
});
