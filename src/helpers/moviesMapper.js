export const moviesMapper = ( movies ) => {
  return movies.map(({ vote_count, id, title }) => ({
    vote_count,
    id,
    title,
    isWatched: false,
  }));
};
