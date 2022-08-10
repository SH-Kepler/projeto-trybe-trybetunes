// Requisito 9 com dicas do giovani, brabo de mais!
import React from 'react';
import PropTypes from 'prop-types';
import { addSong } from '../services/favoriteSongsAPI';

class CardOfMusics extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: false,
      favorited: false,
    };
  }

  componentDidMount() {
    const { favoritedProp } = this.props;
    this.setState({ favorited: favoritedProp });
  }

  favoriteMusic = async (musi) => {
    const { favorited } = this.state;
    this.setState({
      favorited: !favorited,
      loading: true,
    });
    await addSong(musi);
    this.setState({ loading: false });
  }

  render() {
    const { loading, favorited } = this.state;
    const { musi } = this.props;
    return (
      <div>
        {
          loading ? <p>Carregando...</p>
            : (
              <div>
                <p>{ musi.trackName }</p>
                <audio data-testid="audio-component" src={ musi.previewUrl } controls>
                  <track kind="captions" />
                  O seu navegador não suporta o elemento
                  {' '}
                  <code>audio</code>
                  .
                </audio>
                <label htmlFor="fav">
                  Favorita
                  <input
                    data-testid={ `checkbox-music-${musi.trackId}` }
                    type="checkbox"
                    onChange={ () => this.favoriteMusic(musi) }
                    checked={ favorited }
                  />
                </label>
              </div>
            )
        }
        ;
      </div>
    );
  }
}

CardOfMusics.propTypes = {
  favoritedProp: PropTypes.bool.isRequired,
  musi: PropTypes.shape({
    trackId: PropTypes.string.isRequired,
    trackName: PropTypes.string.isRequired,
    previewUrl: PropTypes.string.isRequired,
  }).isRequired,
};

export default CardOfMusics;
