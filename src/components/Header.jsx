import React from 'react';
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
      </header>
    );
  }
}

export default Header;
