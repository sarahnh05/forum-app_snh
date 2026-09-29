import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import {
  asyncReceiveThreadDetail,
  asyncToggleUpvoteDetailThread,
  asyncToggleDownvoteDetailThread,
  asyncAddComment,
  asyncToggleUpvoteComment,
  asyncToggleDownvoteComment,
} from '../states/detailThread/action';
import ThreadDetail from '../components/ThreadDetail';
import ThreadCommentList from '../components/CommentList';
import ThreadCommentInput from '../components/ThreadCommentInput';

function DetailPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { detailThread = null, authUser = null } = useSelector(
    (state) => state,
  );

  useEffect(() => {
    dispatch(asyncReceiveThreadDetail(id));
  }, [id, dispatch]);

  const onUpvoteThread = () => {
    dispatch(asyncToggleUpvoteDetailThread());
  };

  const onDownvoteThread = () => {
    dispatch(asyncToggleDownvoteDetailThread());
  };

  const onAddComment = (content) => {
    dispatch(asyncAddComment({ content }));
  };

  const onUpvoteComment = (commentId) => {
    dispatch(asyncToggleUpvoteComment(commentId));
  };

  const onDownvoteComment = (commentId) => {
    dispatch(asyncToggleDownvoteComment(commentId));
  };

  if (!detailThread) {
    return <div>Loading detail thread...</div>;
  }

  return (
    <section>
      <ThreadDetail
        {...detailThread}
        authUser={authUser}
        upvoteThread={onUpvoteThread}
        downvoteThread={onDownvoteThread}
      />
      <ThreadCommentInput  addComment={onAddComment} authUser={authUser} />
      <ThreadCommentList
        comments={detailThread.comments}
        authUser={authUser}
        onUpvoteComment={onUpvoteComment}
        onDownvoteComment={onDownvoteComment}
      />
    </section>
  );
}

export default DetailPage;
