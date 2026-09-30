/**
 * skenario tes untuk LoginInput
 *
 * - LoginInput component
 *   - should handle email typing correctly
 *   - should handle password typing correctly
 *   - should call login function when login button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import LoginInput from './LoginInput';

expect.extend(matchers);

describe('LoginInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const emailInput = await screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'dicodingtest@dicodingmail.com');

    // Assert
    expect(emailInput).toHaveValue('dicodingtest@dicodingmail.co');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<LoginInput login={() => {}} />);
    const passwordInput = await screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'dicoding');

    // Assert
    expect(passwordInput).toHaveValue('dicoding');
  });

  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockLogin = jest.fn();
    render(<LoginInput login={mockLogin} />);
    const usernameInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(usernameInput, 'dicodingtest@dicodingmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'dicoding');
    const loginButton = await screen.getByRole('button', { name: 'Login' });

    // Action
    await userEvent.click(loginButton);

    // Assert
    expect(mockLogin).toBeCalledWith({
      email: 'dicodingtest@dicodingmail.com',
      password: 'dicoding',
    });
  });
});