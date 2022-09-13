import KeyMovieFetch from './keyMovieFetch';
import { addToHTML } from './gallery-popular-films';
import { GENRES_FULL_INFO, onPaginLoadMore } from './gallery-popular-films';
import { pagination } from './pagination';

const refs = {
  searchForm: document.querySelector('.header-search-form'),
  gallery: document.querySelector('.gallery'),
  searchMessage: document.querySelector('.header-message'),
  page: document.querySelector('a[data-page="home"]'),
  paginationCont: document.getElementById('tui-pagination-container'),
  // loadMoreBtn: document.querySelector('.load-more'),
};
let SEARCH_ACTIVE = false;
let total_films;
const keyMovieFetch = new KeyMovieFetch();

refs.searchForm.addEventListener('submit', onSearchSubmit);
// // refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(evt) {
  try {
    evt.preventDefault();
    evt.stopPropagation();
    refs.paginationCont.classList.remove('is-hidden');
    // refs.gallery.innerHTML = '';
    keyMovieFetch.resetPage();
    console.log(evt.currentTarget.elements.searchQuery.value);
    keyMovieFetch.value = evt.currentTarget.elements.searchQuery.value;
    if (keyMovieFetch.value === '') {
      //   refs.loadMoreBtn.classList.add('is-hidden');
      refs.searchMessage.classList.remove('is-hidden');
      refs.paginationCont.classList.add('is-hidden');

      refs.searchMessage.innerHTML =
        'I can`t find an empty request. Please input something.';
      // console.log('I can`t find an empty request. Please input something.');
      // refs.gallery.innerHTML = '';
      return;
    }
    if (keyMovieFetch.value !== '') {
      const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
      console.log('fetch', fetch);
      total_films = fetch.total_results;
      // console.log(total_films);
      if (total_films) {
        refs.gallery.innerHTML = '';
        pagination.reset(total_films);
        await createMarkupKey(fetch);
        SEARCH_ACTIVE = true;
        // console.log('SEARCH_ACTIVE', SEARCH_ACTIVE);
      }

      // console.log(fetch);
    }
    if (total_films === 0) {
      refs.searchMessage.classList.remove('is-hidden');
      refs.paginationCont.classList.add('is-hidden');
      refs.searchMessage.innerHTML =
        'Search result not successful. Enter the correct movie name and try again.';
      // refs.gallery.innerHTML = '';
      return;
    }
    // refs.loadMoreBtn.classList.remove('is-hidden');

    evt.target.reset();
  } catch (error) {
    // refs.loadMoreBtn.classList.add('is-hidden');
    console.log(error);
  }
}

// if (refs.page.classList.contains('header-list__link--current')) {
//   onLoadMore();
// }

// async function onLoadMore() {
//   await renderGallery();
//   // console.log('gallery in onloadmore', gallery);
//   // pagination.reset(total_films);
// }

async function renderGalleryKey() {
  // refs.gallery.innerHTML = '';
  if (keyMovieFetch.value !== '') {
    const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
    console.log('fetch in render', fetch);
    await createMarkupKey(fetch);
    // pagination.reset(fetch.total_results);
    // pagination.reset(total_films);
  } else return;
}

function matchGenres(genreIdArr, genresFool) {
  let result = [];

  genreIdArr.forEach(genreId => {
    const matchGenre = genresFool.find(genre => genreId === genre.id);

    if (matchGenre) {
      result.push(matchGenre.name);
    }
  });
  return result;
}

async function createMarkupKey(data) {
  refs.gallery.innerHTML = '';
  refs.searchMessage.classList.add('is-hidden');

  //   const films = data.results;
  console.log();
  const markup = data.results
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      let year;
      // const length_release_date = 'sss'.length;
      // console.log('date.length', release_date);
      if (release_date !== undefined) {
        if (release_date.length > 4) {
          year = release_date.slice(0, 4);
        } else {
          year = '';
        }
      } else {
        year = '';
      }
      const genresName = matchGenres(genre_ids, GENRES_FULL_INFO);
      return `
      <li class="card-set__item" id="${id}">
      <a href='#' id='${id}' class="card-link">
      <picture>
                    <source srcset="
                    http://image.tmdb.org/t/p/w780/${poster_path} 1x,
                   http://image.tmdb.org/t/p/original/${poster_path} 2x" media="(min-width: 1280px)" type="image/jpeg" />
                    <source srcset="
                    http://image.tmdb.org/t/p/w342/${poster_path} 1x,
                    http://image.tmdb.org/t/p/w500/${poster_path} 2x" media="(min-width: 768px)" type="image/jpeg" />
                    <source srcset="
                    http://image.tmdb.org/t/p/w185/${poster_path} 1x,
                    http://image.tmdb.org/t/p/w342/${poster_path} 2x" media="(max-width: 480px)" type="image/jpeg" />
         <img id="${id}
          loading="lazy"
          src="http://image.tmdb.org/t/p/w342/${poster_path}"
          alt="${title}"
          class="card-set__img "/>
      </picture>
     
      <h3 class="card-set__title">${title}</h3>
      <div class="card-set__description" id="${id}">
      <span class="card-set__genre" id="${id}"> ${genresName.join(
        ', '
      )} &nbsp| ${year}</span>
        </div>
      </a>
      </li>
      `;
    })
    .join('');
  addToHTML(markup);
}

pagination.on('afterMove', event => {
  const currentPage = event.page;
  if (SEARCH_ACTIVE) {
    const currentPage = event.page;
    console.log(currentPage);
    console.log(keyMovieFetch.page);
    keyMovieFetch.page = currentPage;
    renderGalleryKey();
  } else {
    onPaginLoadMore(currentPage);
  }
});
