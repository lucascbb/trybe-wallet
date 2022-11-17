import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('TABLE', () => {
  test('1- Verificar se ao carregar a aplicação contem as cabecas de chave da tabela', async () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/carteira');
    });

    const desc = screen.getByText('Descrição');
    expect(desc).toBeInTheDocument();

    const tag = screen.getByText('Tag');
    expect(tag).toBeInTheDocument();

    const cambio = screen.getByText('Câmbio utilizado');
    expect(cambio).toBeInTheDocument();

    const convertido = screen.getByText('Valor convertido');
    expect(convertido).toBeInTheDocument();

    const moedaConvertido = screen.getByText('Moeda de conversão');
    expect(moedaConvertido).toBeInTheDocument();

    const editRemove = screen.getByText('Editar/Excluir');
    expect(editRemove).toBeInTheDocument();

    const addDespesa = screen.getByRole('button', { name: 'Adicionar despesa' });
    expect(addDespesa).toBeInTheDocument();

    const valorInput = screen.getByTestId('value-input');
    const descInput = screen.getByTestId('description-input');
    const moedaInput = screen.getByTestId('currency-input');
    const btnDespesa = screen.getByRole('button', { name: 'Adicionar despesa' });

    userEvent.type(valorInput, '11');
    userEvent.type(descInput, 'Onze dolares');
    userEvent.type(moedaInput, 'USD');
    userEvent.click(btnDespesa);

    expect(await screen.findByText('Onze dolares')).toBeInTheDocument();
    expect(await screen.findByText('11.00')).toBeInTheDocument();
    expect(await screen.findByText('Dólar Americano/Real Brasileiro')).toBeInTheDocument();
    expect(await screen.findByText('Real')).toBeInTheDocument();

    const btnRemove = screen.getByRole('button', { name: 'Deletar' });
    expect(await screen.findByTestId('delete-btn')).toBeInTheDocument();
    userEvent.click(btnRemove);
  });
});
