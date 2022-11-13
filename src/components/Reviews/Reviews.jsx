import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieReviews } from 'services/api';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { animateScroll } from 'react-scroll';
import {
  Author,
  AuthorTitle,
  ReviewsItem,
  ReviewsList,
} from './Reviews.styled';


const Reviews = () => {
  const [reviews, setReview] = useState(null);
  const [loading, setLoading] = useState(false);

  const { movieId } = useParams();

  useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const dataReviews = await getMovieReviews(movieId);
        setReview(dataReviews);
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        setLoading(false);
  }
    })();
  }, [movieId]);
  if (!reviews) {
    animateScroll.scrollMore(400);
    return <>{loading && <Loader />}</>;
  }


  // useEffect(() => {
  //   setLoading(true);
  //   getMovieReviews(movieId)
  //     .then(setReviews)
  //     .finally(() => setLoading(false));
  // }, [movieId]);

  // if (!reviews) {
  //   return <>{loading && <Loader />}</>;
  // }

  return (
    <>
      {reviews.results.length === 0 ? (
        <p>We dont't have any reviews for this movie.</p>
      ) : (
        <ReviewsList>
          {reviews.results.map(({ id, author, content }) => (
            <ReviewsItem key={id}>
              <Author>
                <AuthorTitle>Author:</AuthorTitle>{' '}
                {author ? author : 'No information'}
              </Author>
              <p>{content ? content : 'No information'}</p>
            </ReviewsItem>
          ))}
        </ReviewsList>
      )}
    </>
  );
};

export default Reviews;
