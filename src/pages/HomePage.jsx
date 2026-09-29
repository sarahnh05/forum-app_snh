import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { asyncPopulateUsersAndThreads } from '../states/shared/action';
import {
  asyncToggleDownvoteThread,
  asyncToggleUpvoteThread,
} from '../states/threads/action';
import ThreadList from '../components/ThreadLists';
import AddButton from '../components/AddButton';

function HomePage() {
  const {
    threads = [],
    users = [],
    authUser,
  } = useSelector((states) => states);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(asyncPopulateUsersAndThreads());
  }, [dispatch]);

  const onUpvote = (id) => {
    dispatch(asyncToggleUpvoteThread(id));
  };

  const onDownvote = (id) => {
    dispatch(asyncToggleDownvoteThread(id));
  };

  const threadList = threads.map((thread) => ({
    ...thread,
    user: users.find((user) => user.id === thread.ownerId),
    authUser: authUser?.id || null,
  }));

  return (
    <section>
      <h1>Diskusi tersedia</h1>
      <AddButton />
      <ThreadList
        threads={threadList}
        upvote={onUpvote}
        downvote={onDownvote}
      />
    </section>
  );
}

export default HomePage;
