export function filmAddYearRelease(dataForModify) {
  const {
    filmsData: { results },
  } = dataForModify;

  const filmAddYearRelease = results.map(result => {
    const { release_date } = result;
    const releaseYear = release_date.slice(0, 4);
    return { releaseYear, ...result };
  });
  //   console.log('filmAddYearRelease', filmAddYearRelease);
  return { results: filmAddYearRelease };
}
////////////////////////////////////////////////////////////////////////////////
export function filmAddGenreList(dataForModify) {
  const {
    genres,
    modifedData: { results },
  } = dataForModify;
  // console.log('dataForModify', results);
  const filmAddGenreList = results.map(result => {
    const { genre_ids } = result;
    const filmGenreList = genresList({ genre_ids, genres });
    return { filmGenreList, ...result };
  });

  //   console.log('filmAddGenreList', filmAddGenreList);
  return { results: filmAddGenreList };
}
function genresList(genreToFindData) {
  const { genre_ids, genres } = genreToFindData;
  // console.log(genre_ids.length);
  const genresNames = [];
  for (let i = 0; i < genre_ids.length; i += 1) {
    if (i < 2) {
      const id = genre_ids[i];
      genresNames.push(genresById({ id, genres }));
    } else {
      genresNames.push('Other');
      break;
    }
  }
  return genresNames.join(', ');
}

function genresById(genreToFind) {
  const { id, genres } = genreToFind;
  for (const genre of genres) {
    if (genre.id === id) {
      return genre.name;
    }
  }
}
export function filmAddUrl(dataForModify) {
  const {
    configAndGenreData: { base_url },
    modifedData: { results },
  } = dataForModify;
  //   console.log(' dataForModify', dataForModify);
  const filmAddUrl = results.map(result => {
    return { base_url, ...result };
  });

  //   console.log('filmAddUrl', filmAddUrl);
  return filmAddUrl;
}
