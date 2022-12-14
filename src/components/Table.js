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
        [...expenses].map((tab) => (
          <tr name={ tab.value } key={ tab.value } className="paiResultTable">
            <td className="desc2">
              {tab.description}
            </td>
            <td className="tag2">
              {tab.tag}
            </td>
            <td className="method2">
              {tab.method}
            </td>
            <td className="value2">
              {(Number(tab.value)).toLocaleString('de-DE', { maximumFractionDigits: 2 })}
            </td>
            <td className="moeda2">
              {tab.exchangeRates[tab.currency].name.replace('/Real Brasileiro', '')}
            </td>
            <td className="cambio2">
              {(Number(tab.exchangeRates[tab.currency].ask))
                .toLocaleString('de-DE', { maximumFractionDigits: 2 })}
            </td>
            <td className="valueConv2">
              {(tab.exchangeRates[tab.currency].ask * tab.value)
                .toLocaleString('de-DE', { maximumFractionDigits: 2 })}
            </td>
            {/* <td className="moedaConv2">
              Real
            </td> */}
            <td className="editDel2">
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
        <table className="tablePai">
          <thead>
            <tr className="trPai">
              <th className="desc">Descri????o</th>
              <th className="tag">Tag</th>
              <th className="method">M??todo pagamento</th>
              <th className="value">Valor</th>
              <th className="moeda">Moeda usada</th>
              <th className="cambio">Valor do c??mbio</th>
              <th className="valueConv">Valor em reais</th>
              {/* <th className="moedaConv">Moeda de convers??o</th> */}
              <th className="editDel">Editar/ Excluir</th>
            </tr>
          </thead>
          <tbody>
            { expenses.length > 0 ? (this.funcTable()) : null}
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
