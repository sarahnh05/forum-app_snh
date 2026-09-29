import React from 'react';
import PropTypes from 'prop-types';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import { postedAt } from '../utils';
import parse from 'html-react-parser';

function ThreadCommentItem({ comment, authUser, onUpvote, onDownvote }) {
  const { id, content, createdAt, owner, upVotesBy, downVotesBy } = comment;
  const isUpvoted = authUser ? upVotesBy.includes(authUser) : false;
  const isDownvoted = authUser ? downVotesBy.includes(authUser) : false;

  return (
    <div className='comment-item'>
      <div className='comment-item__user'>
        <img
          src={owner.avatar}
          alt={owner.name}
        />
        <div className='comment-item__user-info'>
          <p><strong>{owner.name}</strong></p>
          <p className='thread-item__user-date'>{postedAt(createdAt)}</p>
        </div>
      </div>

      <div className='comment-item__content'>{parse(content)}</div>

      <footer className='comment-item__footer'>
        <div className='vote-buttons'>
          <button
            type='button'
            className='vote-btn'
            onClick={() => onUpvote(id)}
          >
            {isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{upVotesBy.length}</span>
          </button>

          <button
            type='button'
            className='vote-btn'
            onClick={() => onDownvote(id)}
          >
            {isDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <span>{downVotesBy.length}</span>
          </button>
        </div>
      </footer>
    </div>
  );
}

const ownerShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const commentShape = {
  id: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
};

ThreadCommentItem.propTypes = {
  comment: PropTypes.shape(commentShape).isRequired,
  authUser: PropTypes.string.isRequired,
  onUpvote: PropTypes.func.isRequired,
  onDownvote: PropTypes.func.isRequired,
};

export default ThreadCommentItem;
