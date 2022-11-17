import { ADD_EMAIL } from '../actions/index';

const INITIAL_EMAIL = {
  email: '',
  senha: '',
};

const reducer = (state = INITIAL_EMAIL, action) => {
  switch (action.type) {
  case ADD_EMAIL:
    return ({
      ...state,
      email: action.email,
      senha: action.senha,
    });
  default:
    return state;
  }
};

export default reducer;
