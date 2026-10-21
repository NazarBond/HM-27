import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMovieReviews } from "../../api/tmdb-api";

const Reviews = () => {
  const { movieId } = useParams();
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    getMovieReviews(movieId).then(setReviews).catch(console.error);
  }, [movieId]);

  if (!reviews.length) return <p>We don't have any reviews for this movie.</p>;

  return (
    <ul>
      {reviews.map(({ id, author, content }) => (
        <li key={id}>
          <h5>Author: {author}</h5>
          <p>{content}</p>
        </li>
      ))}
    </ul>
  );
};

export default Reviews;
