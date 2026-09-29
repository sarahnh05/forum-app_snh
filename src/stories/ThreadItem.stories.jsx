import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { MemoryRouter } from 'react-router-dom';
import ThreadItem from '../components/ThreadItem';
import PropTypes from 'prop-types';
import Avatar from './Assets/avatar.jpg';

const mockAuthUser = {
  id: 'users-1',
  name: 'Dicoding',
};

const createMockStore = (authUser) =>
  configureStore({
    reducer: {
      authUser: () => authUser,
    },
  });

const mockThread = {
  id: 'thread-1',
  title: 'Judul Thread',
  body: 'Ini adalah body thread',
  category: 'General',
  createdAt: '2026-09-29T07:00:00.000Z',
  user: {
    id: 'users-1',
    name: 'Dicoding',
    avatar: Avatar,
  },
};

export default {
  title: 'Components/ThreadItem',
  component: ThreadItem,

  decorators: [
    (Story) => (
      <Provider store={createMockStore(mockAuthUser)}>
        <MemoryRouter>
          <Story />
        </MemoryRouter>
      </Provider>
    ),
  ],

  argTypes: {
    upvote: { action: 'upvote clicked' },
    downvote: { action: 'downvote clicked' },
  },
};

export const Default = {
  args: {
    ...mockThread,
    upVotesBy: ['users-2'],
    downVotesBy: [],
  },
};

export const Upvoted = {
  args: {
    ...mockThread,
    upVotesBy: ['users-2', 'users-1'],
    downVotesBy: [],
  },
};

export const Downvoted = {
  args: {
    ...mockThread,
    upVotesBy: ['users-2'],
    downVotesBy: ['users-1'],
  },
};

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upvote: PropTypes.func,
  downvote: PropTypes.func,
};

ThreadItem.defaultProps = {
  upvote: null,
  downvote: null,
};