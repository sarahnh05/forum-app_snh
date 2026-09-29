import React from 'react';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import { postedAt } from '../utils';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function ThreadDetail({
  id,
  title,
  body,
  category,
  createdAt,
  owner,
  upVotesBy,
  downVotesBy,
  authUser,
  upvoteThread,
  downvoteThread,
}) {
  const isUpvoted = authUser ? upVotesBy.includes(authUser) : false;
  const isDownvoted = authUser ? downVotesBy.includes(authUser) : false;

  const onUpvoteClick = (event) => {
    event.stopPropagation();
    upvoteThread(id);
  };

  const onDownvoteClick = (event) => {
    event.stopPropagation();
    downvoteThread(id);
  };

  return (
    <div className='thread-detail'>
      <div className='thread-detail__user'>
        <img
          src={owner.avatar}
          alt={owner.name}
        />
        <div className='thread-detail__user-info'>
          <p><strong>{owner?.name}</strong></p>
          <p className='thread-detail_user-date'>{postedAt(createdAt)}</p>
        </div>
      </div>
      <h1 className='thread-detail__title'>{title}</h1>
      <div className='thread-detail__body'>{parse(body)}</div>
      <div className='thread-detail__footer'>
        <span className='thread-detail__category'>#{category}</span>
        <div className='vote-buttons'>
          <button
            type='button'
            onClick={onUpvoteClick}
            className='vote-btn'
            data-testid='upvote-button'
          >
            {isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <span>{upVotesBy.length}</span>
          </button>
          <button
            type='button'
            onClick={onDownvoteClick}
            className='vote-btn'
            data-testid='downvote-button'
          >
            {isDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <span>{downVotesBy.length}</span>
          </button>
        </div>
      </div>
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

ThreadDetail.propTypes = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  owner: PropTypes.shape(ownerShape).isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape(commentShape)).isRequired,
  authUser: PropTypes.string.isRequired,
  upvoteThread: PropTypes.func.isRequired,
  downvoteThread: PropTypes.func.isRequired,
  addComment: PropTypes.func.isRequired,
  upvote: PropTypes.func,
  downvote: PropTypes.func,
};

ThreadDetail.defaultProps = {
  upvote: null,
  downvote: null
};


export default ThreadDetail;
