import React from 'react';
import useInput from '../hooks/useInput';
import PropTypes from 'prop-types';

function ThreadInput({ addThread }) {
  const [title, onTitleChange] = useInput('');
  const [body, onBodyChange] = useInput('');
  const [category, onCategoryChange] = useInput('');

  const onSubmitHandler = (event) => {
    event.preventDefault();
    if (title.trim() && body.trim()) {
      addThread({ title, body, category });
    } else {
      alert('Judul dan isi thread tidak boleh kosong');
    }
  };

  const handleBodyChange = (e) => {
    if (e.target.value.length <= 320) {
      onBodyChange(e);
    }
  };

  return (
    <div className='thread-input'>
      <form className='thread-input__form' onSubmit={onSubmitHandler}>
        <div className='thread-input__field'>
          <label htmlFor='title' className='thread-input__label'>
            Judul Diskusi
          </label>
          <input
            id='title'
            type='text'
            className='thread-input__title'
            value={title}
            onChange={onTitleChange}
            placeholder='Judul Diskusi'
            required
          />
        </div>

        <div className='thread-input__field'>
          <label htmlFor='body' className='thread-input__label'>
            Isi Diskusi
          </label>
          <textarea
            id='body'
            className='thread-input__body'
            placeholder='Tulis sesuatu...'
            value={body}
            onChange={handleBodyChange}
            required
          />
          <p>
            <strong>{body.length}</strong>/320
          </p>
        </div>
        <div className='thread-input__field'>
          <label htmlFor='category' className='thread-input__label'>
            Kategori
          </label>
          <input
            id='category'
            type='text'
            value={category}
            onChange={onCategoryChange}
            placeholder='Kategori'
            className='thread-input__category'
          />
        </div>
        <div className='thread-input__action'>
          <button type='submit' className='thread-input__submit-btn'>
            Kirim Thread
          </button>
        </div>
      </form>
    </div>
  );
}

ThreadInput.propTypes = {
  addThread: PropTypes.func.isRequired,
};

export default ThreadInput;
