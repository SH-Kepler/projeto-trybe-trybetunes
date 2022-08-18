import React from 'react';
import CardOfMusics from '../components/CardOfMusics';
import Header from '../components/Header';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

const inittialState = {
  favoriteList: [],
};
class PageFavorites extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    const favorits = await getFavoriteSongs();
    this.setState({
      favoriteList: favorits,
    });
  }

  render() {
    const { favoriteList } = this.state;
    return (
      <div data-testid="page-favorites">
        <Header />
        <div>
          <div className="titleFavorites">
            <h1>Músicas Favoritas:</h1>
          </div>
          {favoriteList.map((music, i) => (
            <CardOfMusics
              key={ i }
              musi={ music }
              favoritedProp={ favoriteList }
            />
          ))}
        </div>
      </div>
    );
  }
}

export default PageFavorites;
