import React from 'react';
import { useNavigate } from 'react-router-dom';
import { postedAt } from '../utils';
import { useSelector } from 'react-redux';
import {
  FaRegThumbsUp,
  FaThumbsUp,
  FaRegThumbsDown,
  FaThumbsDown,
} from 'react-icons/fa';
import PropTypes from 'prop-types';
import parse from 'html-react-parser';

function ThreadItem({
  id,
  title,
  body,
  category,
  createdAt,
  upVotesBy,
  downVotesBy,
  upvote,
  downvote,
  user,
}) {
  const authUser = useSelector((state) => state.authUser);
  const navigate = useNavigate();

  const isUpvoted = authUser ? upVotesBy.includes(authUser.id) : false;
  const isDownvoted = authUser ? downVotesBy.includes(authUser.id) : false;

  const onUpvoteClick = (event) => {
    event.stopPropagation();
    upvote(id);
  };

  const onDownvoteClick = (event) => {
    event.stopPropagation();
    downvote(id);
  };

  const onThreadClick = () => {
    navigate(`/threads/${id}`);
  };
  return (
    <div
      onClick={onThreadClick}
      className='thread-item'
      role='button'
      tabIndex={0}
    >
      <div className='thread-item__user'>
        <img src={user?.avatar} alt={user?.name} />
        <div className='thread-item_user-info'>
          <p><strong>{user?.name}</strong></p>
          <p className='thread-item_user-date'>
            {postedAt(createdAt)}
          </p>
        </div>
      </div>
      <h3 className='thread-item__title'>{title}</h3>
      <div className='thread-item__body'>{parse(body)}</div>

      <div className='thread-item__footer'>
        <span className='thread-item__category'>#{category}</span>
        <div className='vote-buttons'>
          <button type='button' onClick={onUpvoteClick} className='vote-btn' data-testid="upvote-button">
            {isUpvoted ? <FaThumbsUp /> : <FaRegThumbsUp />}
            <p>{upVotesBy.length}</p>
          </button>
          <button type='button' onClick={onDownvoteClick} className='vote-btn' data-testid="downvote-button">
            {isDownvoted ? <FaThumbsDown /> : <FaRegThumbsDown />}
            <p>{downVotesBy.length}</p>
          </button>
        </div>
      </div>
    </div>
  );
}

const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
};

const threadItemShape = {
  id: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  upVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  downVotesBy: PropTypes.arrayOf(PropTypes.string).isRequired,
  user: PropTypes.shape(userShape).isRequired,
};

ThreadItem.propTypes = {
  ...threadItemShape,
  upvote: PropTypes.func,
  downvote: PropTypes.func,
};

ThreadItem.defaultProps = {
  upvote: null,
  downvote: null
};


export { threadItemShape };

export default ThreadItem;
