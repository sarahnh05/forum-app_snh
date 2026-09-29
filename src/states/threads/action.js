import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const ActionType = {
  RECEIVE_THREADS: 'RECEIVE_THREADS',
  ADD_THREAD: 'ADD_THREAD',
  TOGGLE_VOTE_THREAD: 'TOGGLE_VOTE_THREAD',
};

function receiveThreadsActionCreator(threads) {
  return {
    type: ActionType.RECEIVE_THREADS,
    payload: {
      threads,
    },
  };
}

function addThreadActionCreator(thread) {
  return {
    type: ActionType.ADD_THREAD,
    payload: {
      thread,
    },
  };
}

function toggleVoteThreadActionCreator({ threadId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD,
    payload: {
      threadId,
      userId,
      voteType,
    },
  };
}

function asyncAddThread({ title, body, category }) {
  return async (dispatch) => {
    dispatch(showLoading());

    try {
      const thread = await api.createThread({ title, body, category });
      dispatch(addThreadActionCreator(thread));

    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silahkan login terlebih dahulu');
      return;
    }

    const thread = threads.find((thread) => thread.id === threadId);
    const isUpvoted = thread.upVotesBy.includes(authUser.id);

    dispatch(toggleVoteThreadActionCreator({
      threadId,
      userId: authUser.id,
      voteType: isUpvoted ? 0 : 1
    }));


    try {
      if (isUpvoted) {
        await api.toggleNeutralvoteThread(threadId);
      } else {
        await api.toggleUpvoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType: isUpvoted ? 1 : 0 }));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownvoteThread(threadId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, threads } = getState();

    if (!authUser) {
      alert('Silahkan login terlebih dahulu');
      return;
    }

    const thread = threads.find((thread) => thread.id === threadId);
    const isDownvoted = thread.downVotesBy.includes(authUser.id);

    dispatch(toggleVoteThreadActionCreator({
      threadId,
      userId: authUser.id,
      voteType: isDownvoted ? 0 : -1
    }));

    try {
      if (isDownvoted) {
        await api.toggleNeutralvoteThread(threadId);
      } else {
        await api.toggleDownvoteThread(threadId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadActionCreator({
        threadId,
        userId: authUser.id,
        voteType: isDownvoted ? 0 : -1 }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadsActionCreator,
  addThreadActionCreator,
  asyncAddThread,
  asyncToggleUpvoteThread,
  asyncToggleDownvoteThread,
};
