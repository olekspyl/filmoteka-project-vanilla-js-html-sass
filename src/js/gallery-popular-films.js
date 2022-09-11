// import { renderModalOneFilm } from './modal-film';
import { pagination } from './pagination';
import AxiosRequestService from './axiosRequest';
import createMarkup from './markupForGallery';

const requireData = new AxiosRequestService();
const page = document.querySelector('a[data-page="home"]');

const refs = {
  gallery: document.querySelector('.gallery'),
  cards: document.querySelectorAll('.card-set__item'),
  // loadMoreBtn: document.querySelector('.load-more'),
};

// refs.loadMoreBtn.addEventListener('click', onLoadMore);
refs.gallery.addEventListener('click', onGalleryClick);
function onGalleryClick(e) {
  e.preventDefault();
  renderModalOneFilm();
  // console.log('e.currentTarger: ', e.currentTarget);
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
  const { results } = data[2];
  // console.log('reults', results);

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
}

if (page.classList.contains('header-list__link--current')) {
  renderGallery();
}

async function onLoadMore() {
  renderGallery();
  // const images = await requireImages.getImage();
  // const markup = createMarkup(images.hits);
  // totalHits -= images.hits.length;
  // addToHTML(markup);
  // if (totalHits === 0 || totalHits < 0) {
  //   return;
  // }
  // toggleLoadMoreBtn(totalHits);
  // gallery.refresh();
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
  // console.log(currentPage);
  requireData.page = currentPage;
  renderGallery();
});
// console.log('pag cur page', pagination.getCurrentPage());
