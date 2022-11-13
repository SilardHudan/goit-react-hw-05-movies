import Loader from 'components/Loader/Loader';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getMovieActors } from 'services/api';
import { CastItem, CastList, Character, Img, Name } from './Cast.styled';
import noPoster from '../../images/no-poster.jpg';
import PropTypes from 'prop-types';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { animateScroll } from 'react-scroll';

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w780';

const Cast = () => {
  const [actors, setActors] = useState(null);
  const [loading, setLoading] = useState(false);
  const { movieId } = useParams();

  // useEffect(() => {
  //   setLoading(true);
  //   getMovieActors(movieId)
  //     .then(setActors)
  //     .finally(() => setLoading(false));
  // }, [movieId]);

  // if (!actors) {
  //   return <>{loading && <Loader />}</>;
  // }
    useEffect(() => {
    (async () => {
      try {
        setLoading(true);
        const dataActors = await getMovieActors(movieId);
        setActors(dataActors);
      } catch (error) {
        Notify.failure(error.message);
      } finally {
        setLoading(false);
  }
    })();
  }, [movieId]);
  if (!actors) {
    animateScroll.scrollMore(400);
    return <>{loading && <Loader />}</>;
  }

  return actors.cast.length === 0 ? (
    <p>We dont't have any cast for this movie.</p>
  ) : (
    <CastList>
      {actors.cast.map(({ name, character, profile_path, id }) => {
        const imgUrl = profile_path
          ? `${IMAGE_BASE_URL}/${profile_path}`
          : noPoster;

        return (
          <CastItem key={id}>
            <Img src={imgUrl} alt="name" width={100} />
            <Name>{name ? name : 'No information'}</Name>
            {character && (
              <Character>
                Character: {character ? character : 'No information'}
              </Character>
            )}
          </CastItem>
        );
      })}
    </CastList>
  );
};

Cast.propTypes = {
  name: PropTypes.string,
  character: PropTypes.string,
  profile_path: PropTypes.string,
  id: PropTypes.string,
};

export default Cast;
