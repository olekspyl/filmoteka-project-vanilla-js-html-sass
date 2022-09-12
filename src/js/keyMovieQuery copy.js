// import KeyMovieFetch from './keyMovieFetch';

// const refs = {
//   searchForm: document.querySelector('.header-search-form'),
//   gallery: document.querySelector('.gallery'),
//   seachMessage: document.querySelector('.header-message'),
//   // loadMoreBtn: document.querySelector('.load-more'),
// };

// const keyMovieFetch = new KeyMovieFetch();

// refs.searchForm.addEventListener('submit', onSearchSubmit);
// // refs.loadMoreBtn.addEventListener('click', onLoadMoreClick);

// async function onSearchSubmit(evt) {
//   try {
//     evt.preventDefault();
//     refs.gallery.innerHTML = '';
//     console.log(evt.currentTarget.elements.searchQuery.value);
//     keyMovieFetch.value = evt.currentTarget.elements.searchQuery.value;
//     keyMovieFetch.resetPage();
//     if (keyMovieFetch.value === '') {
//       //   refs.loadMoreBtn.classList.add('is-hidden');
//       refs.seachMessage.classList.remove('is-hidden');
//       refs.seachMessage.innerHTML =
//         'I can`t find an empty request. Please input something.';
//       // console.log('I can`t find an empty request. Please input something.');
//       refs.gallery.innerHTML = '';
//       return;
//     }

//     const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
//     // const genres = await keyMovieFetch.getGenres();
//     await createMarkup(fetch);
//     console.log(fetch);
//     if (fetch.total_results === 0) {
//       refs.seachMessage.classList.remove('is-hidden');
//       refs.seachMessage.innerHTML =
//         'Search result not successful. Enter the correct movie name and try again.';
//       refs.gallery.innerHTML = '';
//       return;
//     }
//     // refs.loadMoreBtn.classList.remove('is-hidden');

//     evt.target.reset();
//   } catch (error) {
//     // refs.loadMoreBtn.classList.add('is-hidden');
//     console.log(error.message);
//   }
// }

// // function onLoadMoreClick() {
// //   renderGallery();
// //   refs.gallery.innerHTML = '';
// //   //   refs.loadMoreBtn.classList.remove('is-hidden');
// // }

// async function renderGallery() {
//   const fetch = await keyMovieFetch.fetchMovie(keyMovieFetch.value);
//   await createMarkup(fetch);
//   //   console.log(fetch);
// }

// async function createMarkup(data) {
//   refs.seachMessage.classList.add('is-hidden');
//   //   const films = data.results;
//   const markup = data.results
//     .map(
//       ({ id, poster_path, title, release_date, vote_average, genre_ids }) => {
//         const year = release_date.slice(0, 4);
//         return `
//       <li class="card-set__item" id="${id}">
//       <a href='#' id='${id}'>
//       <img id="${id}
//           loading="lazy"
//           src="http://image.tmdb.org/t/p/w342/${poster_path}"
//           alt="${title}"
//           class="card-set__img "

//       />
//       </div>
//       <h3 class="card-set__title">${title}</h3>
//       <div class="card-set__description" id="${id}>
//       <ul class="card-set__genre" id="${id}>
//       <span class="card-set__genre-movie" >${genre_ids[0]}</span>
//       <span class="card-set__genre-movie" >&nbsp| ${year}</span>
//       <span class="card-set__genre-movie" >&nbsp| ${vote_average}</span>
//       </ul>
//       </div>
//       </a>
//       </li>
//       `;
//       }
//     )
//     .join('');
//   refs.gallery.insertAdjacentHTML('beforeend', markup);
// }
