import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { asyncRegisterUser } from '../states/users/action';
import RegisterInput from '../components/RegisterInput';

function RegisterPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onRegister = ({ name, email, password }) => {
    dispatch(asyncRegisterUser({ name, email, password }));
    navigate('/');
  };

  return (
    <section>
      <h2> Register untuk menggunakan aplikasi.</h2>
      <RegisterInput register={onRegister} />
      <p>Sudah punya akun?
        <Link to='/login'> Login disini!</Link>
      </p>
    </section>
  );
}

export default RegisterPage;
