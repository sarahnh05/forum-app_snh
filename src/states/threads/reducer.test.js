/**
* skenario tes untuk threadsReducer
*
* - threadsReducer function
*  - should return the initial state when given by unknown action
*  - should return the threads when given by RECEIVE_THREADS action
*  - should return the threads with the new thread when given by ADD_THREAD action
*  - should return the threads with the toggled upvote thread when given by TOGGLE_VOTE_THREAD action when voteType is 1
*  - should return the threads with the toggled downvote thread when given by TOGGLE_VOTE_THREAD action when voteType is -1
*  - should return the threads with toggled neutralvote thread when given by TOGGLE_VOTE_THREAD action when voteType is 0
*/

import threadsReducer from './reducer';

describe('threadsReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = [];
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the threads when given by RECEIVE_THREADS action', () => {
    // arrange
    const initialState = [];
    const action = {
      type: 'RECEIVE_THREADS',
      payload: {
        threads: [
          {
            id: 'thread-1',
            title: 'Thread Pertama',
            body: 'Ini adalah thread pertama',
            category: 'General',
            createdAt: '2026-08-26T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          },
          {
            id: 'thread-2',
            title: 'Thread Kedua',
            body: 'Ini adalah thread kedua',
            category: 'General',
            createdAt: '2026-08-26T07:00:00.000Z',
            ownerId: 'users-2',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.threads);
  });

  it('should return the threads with the new thread when given by ADD_THREAD action', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2026-08-26T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      },
      {
        id: 'thread-2',
        title: 'Thread Kedua',
        body: 'Ini adalah thread kedua',
        category: 'General',
        createdAt: '2026-08-26T07:00:00.000Z',
        ownerId: 'users-2',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ];

    const action = {
      type: 'ADD_THREAD',
      payload: {
        thread: [
          {
            id: 'thread-3',
            title: 'Thread Ketiga',
            body: 'Ini adalah thread ketiga',
            category: 'General',
            createdAt: '2026-08-26T07:00:00.000Z',
            ownerId: 'users-1',
            upVotesBy: [],
            downVotesBy: [],
            totalComments: 0
          }
        ]
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([action.payload.thread, ...initialState]);
  });


  it('should return the threads with the toggled upvote thread when given by TOGGLE_VOTE_THREAD action when voteType is 1', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2026-08-26T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ];

    const action = {
      type: 'TOGGLE_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
        voteType: 1,
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([{
      ...initialState[0],
      upVotesBy: ['users-1'],
      downVotesBy: [],
    }]);
  });

  it('should return the threads with the toggled downvote thread when given by TOGGLE_VOTE_THREAD action when voteType is -1', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2026-08-26T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: [],
        downVotesBy: [],
        totalComments: 0
      }
    ];

    const action = {
      type: 'TOGGLE_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
        voteType: -1,
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([{
      ...initialState[0],
      upVotesBy: [],
      downVotesBy: ['users-1'],
    }]);
  });


  it('should return the threads with toggled neutralvote thread when given by TOGGLE_VOTE_THREAD action when voteType is 0', () => {
    // arrange
    const initialState = [
      {
        id: 'thread-1',
        title: 'Thread Pertama',
        body: 'Ini adalah thread pertama',
        category: 'General',
        createdAt: '2026-08-26T07:00:00.000Z',
        ownerId: 'users-1',
        upVotesBy: ['users-1'],
        downVotesBy: [],
        totalComments: 0
      }
    ];

    const action = {
      type: 'TOGGLE_VOTE_THREAD',
      payload: {
        threadId: 'thread-1',
        userId: 'users-1',
        voteType: 0,
      }
    };

    // action
    const nextState = threadsReducer(initialState, action);

    // assert
    expect(nextState).toEqual([{
      ...initialState[0],
      upVotesBy: [],
      downVotesBy: [],
    }]);
  });
});