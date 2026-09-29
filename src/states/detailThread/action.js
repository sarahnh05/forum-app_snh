import api from '../../utils/api';
import { showLoading, hideLoading } from '../loading/slice';

const ActionType = {
  RECEIVE_THREAD_DETAIL: 'RECEIVE_THREAD_DETAIL',
  CLEAR_THREAD_DETAIL: 'CLEAR_THREAD_DETAIL',
  TOGGLE_VOTE_THREAD_DETAIL: 'TOGGLE_VOTE_THREAD_DETAIL',
  ADD_COMMENT: 'ADD_COMMENT',
  TOGGLE_VOTE_COMMENT: 'TOGGLE_VOTE_COMMENT',
};

function receiveThreadDetailActionCreator(detailThread) {
  return {
    type: ActionType.RECEIVE_THREAD_DETAIL,
    payload: { detailThread },
  };
}

function clearThreadDetailActionCreator() {
  return {
    type: ActionType.CLEAR_THREAD_DETAIL,
  };
}

function toggleVoteThreadDetailActionCreator({ userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_THREAD_DETAIL,
    payload: { userId, voteType },
  };
}

function toggleVoteCommentActionCreator({ commentId, userId, voteType }) {
  return {
    type: ActionType.TOGGLE_VOTE_COMMENT,
    payload: { commentId, userId, voteType },
  };
}

function addCommentActionCreator(comment) {
  return {
    type: ActionType.ADD_COMMENT,
    payload: { comment },
  };
}

function asyncReceiveThreadDetail(threadId) {
  return async (dispatch) => {
    dispatch(showLoading());

    dispatch(clearThreadDetailActionCreator());
    try {
      const detailThread = await api.getThreadDetail(threadId);
      dispatch(receiveThreadDetailActionCreator(detailThread));
    } catch (error) {
      alert(error.message);
    }

    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Silakhan login terlebih dahulu');
      return;
    }

    const isUpvoted = detailThread.upVotesBy.includes(authUser.id);

    dispatch(toggleVoteThreadDetailActionCreator({
      userId: authUser.id,
      voteType: isUpvoted ? 0 : 1,
    }));

    try {
      if (isUpvoted) {
        await api.toggleNeutralvoteThread(detailThread.id);
      } else {
        await api.toggleUpvoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadDetailActionCreator({
        userId: authUser.id,
        voteType: isUpvoted ? 1 : 0 }));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownvoteDetailThread() {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Silakhan login terlebih dahulu');
      return;
    }

    const isDownvoted = detailThread.downVotesBy.includes(authUser.id);

    dispatch(toggleVoteThreadDetailActionCreator({
      userId: authUser.id,
      voteType: isDownvoted ? 0 : -1,
    }));

    try {
      if (isDownvoted) {
        await api.toggleNeutralvoteThread(detailThread.id);
      } else {
        await api.toggleDownvoteThread(detailThread.id);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteThreadDetailActionCreator({
        userId: authUser.id,
        voteType: isDownvoted ? -1 : 0 }));
    }
    dispatch(hideLoading());
  };
}

function asyncAddComment({ content }) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { detailThread } = getState();
    try {
      const comment = await api.createComment({
        threadId: detailThread.id,
        content,
      });
      dispatch(addCommentActionCreator(comment));
    } catch (error) {
      alert(error.message);
    }
    dispatch(hideLoading());
  };
}

function asyncToggleUpvoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Silahkan login terlebih dahulu');
      return;
    }

    const comment = detailThread.comments.find((comment) => comment.id === commentId);
    const isUpvoted = comment.upVotesBy.includes(authUser.id);

    dispatch(toggleVoteCommentActionCreator({
      commentId,
      userId: authUser.id,
      voteType: isUpvoted ? 0 : 1,
    }));

    try {
      if (isUpvoted) {
        await api.toggleNeutralvoteComment(detailThread.id, commentId);
      } else {
        await api.toggleUpvoteComment(detailThread.id, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType: isUpvoted ? 1 : 0,
      }));
    }
    dispatch(hideLoading());
  };
}

function asyncToggleDownvoteComment(commentId) {
  return async (dispatch, getState) => {
    dispatch(showLoading());

    const { authUser, detailThread } = getState();

    if (!authUser) {
      alert('Silahkan login terlebih dahulu');
      return;
    }

    const comment = detailThread.comments.find((comment) => comment.id === commentId);
    const isDownvoted = comment.downVotesBy.includes(authUser.id);

    dispatch(toggleVoteCommentActionCreator({
      commentId,
      userId: authUser.id,
      voteType: isDownvoted ? 0 : -1,
    }));

    try {
      if (isDownvoted) {
        await api.toggleNeutralvoteComment(detailThread.id, commentId);
      } else {
        await api.toggleDownvoteComment(detailThread.id, commentId);
      }
    } catch (error) {
      alert(error.message);
      dispatch(toggleVoteCommentActionCreator({
        commentId,
        userId: authUser.id,
        voteType: isDownvoted ? -1 : 0,
      }));
    }
    dispatch(hideLoading());
  };
}

export {
  ActionType,
  receiveThreadDetailActionCreator,
  clearThreadDetailActionCreator,
  toggleVoteThreadDetailActionCreator,
  addCommentActionCreator,
  asyncReceiveThreadDetail,
  asyncToggleUpvoteDetailThread,
  asyncToggleDownvoteDetailThread,
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment
};
