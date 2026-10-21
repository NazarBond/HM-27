import { useEffect, useState, useRef, Suspense } from "react";
import { useParams, Link, Outlet, useLocation } from "react-router-dom";
import { getMovieDetails } from "../../api/tmdb-api";

const MovieDetails = () => {
  const { movieId } = useParams();
  const [movie, setMovie] = useState(null);
  const location = useLocation();
  const backLinkLocationRef = useRef(location.state?.from ?? "/movies");

  useEffect(() => {
    getMovieDetails(movieId).then(setMovie).catch(console.error);
  }, [movieId]);

  if (!movie) return <div>Loading...</div>;

  const { title, release_date, poster_path, vote_average, overview, genres } =
    movie;
  const userScore = Math.round(vote_average * 10);
  const posterUrl = poster_path
    ? `https://image.tmdb.org/t/p/w300${poster_path}`
    : "https://via.placeholder.com/300x450";

  return (
    <div>
      <Link to={backLinkLocationRef.current}>&larr; Go back</Link>
      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        <img src={posterUrl} alt={title} width="300" />
        <div>
          <h2>
            {title} ({new Date(release_date).getFullYear()})
          </h2>
          <p>User Score: {userScore}%</p>
          <h3>Overview</h3>
          <p>{overview}</p>
          <h3>Genres</h3>
          <p>{genres.map((genre) => genre.name).join(", ")}</p>
        </div>
      </div>
      <hr />
      <div>
        <h4>Additional information</h4>
        <ul>
          <li>
            <Link to="cast">Cast</Link>
          </li>
          <li>
            <Link to="reviews">Reviews</Link>
          </li>
        </ul>
      </div>
      <hr />
      <Suspense fallback={<div>Loading subpage...</div>}>
        <Outlet />
      </Suspense>
    </div>
  );
};

export default MovieDetails;
