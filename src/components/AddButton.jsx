import React from 'react';
import { Link } from 'react-router-dom';
import { FiPlus } from 'react-icons/fi';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';

function AddButton() {
  const { authUser = null } = useSelector((states) => states);

  if (!authUser) {
    return null;
  }

  return (
    <Link to='/new' className='add-new-thread__action action'>
      <FiPlus />
    </Link>
  );
}

AddButton.propTypes = {
  authUser: PropTypes.string.isRequired,
};

export default AddButton;
