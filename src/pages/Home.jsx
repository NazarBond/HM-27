import { useEffect, useState } from 'react';
import { getTrendingMovies } from '../api/tmdb-api';
import { MoviesList } from '../components/MoviesList/MoviesList';

const Home = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    getTrendingMovies()
      .then(setMovies)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div>
      <h1>Trending today</h1>
      {loading && <p>Loading...</p>}
      <MoviesList movies={movies} />
    </div>
  );
};

export default Home;
