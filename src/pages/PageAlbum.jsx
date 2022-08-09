import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { addSong } from '../services/favoriteSongsAPI';

class PageAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      MusicCard: [],
    };
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const musics = await getMusics(id);
    this.setState({ MusicCard: musics });
    console.log(musics);
  }

  // favoriteMusic = ({ target }) => {
  //   const { MusicCard } = this.state;
  //   addSong(target);
  // }

  render() {
    const { MusicCard } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        {MusicCard.length !== 0 && <img src={ MusicCard[0].artworkUrl100 } alt="img" />}
        {MusicCard.length !== 0
        && <h3 data-testid="artist-name">{ MusicCard[0].artistName }</h3>}
        {MusicCard.length !== 0
        && <h3 data-testid="album-name">{ MusicCard[0].collectionName }</h3>}
        {MusicCard.map((music) => (
          <div key={ music.trackId ? music.trackId : music.artistId }>
            <p>{ music.trackName }</p>
            { music.trackId
            && (
              <audio data-testid="audio-component" src={ music.previewUrl } controls>
                <track kind="captions" />
                O seu navegador não suporta o elemento
                {' '}
                <code>audio</code>
                .
              </audio>
            )}
            {music.trackId
          && (
            <label htmlFor="checkbox">
              Favorita
              <input
                data-testid={ `checkbox-music-${music.trackId}` }
                type="checkbox"
                id="checkbox"
                onClick={ () => addSong(music) }
              />
            </label>
          )}
          </div>
        ))}
      </div>
    );
  }
}

PageAlbum.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};

export default PageAlbum;
