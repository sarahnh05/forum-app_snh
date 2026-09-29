import { ActionType } from './action';

function detailThreadReducer(detailThread = null, action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREAD_DETAIL:
    return action.payload.detailThread;

  case ActionType.CLEAR_THREAD_DETAIL:
    return null;

  case ActionType.TOGGLE_VOTE_THREAD_DETAIL: {
    const { userId, voteType } = action.payload;

    const isUpvoted = detailThread.upVotesBy.includes(userId);
    const isDownvoted = detailThread.downVotesBy.includes(userId);

    const updatedUpVotes = detailThread.upVotesBy.filter((id) => id !== userId);
    const updatedDownVotes = detailThread.downVotesBy.filter((id) => id !== userId);

    if (voteType === 1 && !isUpvoted) {
      updatedUpVotes.push(userId);
    } else if (voteType === -1 && !isDownvoted) {
      updatedDownVotes.push(userId);
    }

    return {
      ...detailThread,
      upVotesBy: updatedUpVotes,
      downVotesBy: updatedDownVotes,
    };
  }

  case ActionType.ADD_COMMENT:
    return {
      ...detailThread,
      comments: [action.payload.comment, ...detailThread.comments],
    };

  case ActionType.TOGGLE_VOTE_COMMENT: {
    const { commentId, userId, voteType } = action.payload;

    return {
      ...detailThread,
      comments: detailThread.comments.map((comment) => {
        if (comment.id !== commentId) return comment;
        const isUpvoted = comment.upVotesBy.includes(userId);
        const isDownvoted = comment.downVotesBy.includes(userId);

        const updatedUpVotes = comment.upVotesBy.filter((id) => id !== userId);
        const updatedDownVotes = comment.downVotesBy.filter((id) => id !== userId);

        if (voteType === 1 && !isUpvoted) {
          updatedUpVotes.push(userId);
        } else if (voteType === -1 && !isDownvoted) {
          updatedDownVotes.push(userId);
        }

        return {
          ...comment,
          upVotesBy: updatedUpVotes,
          downVotesBy: updatedDownVotes,
        };
      }),
    };
  }

  default:
    return detailThread;
  }
}

export default detailThreadReducer;
