import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function RegisterInput({ register }) {
  const [name, onNameChange] = useInput('');
  const [email, onEmailChange] = useInput('');
  const [password, onPasswordChange] = useInput('');

  return (
    <div className='register-input'>
      <form className='register-input__form'>
        <div className='register-input__field'>
          <label htmlFor='name' className='register-input__label'>
            Nama Lengkap
          </label>
          <input
            id='name'
            type='text'
            className='register-input__input'
            value={name}
            onChange={onNameChange}
            placeholder='Name'
          />
        </div>

        <div className='register-input__field'>
          <label htmlFor='email' className='register-input__label'>
            Email
          </label>
          <input
            id='email'
            type='email'
            className='register-input__input'
            value={email}
            onChange={onEmailChange}
            placeholder='Email'
          />
        </div>

        <div className='register-input__field'>
          <label htmlFor='password' className='register-input__label'>
            Password
          </label>
          <input
            id='password'
            type='password'
            className='register-input__input'
            value={password}
            onChange={onPasswordChange}
            placeholder='Password'
          />
        </div>
        <div className='register-input__footer'>
          <button
            className='register-input__submit-btn'
            type='button'
            onClick={() => register({ name, email, password })}
          >Register
          </button>
        </div>
      </form>
    </div>
  );
}

RegisterInput.propTypes = {
  register: PropTypes.func.isRequired,
};

export default RegisterInput;
