import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { removeID, addIDtoEditor, addEditor } from '../redux/actions/index';
import './Table.css';

class Table extends Component {
  componentDidUpdate() {
    this.funcTable();
  }

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
              {(Number(tab.value)).toLocaleString('de-DE', { maximumFractionDigits: 2 })}
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
              {(Number(tab.exchangeRates[tab.currency].ask))
                .toLocaleString('de-DE', { maximumFractionDigits: 2 })}
            </td>
            <td className="valueConv2" data-label="Valor em reais">
              {(tab.exchangeRates[tab.currency].ask * tab.value)
                .toLocaleString('de-DE', { maximumFractionDigits: 2 })}
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
            <th className="desc">Descrição</th>
            <th className="tag">Tag</th>
            <th className="method">Método pagamento</th>
            <th className="value">Valor</th>
            <th className="moeda">Moeda usada</th>
            <th className="cambio">Valor do câmbio</th>
            <th className="valueConv">Valor em reais</th>
            <th className="editDel">Editar/ Excluir</th>
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
