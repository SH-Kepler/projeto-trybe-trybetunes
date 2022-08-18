import React from 'react';
import '../css/Header.css';
import { Link } from 'react-router-dom';
import logo from '../images/logo.png';
import { getUser } from '../services/userAPI';

const inittialState = {
  usuario: '',
  isLoading: false,
};
class Header extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({
      usuario: data.name,
      isLoading: false,
    });
  }

  render() {
    const { usuario, isLoading } = this.state;
    return (
      <div>
        {isLoading ? <div>Carregando...</div> : (
          <header className="header" data-testid="header-component">
            <div className="containerLogo">
              <img className="logo" src={ logo } alt="logo" />
              <h1 data-testid="header-user-name">{usuario}</h1>
            </div>
            <nav className="containerNav">
              <Link
                className="linkHeader"
                to="/search"
                data-testid="link-to-search"
              >
                search

              </Link>
              <Link
                className="linkHeader"
                to="/favorites"
                data-testid="link-to-favorites"
              >
                favorites

              </Link>
              <Link
                className="linkHeader"
                to="/profile"
                data-testid="link-to-profile"
              >
                profile

              </Link>
            </nav>
          </header>
        )}
      </div>
    );
  }
}

export default Header;
