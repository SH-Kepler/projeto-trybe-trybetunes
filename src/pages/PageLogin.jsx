import React from 'react';
import PropTypes from 'prop-types';
import { createUser } from '../services/userAPI';

const inittialState = {
  name: '',
  buttonDisabled: true,
  isLoading: false,
};
class PageLogin extends React.Component {
  constructor(props) {
    super(props);

    this.state = inittialState;
  }

  enableButton = () => {
    const { name } = this.state;
    const maxLength = 3;
    const sizeName = name.length >= maxLength;
    return !sizeName;
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState(() => ({
      [name]: value,
    }), () => this.setState({ buttonDisabled: this.enableButton() }));
  }

  submitButtonCreateUser = async (event) => {
    event.preventDefault();
    const { history: { push } } = this.props;
    const { name } = this.state;
    this.setState({ isLoading: true });
    await createUser({ name });
    push('/search');
  }

  render() {
    const { name, buttonDisabled, isLoading } = this.state;

    return (
      <div data-testid="page-login">
        <form action="">
          <input
            value={ name }
            name="name"
            onChange={ this.handleChange }
            data-testid="login-name-input"
            type="text"
          />
          <button
            disabled={ buttonDisabled }
            name="submitButton"
            onClick={ this.submitButtonCreateUser }
            data-testid="login-submit-button"
            type="submit"
          >
            Entrar
          </button>
          { isLoading && <p>Carregando...</p> }
        </form>
      </div>
    );
  }
}

PageLogin.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default PageLogin;
