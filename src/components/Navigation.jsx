import React from 'react';
import { Link } from 'react-router-dom';
import { FiLogOut } from 'react-icons/fi';
import PropTypes from 'prop-types';

function Navigation({ authUser, logout }) {
  if (authUser === null) {
    return (
      <nav className='navigation'>
        <ul>
          <li>
            <Link to='/login'>Login</Link>
          </li>
        </ul>
      </nav>
    );
  }

  return (
    <nav className='navigation'>
      <ul>
        <li>
          <button className='button-logout' onClick={logout}>
            <FiLogOut />
            {authUser?.name}
          </button>
        </li>
      </ul>
    </nav>
  );
}

const authUserShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string,
  avatar: PropTypes.string.isRequired,
};

Navigation.propTypes = {
  authUser: PropTypes.shape(authUserShape).isRequired,
  logout: PropTypes.func.isRequired,
};

export default Navigation;
