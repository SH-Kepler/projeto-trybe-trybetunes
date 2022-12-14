import React from 'react';
import '../css/CardOfMusics.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import CardOfMusics from '../components/CardOfMusics';

const inittialState = {
  MusicCard: [],
  artistName: '',
  album: '',
  albumImg: '',
  favoriteList: [],
};
class PageAlbum extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    const { match: { params: { id } } } = this.props;
    const tracks = await getMusics(id);
    const favorites = await getFavoriteSongs();
    const trackIds = favorites.map((track) => track.trackId);
    const image = tracks[0].artworkUrl100;
    const musics = tracks.filter((track) => tracks.indexOf(track) && track);
    this.setState({
      artistName: tracks[0].artistName,
      album: tracks[0].collectionName,
      albumImg: image,
      MusicCard: musics,
      favoriteList: trackIds,
    });
  }

  render() {
    const { MusicCard, artistName, album, albumImg, favoriteList } = this.state;
    return (
      <div data-testid="page-album">
        <Header />
        <div className="MainAlbum">
          <h2 data-testid="artist-name">{artistName}</h2>
          <img className="imagem" src={ albumImg } alt={ album } />
          <h3 className="texto" data-testid="album-name">{album}</h3>
        </div>
        {MusicCard.map((music, i) => (
          <CardOfMusics
            key={ i }
            musi={ music }
            favoritedProp={ favoriteList.some((id) => id === music.trackId) }
          />
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
