import React from 'react';
import '../css/ProfileEdit.css';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import { getUser, updateUser } from '../services/userAPI';

const inittialState = {
  name: '',
  email: '',
  description: '',
  image: '',
  isLoading: false,
  buttonDisabled: true,
};
class PageProfileEdit extends React.Component {
  constructor() {
    super();

    this.state = inittialState;
  }

  async componentDidMount() {
    this.setState({ isLoading: true });
    const data = await getUser();
    this.setState({
      name: data.name,
      email: data.email,
      description: data.description,
      image: data.image === '' ? 'https://www.promoview.com.br/uploads/images/unnamed%2819%29.png' : data.image,
      isLoading: false,
    });
  }

  enableButton = () => {
    const { name, email, description, image } = this.state;
    const maxLength = 0;
    const sizeName = name.length === maxLength;
    const sizeEmail = email.length === maxLength;
    const sizeDescription = description.length === maxLength;
    const sizeimage = image.length === maxLength;
    return sizeName || sizeEmail || sizeDescription || sizeimage;
  }

  editUser = async () => {
    const { history: { push } } = this.props;
    push('/profile');
    const { name, email, image, description } = this.state;
    await updateUser({ name, email, image, description });
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => this.setState({ buttonDisabled: this.enableButton() }));
  }

  render() {
    const { name, email, description, image, isLoading, buttonDisabled } = this.state;
    return (
      <div data-testid="page-profile-edit">
        <Header />
        <div className="displayProfileEdit">
          { isLoading ? <span className="loading" /> : (
            <form className="profileEdit">
              <img
                src={ image }
                alt={ name }
              />
              <input
                className="inputImage"
                value={ image }
                type="text"
                name="image"
                onChange={ this.handleChange }
                data-testid="edit-input-image"
              />
              <input
                className="inputName"
                value={ name }
                type="text"
                name="name"
                onChange={ this.handleChange }
                data-testid="edit-input-name"
              />
              <input
                className="inputEmail"
                value={ email }
                type="email"
                name="email"
                onChange={ this.handleChange }
                data-testid="edit-input-email"
              />
              <textarea
                value={ description }
                name="description"
                cols="30"
                rows="10"
                onChange={ this.handleChange }
                data-testid="edit-input-description"
              />
              <button
                className="profileEditButton"
                type="button"
                data-testid="edit-button-save"
                disabled={ buttonDisabled }
                onClick={ this.editUser }
              >
                Save
              </button>
            </form>
          )}
        </div>
      </div>
    );
  }
}

PageProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};
export default PageProfileEdit;
