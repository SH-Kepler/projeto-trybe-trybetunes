import React from 'react';
import Header from '../components/Header';

const inittialState = {
  inputValue: '',
  isDisabled: true,
};
class PageSearch extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
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

  render() {
    const { inputValue, isDisabled } = this.state;
    return (
      <div data-testid="page-search">
        <Header />
        <form action="">
          <input
            value={ inputValue }
            name="inputValue"
            onChange={ this.handleChange }
            data-testid="search-artist-input"
            placeholder="Nome do Artista"
            type="text"
          />
          <button
            disabled={ isDisabled }
            data-testid="search-artist-button"
            type="submit"
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default PageSearch;
