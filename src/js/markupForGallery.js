export default function createMarkup(films) {
  return films
    .map(film => {
      return `
        <div class="gallery__item">
          
          <div class="gallery__info">
          <img class="gallery__image" src="http://image.tmdb.org/t/p/w342/${film.poster_path}" alt="${film.title}" loading="lazy" />
          </a>
              <p class="gallery__info-item">
                  <b>title ${film.title}</b>
                    <p class="gallery__info-item">
                  <b>genre_ids${film.filmGenres}</b>

              <p class="gallery__info-item">
                  <b>release_date ${film.releaseYear}</b>

          </div>
      </div>`;
    })
    .join('');
}
