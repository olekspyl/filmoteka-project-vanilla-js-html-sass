import KeyMovieFetch from './keyMovieFetch';

const refs = {
  searchForm: document.querySelector('.header-search-form'),
  gallery: document.querySelector('.gallery'),
  loadMoreBtn: document.querySelector('.load-more'),
};

const keyMovieFetch = new KeyMovieFetch();

refs.searchForm.addEventListener('submit', onSearchSubmit);
// refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

async function onSearchSubmit(evt) {
  try {
    evt.preventDefault();
    refs.gallery.innerHTML = '';
    console.log(evt.currentTarget.elements.searchQuery.value);
    keyMovieFetch.value = evt.currentTarget.elements.searchQuery.value;
    keyMovieFetch.resetPage();
    if (keyMovieFetch.value === '') {
      //   refs.loadMoreBtn.classList.add('is-hidden');
      console.log('I can`t find an empty request. Please input something.');
      refs.gallery.innerHTML = '';
      return;
    }

    const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
    await createMarkup(fetch);
    console.log(fetch);
    // refs.loadMoreBtn.classList.remove('is-hidden');

    evt.target.reset();
  } catch (error) {
    // refs.loadMoreBtn.classList.add('is-hidden');
    console.log(error.message);
  }
}

function onLoadMoreClick() {
  renderGallery();
  refs.gallery.innerHTML = '';
  //   refs.loadMoreBtn.classList.remove('is-hidden');
}

async function renderGallery() {
  const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
  await createMarkup(fetch);
  //   console.log(fetch);
}

async function createMarkup(data) {
  //   const films = data.results;
  const markup = data.results
    .map(({ id, poster_path, title, release_date, genre_ids }) => {
      const year = release_date.slice(0, 4);
      return `
      <li class="card-set__item" id="${id}">
      <a href='#' id='${id}'>
      <img id="${id}
          loading="lazy"
          src="http://image.tmdb.org/t/p/w342/${poster_path}"
          alt="${title}"
          class="card-set__img "

      />
      </div>
      <h3 class="card-set__title">${title}</h3>
      <div class="card-set__description" id="${id}>
      <div class="card-set__genre" id="${id}>
      <span class="card-set__genre" >${genre_ids[0]}</span>
      <span class="card-set__genre" >&nbsp| ${year}</span>
      </div>
      </div>
      </a>
      </li>
      `;
    })
    .join('');
  refs.gallery.insertAdjacentHTML('beforeend', markup);
}
