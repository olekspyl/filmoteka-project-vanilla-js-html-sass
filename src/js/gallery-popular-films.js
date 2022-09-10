console.log('Start');

import AxiosRequestService from './axiosRequest';
import createMarkup from './markupForGallery';

const requireData = new AxiosRequestService();

const refs = {
  searchForm: document.querySelector('#search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

refs.loadMoreBtn.style.display = 'none';

refs.searchForm.addEventListener('submit', onSearch);
refs.loadMoreBtn.addEventListener('click', onLoadMore);

let totalHits = 0;

refs.loadMoreBtn.style.display = 'none';

async function onSearch(evt) {
  evt.preventDefault();

  clearMarkup();

  const config = await requireData.getConfig();
  console.log('Config', config.images.base_url);

  const genresData = await requireData.getGenre();
  console.log('Genres', genresData);

  const films = await requireData.getFilms();
  console.log('films', films.results);

  const { results } = films;
  function modifyFilms() {}
  const newFilms = results.map(result => {
    const { genre_ids, release_date } = result;

    let releaseYear = release_date.slice(0, 4);

    function genresList() {
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
    const filmGenres = genresList();
    // }
    function genresById(id) {
      const { genres } = genresData;
      for (const genre of genres) {
        if (genre.id === id) {
          //   console.log(genre.name);
          return genre.name;
        }
      }
    }
    return { filmGenres, releaseYear, ...result };
  });
  console.log('newFilms', newFilms);

  //   if (images.hits.length === 0) {
  //     return;
  //   }
  const markup = createMarkup(newFilms);

  addToHTML(markup);
}

/////////////////////////////////////////////////////////////////////////////////////////
async function onLoadMore() {
  const images = await requireImages.getImage();

  const markup = createMarkup(images.hits);

  totalHits -= images.hits.length;

  addToHTML(markup);

  if (totalHits === 0 || totalHits < 0) {
    return;
  }

  toggleLoadMoreBtn(totalHits);

  gallery.refresh();
}

function addToHTML(markup) {
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

function toggleLoadMoreBtn(hitsValue) {
  if (hitsValue === 0 || hitsValue < 0) {
    refs.loadMoreBtn.style.display = 'none';
  } else {
    refs.loadMoreBtn.style.display = 'block';
  }
}
