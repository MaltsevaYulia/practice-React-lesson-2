export const MoviesList = ({ movies }) => {
  return (
    <ul>
      {movies.map(({ vote_count, id, title }) => {
        return (
          <li key={id}>
            <h2>{title}</h2>
                <p>Vote count:{vote_count}</p>
                <button>Delete</button>
          </li>
        );
      })}
    </ul>
  );
};
