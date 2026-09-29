/**
 * skenario tes untuk RegisterInput
 *
 * - RegisterInput component
 *  - should handle name typing correctly
 *  - should handle email typing correctly
 *  - should handle password typing correctly
 *  - should call register function when register button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import RegisterInput from './RegisterInput';


expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle name typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const nameInput = screen.getByPlaceholderText('Name');

    // Action
    await userEvent.type(nameInput, 'Dicoding');

    // Assert
    expect(nameInput).toHaveValue('Dicoding');
  });

  it('should handle email typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const emailInput = screen.getByPlaceholderText('Email');

    // Action
    await userEvent.type(emailInput, 'dicodingtest@dicodingmail.com');

    // Assert
    expect(emailInput).toHaveValue('dicodingtest@dicodingmail.com');
  });

  it('should handle password typing correctly', async () => {
    // Arrange
    render(<RegisterInput register={() => {}} />);
    const passwordInput = screen.getByPlaceholderText('Password');

    // Action
    await userEvent.type(passwordInput, 'dicoding');

    // Assert
    expect(passwordInput).toHaveValue('dicoding');
  });
  it('should call login function when login button is clicked', async () => {
    // Arrange
    const mockRegister = jest.fn();
    render(<RegisterInput register={mockRegister} />);
    const nameInput = await screen.getByPlaceholderText('Name');
    await userEvent.type(nameInput, 'Dicoding');
    const emailInput = await screen.getByPlaceholderText('Email');
    await userEvent.type(emailInput, 'dicodingtest@dicodingmail.com');
    const passwordInput = await screen.getByPlaceholderText('Password');
    await userEvent.type(passwordInput, 'dicoding');
    const registerButton = await screen.getByRole('button', { name: 'Register' });

    // Action
    await userEvent.click(registerButton);

    // Assert
    expect(mockRegister).toBeCalledWith({
      name: 'Dicoding',
      email: 'dicodingtest@dicodingmail.com',
      password: 'dicoding',
    });
  });
});