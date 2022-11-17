export const ADD_EMAIL = 'ADD_EMAIL';

export const ADD_CURRENCIES = 'ADD_CURRENCIES';
export const ADD_EXPENSES = 'ADD_EXPENSES';
export const ADD_EDITOR = 'ADD_EDITOR';
export const ADD_IDTOEDIT = 'ADD_IDTOEDIT';

export const DELETE_ALL_EXPENSES = 'DELETE_ALL_EXPENSES';

export const REMOVE_ID = 'REMOVE_ID';

export const addEmail = (emailValue) => ({
  type: ADD_EMAIL,
  email: emailValue,
});

export const addCurrencies = (currenciesValue) => ({
  type: ADD_CURRENCIES,
  currencies: currenciesValue,
});

export const addExpenses = (expensesValue) => ({
  type: ADD_EXPENSES,
  expenses: expensesValue,
});

export const addEditor = (editorValue) => ({
  type: ADD_EDITOR,
  editor: editorValue,
});

export const addIDtoEditor = (IDtoEditValue) => ({
  type: ADD_IDTOEDIT,
  idToEdit: IDtoEditValue,
});

export const deleteAllExpenses = (expensesDelete) => ({
  type: DELETE_ALL_EXPENSES,
  expenses: expensesDelete,
});

export const removeID = (payload) => ({
  type: REMOVE_ID,
  payload,
});
