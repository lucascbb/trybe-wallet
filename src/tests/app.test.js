import React from 'react';
import { screen } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import userEvent from '@testing-library/user-event';
import { renderWithRouterAndRedux } from './helpers/renderWith';
import App from '../App';

describe('Página de LOGIN', () => {
  test('1- Verificar se ao carregar a apalicação inicia na rota (/)', () => {
    const { history } = renderWithRouterAndRedux(<App />);

    act(() => {
      history.push('/');
    });

    expect(history.location.pathname).toBe('/');
  });

  test('1.1- Verificar se tem um input e-mail e senha', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });

    const inputEmail = screen.getByTestId('email-input');
    expect(inputEmail).toBeInTheDocument();

    const inputSenha = screen.getByTestId('password-input');
    expect(inputSenha).toBeInTheDocument();
  });

  test('1.2- Precisa ter um button com nome Entrar', () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });
    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toBeInTheDocument();
  });

  test('1.3- O email precisa estar em um formato válido', async () => {
    const { history } = renderWithRouterAndRedux(<App />);
    act(() => {
      history.push('/');
    });

    const button = screen.getByRole('button', { name: 'Entrar' });
    expect(button).toHaveProperty('disabled', true);

    const inputEmail = screen.getByPlaceholderText('E-mail');
    expect(inputEmail).toBeInTheDocument();

    const inputSenha = screen.getByPlaceholderText('Senha');
    expect(inputSenha).toBeInTheDocument();

    const email = 'nomeSobrenome@hotmail.com';

    userEvent.type(inputEmail, email);
    expect(inputEmail.value).toBe(email);

    // expect(inputEmail.placeholder).toBe(email);

    expect(button).toHaveProperty('disabled', true);

    userEvent.type(inputSenha, '123456');
    expect(inputSenha.value).toBe('123456');

    expect(button).toHaveProperty('disabled', false);

    userEvent.click(button);
    expect(history.location.pathname).toBe('/carteira');
  });
});
