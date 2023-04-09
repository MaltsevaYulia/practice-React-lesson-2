// import { Component } from 'react';
// import { Button } from './Button/Button';
// import { fetchMovies } from '../components/services/moviesApi';
// import { MoviesList } from './MoviesList/MoviesList';
// import { Loader } from './Loader/Loader';
// import { moviesMapper } from '../helpers/moviesMapper';
import { useState, useEffect } from 'react';

// export class App extends Component {
//   state = {
//     isListShow: false,
//     movies: [],
//     isLoading: false,
//     page: 1,
//   };
//   componentDidUpdate(prevProps, prevState) {
//     if (
//       (prevState.isListShow !== this.state.isListShow ||
//         prevState.page !== this.state.page) &&
//       this.state.isListShow
//     ) {
//       this.getMovies();
//     }
//     if (
//       prevState.isListShow !== this.state.isListShow &&
//       !this.state.isListShow
//     ) {
//       this.setState({ movies: [], page: 1 });
//     }
//   }

//   showList = () => {
//     this.setState(prevState => ({ isListShow: !prevState.isListShow }));
//   };

//   loadMore = () => {
//     this.setState(prevState => ({ page: prevState.page + 1 }));
//   };

//   deleteMovie = id => {
//     this.setState(prevState => ({
//       movies: prevState.movies.filter(el => el.id !== id),
//     }));
//   };

//   changeWatchedStatus = (id) => {
//     this.setState(prevState => ({
//       movies: prevState.movies.map(el =>
//         el.id === id ? { ...el, isWatched: !el.isWatched } : el
//       ),
//     }));
//   }

//   getMovies = () => {
//     this.setState({ isLoading: true });
//     fetchMovies(this.state.page)
//       .then(({ data: { results } }) => {
//         this.setState(prevState => ({
//           movies: [...prevState.movies, ...moviesMapper(results)],
//         }));
//       })
//       .catch(error => {
//         console.log(error);
//       })
//       .finally(() => this.setState({ isLoading: false }));
//   };

//   render() {
//     const { isListShow, movies, isLoading } = this.state;
//     return (
//       <div>
//         <Button
//           clickHandler={this.showList}
//           text={isListShow ? 'Hide movies list' : 'Show movies list'}
//         />
//         {isListShow && (
//           <>
//             <MoviesList movies={movies} deleteMovie={this.deleteMovie} watchedStatus={this.changeWatchedStatus } />
//             {!isLoading && (
//               <Button text="Load More" clickHandler={this.loadMore} />
//             )}
//           </>
//         )}
//         {isLoading && <Loader />}
//       </div>
//     );
//   }
// }

import { Button } from './Button/Button';
import { fetchMovies } from '../components/services/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';
import { Loader } from './Loader/Loader';
import { moviesMapper } from '../helpers/moviesMapper';

export const App = () => {
  const [isListShow, setIsListShow] = useState(false);
  const [movies, setMovies] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);

  useEffect(() => {
    if (isListShow) {
      setIsLoading(true);
      fetchMovies(page)
        .then(({ data: { results } }) => {
          setMovies(prevState => [...prevState, ...moviesMapper(results)]);
        })
        .catch(error => {
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    }
    if (!isListShow) {
      setPage(1);
      setMovies([]);
    }
  }, [isListShow, page]);

  const showList = () => {
    setIsListShow(prevState => !prevState);
  };

  const loadMore = () => {
    setPage(prevState => prevState + 1);
  };

  const deleteMovie = id => {
    setMovies(prevState => prevState.filter(el => el.id !== id));
  };

  const changeWatchedStatus = id => {
    setMovies(prevState =>
      prevState.map(el =>
        el.id === id ? { ...el, isWatched: !el.isWatched } : el
      )
    );
  };

  return (
    <div>
      <Button
        clickHandler={showList}
        text={isListShow ? 'Hide movies list' : 'Show movies list'}
      />
      {isListShow && (
        <>
          <MoviesList
            movies={movies}
            deleteMovie={deleteMovie}
            watchedStatus={changeWatchedStatus}
          />
          {!isLoading && <Button text="Load More" clickHandler={loadMore} />}
        </>
      )}
      {isLoading && <Loader />}
    </div>
  );
};
