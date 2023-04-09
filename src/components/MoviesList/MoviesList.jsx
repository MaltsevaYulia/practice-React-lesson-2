export const MoviesList = ({ movies, deleteMovie, watchedStatus }) => {
  return (
    <ul>
      {movies.map(({ vote_count, id, title, isWatched }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
            <p>Vote count:{vote_count}</p>
            <p>
              Watched:{' '}
              <span onClick={() => watchedStatus(id)}>{String(isWatched)}</span>
            </p>
            <button onClick={() => deleteMovie(id)}>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
