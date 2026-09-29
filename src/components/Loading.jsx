import React from 'react';
import { useSelector } from 'react-redux';

function Loading() {
  const isLoading = useSelector((state) => state.loading);

  if (!isLoading) return null;

  return <div className="loading" />;
}

export default Loading;