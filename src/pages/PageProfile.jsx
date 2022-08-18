import React from 'react';
import '../css/Profile.css';
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
      img: data.image === '' ? 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png' : data.image,
      isLoading: false,
    });
  }

  render() {
    const { isLoading, name, email, description, img } = this.state;
    return (
      <div data-testid="page-profile">
        <Header />
        <div className="displayProfile">
          {isLoading === true ? <span className="loading" /> : (
            <div className="profile">
              <img data-testid="profile-image" src={ img } alt={ name } />
              <p className="name">
                name:
                {' '}
                { name }
              </p>
              <p className="email">
                email:
                {' '}
                { email }
              </p>
              <div className="displayDescription">
                <p className="description">
                  description:
                  {' '}
                  { description }
                </p>
              </div>
              <div className="displayLink">
                <Link className="buttonProfile" to="/profile/edit">Editar perfil</Link>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default PageProfile;
