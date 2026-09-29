/**
* skenario tes untuk detailThreadReducer
*
* - detailThreadReducer function
*  - should return the initial state when given by unknown action
*  - should return the detailThread when given by RECEIVE_THREAD_DETAIL action
*  - should return null when given by CLEAR_THREAD_DETAIL action
*  - should return the detailThread with the toggled upvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is 1
*  - should return the detailThread with the toggled downvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is -1
*  - should return the detailThread with toggled neutralvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is 0
*
*  - should return the detailThread with new comment when given by ADD_COMMENT action
*  - should return the detailThread with the toggled upvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is 1
*  - should return the detailThread with the toggled downvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is -1
*  - should return the detailThread with toggled neutralvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is 0
*/

import detailThreadReducer from './reducer';


describe('detailThreadReducer function', () => {
  it('should return the initial state when given by unknown action', () => {
    // arrange
    const initialState = null;
    const action = { type: 'UNKNOWN' };

    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(initialState);
  });

  it('should return the detailThread when given by RECEIVE_THREAD_DETAIL action', () => {
    // arrange
    const initialState = null;
    const action = {
      type: 'RECEIVE_THREAD_DETAIL',
      payload: {
        detailThread: {
          id: 'thread-1',
          title: 'Thread Pertama',
          body: 'Ini adalah thread pertama',
          category: 'General',
          createdAt: '2026-08-26T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
            avatar: 'https://generated-image-url.jpg',
          },
          upVotesBy: [],
          downVotesBy: [],
          comments: [],
        },
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual(action.payload.detailThread);
  });

  it('should return null when given by CLEAR_THREAD_DETAIL action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'CLEAR_THREAD_DETAIL',
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toBeNull();
  });

  it('should return the detailThread with the toggled upvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is 1', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'TOGGLE_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-1',
        voteType: 1,
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: ['users-1'],
      downVotesBy: [],
    });
  });

  it('should return the detailThread with the toggled downvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is -1', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'TOGGLE_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-1',
        voteType: -1,
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: ['users-1'],
    });
  });

  it('should return the detailThread with toggled neutralvote threadDetail when given by TOGGLE_VOTE_THREAD_DETAIL action when voteType is 0', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: ['users-1'],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'TOGGLE_VOTE_THREAD_DETAIL',
      payload: {
        userId: 'users-1',
        voteType: 0,
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      upVotesBy: [],
      downVotesBy: [],
    });
  });


  it('should return the detailThread with new comment when given by ADD_COMMENT action', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [],
    };

    const action = {
      type: 'ADD_COMMENT',
      payload: {
        comment: {
          id: 'comment-1',
          content: 'Ini adalah komentar pertama',
          createdAt: '2026-08-26T07:00:00.000Z',
          owner: {
            id: 'users-1',
            name: 'John Doe',
          },
          upVotesBy: [],
          downVotesBy: [],
        },
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [action.payload.comment, ...initialState.comments],
    });
  });

  it('should return the detailThread with the toggled upvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is 1', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2026-08-26T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
        },
        upVotesBy: [],
        downVotesBy: [],
      }],
    };

    const action = {
      type: 'TOGGLE_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
        voteType: 1
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: ['users-1'],
        downVotesBy: [],
      }],
    });
  });

  it('should return the detailThread with the toggled downvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is -1', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2026-08-26T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
        },
        upVotesBy: [],
        downVotesBy: [],
      }],
    };

    const action = {
      type: 'TOGGLE_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
        voteType: -1
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [],
        downVotesBy: ['users-1'],
      }],
    });
  });


  it('should return the detailThread with the toggled neutralvote comment when given by TOGGLE_VOTE_COMMENT action when voteType is 0', () => {
    // arrange
    const initialState = {
      id: 'thread-1',
      title: 'Thread Pertama',
      body: 'Ini adalah thread pertama',
      category: 'General',
      createdAt: '2026-08-26T07:00:00.000Z',
      owner: {
        id: 'users-1',
        name: 'John Doe',
        avatar: 'https://generated-image-url.jpg',
      },
      upVotesBy: [],
      downVotesBy: [],
      comments: [{
        id: 'comment-1',
        content: 'Ini adalah komentar pertama',
        createdAt: '2026-08-26T07:00:00.000Z',
        owner: {
          id: 'users-1',
          name: 'John Doe',
        },
        upVotesBy: ['users-1'],
        downVotesBy: [],
      }],
    };

    const action = {
      type: 'TOGGLE_VOTE_COMMENT',
      payload: {
        commentId: 'comment-1',
        userId: 'users-1',
        voteType: 0
      },
    };


    // action
    const nextState = detailThreadReducer(initialState, action);

    // assert
    expect(nextState).toEqual({
      ...initialState,
      comments: [{
        ...initialState.comments[0],
        upVotesBy: [],
        downVotesBy: [],
      }],
    });
  });
});