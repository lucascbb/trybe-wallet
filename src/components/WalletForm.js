import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { MdDelete, MdAddCircle } from 'react-icons/md';
import { FaEdit } from 'react-icons/fa';
import { addExpenses, deleteAllExpenses, addEditor } from '../redux/actions';
import './WalletForm.css';
import store from '../redux/store';

class WalletForm extends Component {
  state = {
    id: 0,
    value: '',
    description: '',
    currency: 'USD',
    tag: 'Alimentação',
    method: 'Dinheiro',
    btndisabled: true,
    btnEdit: true,
  };

  //-------------------------------------------------
  handleChange2 = ({ target }) => {
    this.setState({ [target.name]: target.value }, () => {
      if (store.getState().wallet.expenses.length === 0) {
        this.setState({ id: 0 });
      }
      if (value.value !== '' && description.value !== '') {
        this.setState({ btndisabled: false, btnEdit: false });
      } else { this.setState({ btndisabled: true, btnEdit: true }); }
    });
  };

  //-------------------------------------------------
  async handleADD() {
    const { id, value, description, currency, method, tag } = this.state;
    const { dispatch } = this.props;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    delete exchangeRates.USDT;

    this.setState({
      id: 1 + id,
      value: '',
      description: '',
      currency: 'USD',
      tag: 'Alimentação',
      method: 'Dinheiro',
      btndisabled: true,
      btnEdit: true,
    });

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    dispatch(addExpenses(expenses));
  }

  //-------------------------------------------------
  edit = async () => {
    const { idEdit, dispatch } = this.props;
    const { id, value, description, currency, method, tag } = this.state;
    const response = await fetch('https://economia.awesomeapi.com.br/json/all');
    const exchangeRates = await response.json();
    delete exchangeRates.USDT;

    store.getState().wallet.expenses[idEdit].value = value;
    store.getState().wallet.expenses[idEdit].description = description;
    store.getState().wallet.expenses[idEdit].tag = tag;
    store.getState().wallet.expenses[idEdit].method = method;
    store.getState().wallet.expenses[idEdit].currency = currency;

    const expenses = {
      id,
      value,
      description,
      currency,
      method,
      tag,
      exchangeRates,
    };

    const menosUM = -1;
    dispatch(addExpenses(expenses));
    const x = store.getState().wallet.expenses;
    x.splice(menosUM);
    dispatch(addEditor(false));
  };

  //-------------------------------------------------
  delete = () => {
    const { dispatch } = this.props;
    dispatch(deleteAllExpenses(''));
    dispatch(addEditor(false));
    this.setState({
      id: 0,
    });
  };

  render() {
    const { currencies, editor } = this.props;
    const { value, description, tag, method,
      currency, btndisabled, btndisabledDel, btnEdit } = this.state;
    return (
      <form className="formPai">
        <section className="inputsForm">
          <label htmlFor="description" className="labelDesc">
            Descrição despesa
            <input
              type="text"
              id="description"
              name="description"
              value={ description }
              className="descInput"
              data-testid="description-input"
              onChange={ this.handleChange2 }
            />
          </label>
          <label htmlFor="tag" className="labelTag">
            Categoria da despesa
            <select
              id="tag"
              name="tag"
              value={ tag }
              className="tagInput"
              data-testid="tag-input"
              onChange={ this.handleChange2 }
            >
              <option value="Alimentação" type="submit">Alimentação</option>
              <option value="Lazer" type="submit">Lazer</option>
              <option value="Trabalho" type="submit">Trabalho</option>
              <option value="Transporte" type="submit">Transporte</option>
              <option value="Saúde" type="submit">Saúde</option>
            </select>
          </label>
          <label htmlFor="value" className="labelValue">
            Valor
            <input
              type="number"
              id="value"
              name="value"
              value={ value }
              className="valueInput"
              data-testid="value-input"
              onChange={ this.handleChange2 }
            />
          </label>
          <label htmlFor="method" className="labelMethod">
            Método de pagamento
            <select
              id="method"
              name="method"
              value={ method }
              className="methodInput"
              data-testid="method-input"
              onChange={ this.handleChange2 }
            >
              <option value="Dinheiro" type="submit">Dinheiro</option>
              <option value="Cartão de crédito" type="submit">Cartão de crédito</option>
              <option value="Cartão de débito" type="submit">Cartão de débito</option>
            </select>
          </label>
          <label htmlFor="currency" className="labelCurrency">
            Moeda
            <select
              id="currency"
              name="currency"
              value={ currency }
              className="currencyInput"
              data-testid="currency-input"
              onChange={ this.handleChange2 }
            >
              { [...currencies].map((ele) => (
                <option key={ ele } value={ ele }>{ele}</option>
              ))}
            </select>
          </label>
        </section>
        <section className="btnsForm">
          {editor ? (
            <button
              type="button"
              disabled={ btnEdit }
              className="btnEdiForm"
              onClick={ this.edit }
            >
              <FaEdit className="iconBtnEdit" />
              Editar despesa
            </button>)
            : (
              <button
                type="button"
                disabled={ btndisabled }
                className="btnAddForm"
                onClick={ this.handleADD.bind(this) }
              >
                <MdAddCircle className="iconBtnAdd" />
                Adicionar despesa
              </button>
            )}
          <button
            type="button"
            disabled={ btndisabledDel }
            className="btnDelForm"
            onClick={ this.delete }
          >
            <MdDelete className="iconBtnDel" />
            Deletar todas despesas
          </button>
        </section>
      </form>
    );
  }
}

WalletForm.propTypes = {
  dispatch: PropTypes.func,
}.isRequired;

const mapStateToProps = (state) => ({
  email: state.user.email,
  currencies: state.wallet.currencies,
  expenses2: state.wallet.expenses,
  idEdit: state.wallet.idToEdit,
  editor: state.wallet.editor,
});

export default connect(mapStateToProps)(WalletForm);
