import React from 'react';
import PropTypes from 'prop-types';
import ThreadCommentItem from './CommentItem';
function ThreadCommentList({
  comments,
  authUser,
  onUpvoteComment,
  onDownvoteComment,
}) {
  if (!comments.length) {
    return (
      <p>Belum ada komentar.</p>
    );
  }

  return (
    <div>
      <h3 className='thread-comments__header'>Komentar ({comments.length})</h3>
      {comments.map((comment) => (
        <ThreadCommentItem
          key={comment.id}
          comment={comment}
          authUser={authUser}
          onUpvote={onUpvoteComment}
          onDownvote={onDownvoteComment}
        />
      ))}
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentItemShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape(commentItemShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpvoteComment: PropTypes.func.isRequired,
  onDownvoteComment: PropTypes.func.isRequired,
};

export default ThreadCommentList;
