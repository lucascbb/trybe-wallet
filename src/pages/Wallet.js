import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import WallerForm from '../components/WalletForm';
import Table from '../components/Table';
import { addCurrencies } from '../redux/actions';
import './Wallet.css';

class Wallet extends React.Component {
  async componentDidMount() {
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const coin = await response.json();
    delete coin.USDT;

    dispatch(addCurrencies(Object.keys(coin)));
  }

  render() {
    return (
      <div>
        <section className="headerEwalletForm">
          <Header />
          <WallerForm />
        </section>
        <Table />
      </div>
    );
  }
}

Wallet.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

export default connect(null)(Wallet);
