/**
* skenario tes untuk asyncReceiveThreadDetail dan asyncAddComment Thunks
*
* - asyncReceiveThreadDetail thunk
*   - should dispatch action correctly when data fetching succeeds
*   - should dispatch action and call alert correctly when data fetching fails
*
* - asyncAddComment thunk
*   - should dispatch action correctly when comment creation succeeds
*   - should dispatch action and call alert correctly when comment creation fails
*/

import api from '../../utils/api';
import { hideLoading, showLoading } from '../loading/slice';
import { addCommentActionCreator, asyncAddComment, asyncReceiveThreadDetail, receiveThreadDetailActionCreator } from './action';

const fakeThreadDetailResponse = {
  id: 'thread-1',
  title: 'Thread Pertama',
  body: 'Ini adalah thread pertama',
  category: 'General',
  createdAt: '2026-09-27T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
  comments: [],
};

const fakeCommentResponse = {
  id: 'comment-1',
  content: 'Ini adalah komentar pertama',
  createdAt: '2026-08-26T07:00:00.000Z',
  owner: {
    id: 'users-1',
    name: 'John Doe',
    avatar: 'https://generated-image-url.jpg',
  },
  upVotesBy: [],
  downVotesBy: [],
};

const fakeErrorResponse = new Error('Ups, something went wrong');

describe('asyncReceiveThreadDetail thunk', () => {
  beforeEach(() => {
    api._getThreadDetail = api.getThreadDetail;
  });

  afterEach(() => {
    api.getThreadDetail = api._getThreadDetail;
    delete api._getThreadDetail;
  });

  it('should dispatch action correctly when data fetching succeeds', async () => {
    // Arrange
    api.getThreadDetail = () => Promise.resolve(fakeThreadDetailResponse);
    const dispatch = jest.fn();

    // Action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(receiveThreadDetailActionCreator(fakeThreadDetailResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when data fetching fails', async () => {
    // Arrange
    api.getThreadDetail = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    // Action
    await asyncReceiveThreadDetail('thread-1')(dispatch);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});

describe('asyncAddComment thunk', () => {
  beforeEach(() => {
    api._createComment = api.createComment;
  });

  afterEach(() => {
    api.createComment = api._createComment;
    delete api._createComment;
  });

  it('should dispatch action correctly when comment creation succeeds', async () => {
    // Arrange
    api.createComment = () => Promise.resolve(fakeCommentResponse);
    const dispatch = jest.fn();

    const getState = jest.fn().mockReturnValue({
      detailThread: {
        id: 'thread-1',
      },
    });

    const commentInput = {
      threadId: 'thread-1',
      content: 'Ini adalah komentar pertama',
    };

    // Action
    await asyncAddComment(commentInput)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(addCommentActionCreator(fakeCommentResponse));
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
  });

  it('should dispatch action and call alert correctly when comment creation fails', async () => {
    // Arrange
    api.createComment = () => Promise.reject(fakeErrorResponse);
    const dispatch = jest.fn();
    window.alert = jest.fn();

    const getState = jest.fn().mockReturnValue({
      detailThread: {
        id: 'thread-1',
      },
    });

    const commentInput = {
      threadId: 'thread-1',
      content: 'Ini adalah komentar pertama',
    };

    // Action
    await asyncAddComment(commentInput)(dispatch, getState);

    // Assert
    expect(dispatch).toHaveBeenCalledWith(showLoading());
    expect(dispatch).toHaveBeenCalledWith(hideLoading());
    expect(window.alert).toHaveBeenCalledWith(fakeErrorResponse.message);
  });
});