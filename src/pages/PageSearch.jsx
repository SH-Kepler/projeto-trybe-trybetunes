import React from 'react';
import '../css/PageSearch.css';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

const inittialState = {
  inputValueHunter: '',
  inputValue: '',
  isDisabled: true,
  isLoading: false,
  fail: false,
  music: [],
  realArtist: true,
};
class PageSearch extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    const { inputValue } = this.state;
    this.setState({ inputValueHunter: inputValue });
    this.setState({ inputValue: '' });
    const data = await searchAlbumsAPI(inputValue);
    console.log(data);
    this.setState({ isLoading: false });
    if (data.length > 0) {
      this.setState({ music: data });
    }
  }

  enablaButton = () => {
    const { inputValue } = this.state;
    const maxLangth = 2;
    const inputSize = inputValue.length < maxLangth;
    return inputSize;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => this.setState({ isDisabled: this.enablaButton() }));
  }

  searchArtist = (event) => {
    const { music } = this.state;
    if (music.length === 0) {
      this.setState({
        realArtist: false,
      });
    }
    this.setState({
      isLoading: true,
    });
    event.preventDefault();
    this.componentDidMount();
  }

  render() {
    const { inputValue, isDisabled, isLoading,
      music, realArtist, inputValueHunter } = this.state;
    return (
      <div className="PageSearch" data-testid="page-search">
        { isLoading ? <div>Carregando...</div>
          : (
            <div>
              <Header />
              <form className="formPageSearch" onSubmit={ this.searchArtist }>
                <div>
                  <input
                    className="inputPageSearch"
                    value={ inputValue }
                    name="inputValue"
                    onChange={ this.handleChange }
                    data-testid="search-artist-input"
                    placeholder="Nome do Artista"
                    type="text"
                  />
                </div>
                <div>
                  <button
                    className="buttonPageSearch"
                    disabled={ isDisabled }
                    data-testid="search-artist-button"
                    type="submit"
                  >
                    Pesquisar
                  </button>
                </div>
              </form>
              {realArtist === false && music.length === 0
              && <p className="failSearch">Nenhum álbum foi encontrado</p>}
              {music.length > 0 && (
                <p
                  className="resultsSearch"
                >
                  {`Resultado de álbuns de: ${inputValueHunter}`}

                </p>)}
              {music.map((element) => (
                <Link
                  to={ `/album/${element.collectionId}` }
                  className="collections"
                  data-testid={ `link-to-album-${element.collectionId}` }
                  key={ `${element.artistId}
                  ${element.collectionId}` }
                >
                  <div className="containerCollections">
                    <div>
                      <img
                        className="imgCollections"
                        src={ element.artworkUrl100 }
                        alt="artworkUrl100"
                      />
                    </div>
                    <div className="collectionInformations">
                      <p className="collectionName">{element.collectionName}</p>
                      <p className="artistName">{ element.artistName }</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

      </div>
    );
  }
}

export default PageSearch;
