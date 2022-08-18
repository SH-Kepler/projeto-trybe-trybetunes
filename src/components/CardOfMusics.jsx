// Requisito 9 com dicas do giovani, brabo de mais!
import React from 'react';
import '../css/CardOfMusics.css';
import PropTypes from 'prop-types';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

const inittialState = {
  loading: false,
  favorited: false,
};
class CardOfMusics extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
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
    // document.location.reload(true);
    if (!favorited) {
      await addSong(musi);
    } else {
      await removeSong(musi);
    }
    this.setState({ loading: false });
    this.setState({
      favorited: !favorited,
    });
  }

  render() {
    const { loading, favorited } = this.state;
    const { musi } = this.props;
    return (
      <div className="previousMusicCard">
        {
          loading ? <span className="loadingCardMUsic" />
            : (
              <div className="musicCard">
                <p className="musicTitle">{ musi.trackName }</p>
                <div className="trackMusic">
                  <audio
                    className="audio"
                    data-testid="audio-component"
                    src={ musi.previewUrl }
                    controls
                  >
                    <track kind="captions" />
                    O seu navegador não suporta o elemento
                    <code>audio</code>
                  </audio>
                  <div className="field-checkbox1">
                    <input
                      className="field"
                      id={ musi.trackId }
                      data-testid={ `checkbox-music-${musi.trackId}` }
                      type="checkbox"
                      onChange={ () => this.favoriteMusic(musi) }
                      checked={ favorited }
                    />
                    <label className="description" htmlFor={ musi.trackId }>
                      {' '}
                    </label>
                  </div>
                </div>
              </div>
            )
        }
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
