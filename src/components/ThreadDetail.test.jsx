/**
 * skenario tes untuk ThreadDetail
 *
 * - ThreadDetail component
 *  - should render thread correctly
 *  - should call upVote function when upvote button is clicked
 *  - should call downVote function when downvote button is clicked
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import matchers from '@testing-library/jest-dom/matchers';
import ThreadDetail from './ThreadDetail';

jest.mock('html-react-parser', () => (html) => html);
expect.extend(matchers);

const fakeThreadDetail = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2026-08-26T07:00:00.000Z',
  upVotesBy: [],
  downVotesBy: [],
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
};

const fakeAuthUser = 'users-1';

describe('ThreadDetail component', () => {
  it('should render thread correctly', () => {
    render(
      <ThreadDetail
        {...fakeThreadDetail}
        authUser={fakeAuthUser}
      />
    );

    expect(screen.getByText('Thread Pertama')).toBeInTheDocument();
    expect(screen.getByText('Ini adalah thread pertama')).toBeInTheDocument();
    expect(screen.getByText('#General')).toBeInTheDocument();
    expect(screen.getByText('John Doe')).toBeInTheDocument();
  });

  it('should call upVote function when upvote button is clicked', async () => {
    // Arrange
    const mockUpVoteThread = jest.fn();
    const mockDownVoteThread = jest.fn();

    render(
      <ThreadDetail
        {...fakeThreadDetail}
        authUser={fakeAuthUser}
        upvoteThread={mockUpVoteThread}
        downvoteThread={mockDownVoteThread}
      />
    );

    const upVoteButton = screen.getByTestId('upvote-button');

    // Action
    await userEvent.click(upVoteButton);

    // Assert
    expect(mockUpVoteThread).toHaveBeenCalledWith('thread-1');
  });

  it('should call downVote function when downvote button is clicked', async () => {
    // Arrange
    const mockUpVoteThread = jest.fn();
    const mockDownVoteThread = jest.fn();

    render(
      <ThreadDetail
        {...fakeThreadDetail}
        authUser={fakeAuthUser}
        upvoteThread={mockUpVoteThread}
        downvoteThread={mockDownVoteThread}
      />
    );


    const downVoteButton = screen.getByTestId('downvote-button');

    // Action
    await userEvent.click(downVoteButton);

    // Assert
    expect(mockDownVoteThread).toHaveBeenCalledWith('thread-1');
  });
});