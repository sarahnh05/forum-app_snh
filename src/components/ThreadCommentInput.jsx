import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function ThreadCommentInput({ addComment, authUser }) {
  const [text, setText] = useState('');

  const onTextChange = (event) => {
    setText(event.target.value);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    if (text.trim()) {
      addComment(text);
      setText('');
    }
  };

  if (!authUser) {
    return (
      <p>
        Silahkan <Link to="/login">login</Link> untuk mengirim komentar.
      </p>
    );
  }

  return (
    <section>
      <h3>Tambah Komentar</h3>
      <form onSubmit={onSubmit} className='thread-detail__input-form'>
        <textarea
          className='thread-detail__textarea'
          rows='4'
          value={text}
          onChange={onTextChange}
          placeholder='Tambah komentar...'
        />
        <div className='thread-detail__input-footer'>
          <button type='submit' className='thread-detail__submit-btn'>
            Kirim Komentar
          </button>
        </div>
      </form>
    </section>
  );
}

ThreadCommentInput.propTypes = {
  addComment: PropTypes.func.isRequired,
  authUser: PropTypes.string.isRequired,
};

export default ThreadCommentInput;
