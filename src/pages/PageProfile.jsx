import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import { getUser } from '../services/userAPI';

const inittialState = {
  name: '',
  email: '',
  description: '',
  img: '',
  isLoading: false,
};

class PageProfile extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    console.log(data);
    this.setState({
      name: data.name,
      email: data.email,
      description: data.description,
      img: data.image,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name, email, description, img } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <Link to="/profile/edit" data-testid="link-to-profile">Editar perfil</Link>
        {isLoading === true ? <p>Carregando...</p> : (
          <div>
            <img data-testid="profile-image" src={ img } alt={ name } />
            <h2>{ name }</h2>
            <p>{ email }</p>
            <p>{ description }</p>
          </div>
        )}
      </div>
    );
  }
}

export default PageProfile;
