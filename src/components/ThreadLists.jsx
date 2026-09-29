import React from 'react';
import ThreadItem, { threadItemShape } from './ThreadItem';
import PropTypes from 'prop-types';

function ThreadList({ threads, upvote, downvote }) {
  return (
    <div className='thread-list'>
      {threads.map((thread) => (
        <ThreadItem key={thread.id} {...thread} upvote={upvote} downvote={downvote} />
      ))}
    </div>
  );
}

ThreadList.propTypes = {
  threads: PropTypes.arrayOf(PropTypes.shape(threadItemShape)).isRequired,
  upvote: PropTypes.func.isRequired,
  downvote: PropTypes.func.isRequired,
};


export default ThreadList;
