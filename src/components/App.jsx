import { Component } from 'react';
import { Button } from './Button/Button';
import { fetchMovies } from '../components/services/moviesApi';
import { MoviesList } from './MoviesList/MoviesList';
import { Loader } from './Loader/Loader';

export class App extends Component {
  state = {
    isListShow: false,
    movies: [],
    isLoading: false,
    page: 1,
  };
  componentDidUpdate(prevProps, prevState) {
    if (
      (prevState.isListShow !== this.state.isListShow ||
        prevState.page !== this.state.page) &&
      this.state.isListShow
    ) {
      this.getMovies();
    }
    if (
      prevState.isListShow !== this.state.isListShow &&
      !this.state.isListShow
    ) {
      this.setState({ movies: [], page: 1 });
    }
  }

  showList = () => {
    this.setState(prevState => ({ isListShow: !prevState.isListShow }));
  };

  loadMore = () => {
    this.setState(prevState => ({ page: prevState.page + 1 }));
  };

  getMovies = () => {
    this.setState({ isLoading: true });
    fetchMovies(this.state.page)
      .then(({ data: { results } }) => {
        this.setState(prevState => ({
          movies: [...prevState.movies, ...results],
        }));
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => this.setState({ isLoading: false }));
  };

  render() {
    const { isListShow, movies, isLoading } = this.state;
    return (
      <div>
        <Button
          clickHandler={this.showList}
          text={isListShow ? 'Hide movies list' : 'Show movies list'}
        />
        {isListShow && (
          <>
            <MoviesList movies={movies} />
            {!isLoading && (
              <Button text="Load More" clickHandler={this.loadMore} />
            )}
          </>
        )}
        {isLoading && <Loader />}
      </div>
    );
  }
}
console.log('Hello dear friends')
