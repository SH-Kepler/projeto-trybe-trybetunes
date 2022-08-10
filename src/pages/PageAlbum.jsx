import React from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import CardOfMusics from '../components/CardOfMusics';

class PageAlbum extends React.Component {
  constructor() {
    super();
    this.state = {
      MusicCard: [],
      artistName: '',
      album: '',
      albumImg: '',
      favoriteList: [],
    };
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
        <img src={ albumImg } alt={ album } />
        <h2 data-testid="artist-name">{artistName}</h2>
        <h3 data-testid="album-name">{album}</h3>
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
