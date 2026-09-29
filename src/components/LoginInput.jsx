import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function LoginInput({ login }) {
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className='login-input'>
      <form className='login-input__form'>
        <div className='login-input__field'>
          <label htmlFor='email' className='login-input__label'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='login-input__input'
            value={email}
            onChange={onEmailChange}
            placeholder='Email'
          />
        </div>

        <div className='login-input__field'>
          <label htmlFor='password' className='login-input__label'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='login-input__input'
            value={password}
            onChange={onPasswordChange}
            placeholder='Password'
          />
        </div>
        <div className='login-input__footer'>
          <button
            className='login-input__submit-btn'
            type='button'
            onClick={() => login({ email, password })}
          >Login
          </button>
        </div>
      </form>
    </div>
  );
}

LoginInput.propTypes = {
  login: PropTypes.func.isRequired,
};

export default LoginInput;
