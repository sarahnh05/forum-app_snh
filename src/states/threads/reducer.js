import { ActionType } from './action';

function threadsReducer(threads = [], action = {}) {
  switch (action.type) {
  case ActionType.RECEIVE_THREADS:
    return action.payload.threads;
  case ActionType.ADD_THREAD:
    return [action.payload.thread, ...threads];
  case ActionType.TOGGLE_VOTE_THREAD: {
    const { threadId, userId, voteType } = action.payload;

    return threads.map((thread) => {
      if (thread.id !== threadId) return thread;

      const isUpvoted = thread.upVotesBy.includes(userId);
      const isDownvoted = thread.downVotesBy.includes(userId);

      const updatedUpVotes = thread.upVotesBy.filter((id) => id !== userId);
      const updatedDownVotes = thread.downVotesBy.filter((id) => id !== userId);

      if (voteType === 1 && !isUpvoted) {
        updatedUpVotes.push(userId);
      } else if (voteType === -1 && !isDownvoted) {
        updatedDownVotes.push(userId);
      }

      return {
        ...thread,
        upVotesBy: updatedUpVotes,
        downVotesBy: updatedDownVotes,
      };
    });
  }
  default:
    return threads;
  }
}

export default threadsReducer;
