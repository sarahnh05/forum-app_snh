/**
 * skenario tes untuk ThreadInput
 *
 * - ThreadInput component
 *  - should handle title typing correctly
 *  - should handle category typing correctly
 *  - should handle body typing correctly
 *  - should call addThread function when submit button is clicked
 */

import React from 'react';
import { cleanup, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadInput from './ThreadInput';

expect.extend(matchers);

describe('RegisterInput component', () => {
  afterEach(() => {
    cleanup();
  });

  it('should handle title typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const titleInput = screen.getByPlaceholderText('Judul Diskusi');

    // Action
    await userEvent.type(titleInput, 'Judul Test');

    // Assert
    expect(titleInput).toHaveValue('Judul Test');
  });

  it('should handle body typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const bodyInput = screen.getByPlaceholderText('Tulis sesuatu...');

    // Action
    await userEvent.type(bodyInput, 'Body Test');

    // Assert
    expect(bodyInput).toHaveValue('Body Test');
  });

  it('should handle category typing correctly', async () => {
    // Arrange
    render(<ThreadInput addThread={() => {}} />);
    const categoryInput = screen.getByPlaceholderText('Kategori');

    // Action
    await userEvent.type(categoryInput, 'Test');

    // Assert
    expect(categoryInput).toHaveValue('Test');
  });

  it('should call addThread function when submit button is clicked', async () => {
    // Arrange
    const mockAddThread = jest.fn();
    render(<ThreadInput addThread={mockAddThread} />);

    const titleInput = screen.getByPlaceholderText('Judul Diskusi');
    await userEvent.type(titleInput, 'Judul Test');
    const bodyInput = screen.getByPlaceholderText('Tulis sesuatu...');
    await userEvent.type(bodyInput, 'Body Test');
    const categoryInput = screen.getByPlaceholderText('Kategori');
    await userEvent.type(categoryInput, 'Test');
    const submitButton = screen.getByRole('button', { name: 'Kirim Thread' });

    // Action
    await userEvent.click(submitButton);

    // Assert
    expect(mockAddThread).toHaveBeenCalledWith({
      title: 'Judul Test',
      body: 'Body Test',
      category: 'Test',
    });
  });
});