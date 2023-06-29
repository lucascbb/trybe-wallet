import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addEmail } from '../redux/actions';
import logo from '../imagens/logo.png';
import './Login.css';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      btnDisabled: true,
      email: '',
      senha: '',
    };
  }

  handleChange = ({ target }) => {
    this.setState({ [target]: target.value }, () => {
      this.setState({
        email: email.value,
        senha: senha.value,
      });
    });
    const emailTarget = email.value;
    const senhaTarget = senha.value;
    const seis = 6;
    if (emailTarget.includes('@') && emailTarget.includes('.com')
    && senhaTarget.length >= seis) {
      this.setState({ btnDisabled: false });
    } else { this.setState({ btnDisabled: true }); }
  };

  handleSubmit = async () => {
    const { history: { push }, dispatch } = this.props;
    const { email, senha } = this.state;
    localStorage.setItem('email_wallet', email);
    await push('/carteira');
    dispatch(addEmail(email, senha));
  };

  render() {
    const { btnDisabled } = this.state;
    return (
      <div className="bg">
        <main className="paiLogin">
          <img src={ logo } alt={ ' ' } className="imgLogo" />
          <label htmlFor="email" className="labelpai">
            <input
              title="Insira um e-mail válido"
              type="text"
              id="email"
              name="email"
              placeholder="E-mail"
              data-testid="email-input"
              required
              className="emailInput"
              onChange={ this.handleChange }
            />
          </label>
          <label htmlFor="senha" className="labelpai">
            <input
              title="Insira uma senha com no mínimo 6 caracteres"
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              data-testid="password-input"
              required
              className="senhaInput"
              onChange={ this.handleChange }
            />
          </label>
          <button
            type="button"
            disabled={ btnDisabled }
            className="btnEntrar"
            onClick={ this.handleSubmit }
          >
            Entrar
          </button>
        </main>
      </div>
    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Login);
