import React from 'react';
import { Link } from 'react-router-dom';
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
      <header data-testid="header-component">
        {isLoading && <div>Carregando...</div>}
        <h1 data-testid="header-user-name">{usuario}</h1>
        <Link to="/search" data-testid="link-to-search"> search </Link>
        <Link to="/favorites" data-testid="link-to-favorites"> favorites </Link>
        <Link to="/profile" data-testid="link-to-profile"> profile </Link>
      </header>
    );
  }
}

export default Header;
