import React from 'react';
import PropTypes from 'prop-types';
import '../css/PageLogin.css';
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
      <div className="pageLogin" data-testid="page-login">
        <div className="formPageLogin">
          { isLoading ? <span className="loading" /> : (
            <form>
              <input
                className="inputPageLogin"
                value={ name }
                name="name"
                onChange={ this.handleChange }
                data-testid="login-name-input"
                type="text"
                placeholder="Name"
              />
              <input
                className="inputPageLogin"
                type="password"
                placeholder="password"
              />
              <div className="containerButtonPageLogin">
                <button
                  className="buttonPageLogin"
                  disabled={ buttonDisabled }
                  name="submitButton"
                  onClick={ this.submitButtonCreateUser }
                  data-testid="login-submit-button"
                  type="submit"
                >
                  Entrar
                </button>
              </div>
            </form>
          )}
        </div>
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
