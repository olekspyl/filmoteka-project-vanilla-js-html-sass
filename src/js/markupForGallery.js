export default function createMarkup(films) {
  return films
    .map(film => {
      return `
        <div class="gallery__item data-id="${film.id}">
          <img class="gallery__image" src="${film.base_url}w342/${film.poster_path}" alt="${film.title}" loading="lazy" />
          </a>
          <div class="gallery__info">
              <p class="gallery__info-item">
                  <b>title: ${film.title}</b>
                    <p class="gallery__info-item">
                  <b>genres: ${film.filmGenreList}</b
              <p class="gallery__info-item">
                  <b>release: ${film.releaseYear}</b>
          </div>
      </div>`;
    })
    .join('');
}
