import React from 'react';
import { useDispatch } from 'react-redux';
import { asyncSetAuthUser } from '../states/authUser/action';
import LoginInput from '../components/LoginInput';
import { Link, useNavigate } from 'react-router-dom';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogin = ({ email, password }) => {
    dispatch(asyncSetAuthUser({ email, password }))
      .then(() => {
        navigate('/');
      });
  };

  return (
    <section>
      <h2> Login untuk menggunakan aplikasi.</h2>
      <LoginInput login={onLogin} />
      <p>Belum punya akun?
        <Link to='/register'> Daftar disini!</Link>
      </p>
    </section>
  );
}

export default LoginPage;
