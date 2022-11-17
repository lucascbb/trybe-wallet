import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './Header.css';
import { BsCashCoin } from 'react-icons/bs';
import { CgProfile } from 'react-icons/cg';
import logo from '../imagens/logo.png';

class Header extends Component {
  soma() {
    const { expenses } = this.props;

    const cambio = expenses.map((ele5) => Number(ele5.exchangeRates[ele5.currency].ask)
    * Number(ele5.value));
    const resultado = cambio.reduce((ele6, index) => ele6 + index);
    return (
      <p
        className="totalAtt"
        data-testid="total-field"
      >
        {/* {resultado.toLocaleString('de-DE', { maximumFractionDigits: 2 })} */}
        {resultado.toFixed(2)}
      </p>
    );
  }

  render() {
    const { email, expenses } = this.props;
    return (
      <header>
        <img src={ logo } alt={ ' ' } className="img2Logo" />
        <div className="moneyHeader">
          <BsCashCoin className="iconCoin" />
          <p className="totalHeader">Total de despesas: R$</p>
          { expenses.length > 0 ? this.soma()
            : (
              <p
                data-testid="total-field"
                className="valorHeader"
              >
                {/* 00,00 */}
                0.00
              </p>
            )}
          <p
            className="brlHeader"
            data-testid="header-currency-field"
          >
            BRL
          </p>
        </div>
        <div className="profileHeader">
          <CgProfile className="IconProfile" />
          <p
            data-testid="email-field"
            className="emailHeader"
          >
            { email }
          </p>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  email: PropTypes.string,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});

export default connect(mapStateToProps)(Header);
