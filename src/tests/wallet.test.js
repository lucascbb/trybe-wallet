import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';
import store from '../redux/store';

describe('Página de LOGIN', () => {
  test('1- Verificar se ao carregar a apalicação contem o valor, a moeda e o email', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    expect(history.location.pathname).toBe('/carteira');

    const valorZero = screen.getByTestId('total-field');
    expect(valorZero).toBeInTheDocument();

    const brasil = screen.getByTestId('header-currency-field');
    expect(brasil).toBeInTheDocument();

    expect(brasil).toHaveTextContent('BRL');
    expect(valorZero).toHaveTextContent('0.00');
  });

  test('1.1 - Verificar se ao carregar a apalicação contem os inputs e os selects', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const valor = screen.getByTestId('value-input');
    expect(valor).toBeInTheDocument();

    const desc = screen.getByTestId('description-input');
    expect(desc).toBeInTheDocument();

    const moeda = screen.getByTestId('currency-input');
    expect(moeda).toBeInTheDocument();

    const method = screen.getByTestId('method-input');
    expect(method).toBeInTheDocument();

    const tag = screen.getByTestId('tag-input');
    expect(tag).toBeInTheDocument();

    const btnDespesa = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(btnDespesa).toBeInTheDocument();

    const onze = 'Onze dolares';
    userEvent.type(valor, '11');
    userEvent.type(desc, onze);
    userEvent.click(btnDespesa);

    expect(await screen.findByText(onze)).toBeInTheDocument();
    expect(await screen.findByText('11.00')).toBeInTheDocument();

    const btnDel = screen.getByRole('button', { name: 'Deletar' });
    expect(btnDel).toBeInTheDocument();

    const btnEdit = screen.getByRole('button', { name: 'Editar' });
    expect(btnEdit).toBeInTheDocument();

    userEvent.click(btnEdit);

    userEvent.type(valor, '10');
    userEvent.type(desc, 'Dez dolares');

    const btnEditOK = screen.getByRole('button', { name: 'Editar despesa' });
    expect(btnEditOK).toBeInTheDocument();

    userEvent.click(btnEditOK);

    expect(btnDespesa).toBeInTheDocument();
    expect(btnDespesa).toHaveProperty('disabled', false);

    expect(await store.getState().wallet.editor).toBe(false);
    expect(await screen.findByRole('button', { name: 'Editar despesa' })).toBeVisible();
    expect(await screen.findByText('Onze dolares')).toBeInTheDocument();
    expect(await screen.findByText('11.00')).toBeInTheDocument();
    const tableNewCoin = await screen.findByRole('cell', { name: 'Dólar Americano/Real Brasileiro' });
    expect(tableNewCoin).toBeInTheDocument();
    expect(btnEditOK).toBeInTheDocument();

    console.log(store.getState().wallet);

    const deleteBTN = await screen.findByTestId('delete-btn');
    userEvent.click(deleteBTN);

    const removeALL = screen.getByRole('button', { name: 'Deletar Todas' });
    expect(removeALL).toBeInTheDocument();

    userEvent.click(removeALL);

    expect(btnDespesa).toHaveProperty('disabled', false);
    expect(valor).toBeInTheDocument();
    expect(await screen.findByText('11.00')).not.toBeInTheDocument();
  });
});
