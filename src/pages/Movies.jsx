import { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { searchMovies } from '../api/tmdb-api';
import { MoviesList } from '../components/MoviesList/MoviesList';

const Movies = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  const query = searchParams.get('query') ?? '';

  useEffect(() => {
    if (!query) return;

    setLoading(true);
    searchMovies(query)
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, [query]);

  const handleSubmit = e => {
    e.preventDefault();
    const form = e.currentTarget;
    const searchValue = form.elements.search.value.trim();

    if (!searchValue) {
      setSearchParams({});
      return;
    }

    setSearchParams({ query: searchValue });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input type="text" name="search" defaultValue={query} />
        <button type="submit">Search</button>
      </form>

      {loading && <p>Loading...</p>}
      {movies.length > 0 && <MoviesList movies={movies} />}
    </div>
  );
};

export default Movies;
