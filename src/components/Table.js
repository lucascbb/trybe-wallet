import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeID, addIDtoEditor, addEditor } from '../redux/actions/index';
import './Table.css';

class Table extends Component {
  componentDidUpdate() {
    this.funcTable();
  }

  formatarReal = (numero) => numero.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  removeID = ({ target }) => {
    const { dispatch, expenses } = this.props;
    const remove = expenses.filter((ele) => Number(ele.id) !== Number(target.id));
    dispatch(removeID(remove));
    dispatch(addEditor(false));
  };

  editID = ({ target }) => {
    const { dispatch } = this.props;
    dispatch(addIDtoEditor(target.id));
    dispatch(addEditor(true));
  };

  funcTable = () => {
    const { expenses } = this.props;
    if (expenses.length > 0) {
      return (
        [...expenses].map((tab, index) => (
          <tr name={ tab.value } key={ tab.value } className="paiResultTable">
            <td className="desc2" data-label="Descrição">
              {tab.description}
            </td>
            <td className="value2" data-label="Valor gasto">
              { this.formatarReal(Number(tab.value)) }
            </td>
            <td className="tag2" data-label="Categoria">
              {tab.tag}
            </td>
            <td className="method2" data-label="Método de pagamento">
              {tab.method}
            </td>
            <td className="moeda2" data-label="Moeda Usada">
              {tab.exchangeRates[tab.currency].name.replace('/Real Brasileiro', '')}
            </td>
            <td className="cambio2" data-label="Cambio da moeda">
              { this.formatarReal(Number(tab.exchangeRates[tab.currency].ask)) }
            </td>
            <td className="valueConv2" data-label="Valor em reais">
              { this.formatarReal(Number(tab.exchangeRates[tab.currency].ask)
              * Number(tab.value)) }
            </td>
            <td className="editDel2" data-label={ index + 1 }>
              <button
                id={ tab.id }
                type="button"
                className="btnEditTable"
                data-testid="edit-btn"
                onClick={ this.editID }
              >
                Editar
              </button>
              <button
                id={ tab.id }
                type="button"
                className="btnDelTable"
                data-testid="delete-btn"
                onClick={ this.removeID }
              >
                Deletar
              </button>
            </td>
          </tr>
        )));
    }
  };

  render() {
    const { expenses } = this.props;
    return (
      <div className="tableDivPai">
        <table className="table">
          <thead>
            <tr>
              <th className="desc">Descrição</th>
              <th className="value">Valor</th>
              <th className="tag">Tag</th>
              <th className="method">Método pagamento</th>
              <th className="moeda">Moeda usada</th>
              <th className="cambio">Valor do câmbio</th>
              <th className="valueConv">Valor em reais</th>
              <th className="editDel">Editar/ Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.length > 0 ? (this.funcTable()) : null }
          </tbody>
        </table>
      </div>
    );
  }
}

Table.propTypes = {
  expenses: PropTypes.object,
}.isRequired;

const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
  idEdit: state.wallet.idToEdit,
});

export default connect(mapStateToProps)(Table);
