import {
  ADD_CURRENCIES,
  ADD_EXPENSES,
  ADD_EDITOR,
  ADD_IDTOEDIT,
  DELETE_ALL_EXPENSES,
  REMOVE_ID,
} from '../actions/index';

const INITIAL_WALLET = {
  currencies: '',
  expenses: '',
  editor: false,
  idToEdit: 0,
};

const reducerWallet = (state = INITIAL_WALLET, action) => {
  switch (action.type) {
  case ADD_CURRENCIES:
    return ({
      ...state,
      currencies: action.currencies,
    });
  case ADD_EXPENSES:
    return ({
      ...state,
      expenses: [...state.expenses, action.expenses],
    });
  case ADD_EDITOR:
    return ({
      ...state,
      editor: action.editor,
    });
  case ADD_IDTOEDIT:
    return ({
      ...state,
      idToEdit: action.idToEdit,
    });
  case DELETE_ALL_EXPENSES:
    return ({
      ...state,
      expenses: action.expenses,
    });
  case REMOVE_ID:
    return ({
      ...state,
      expenses: action.payload,
    });
  default:
    return state;
  }
};

export default reducerWallet;
