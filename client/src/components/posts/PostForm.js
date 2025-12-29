import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addPost } from '../../actions/post';
import { Button, Card, Input } from '../../ui';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <Card
      title="Share an update"
      subtitle="Let your team know what moved the needle this week."
      actions={<Button variant="secondary">Preview</Button>}
      className="post-form"
    >
      <form
        className="auth-panel__stack"
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <Input
          label="Update"
          placeholder="Celebrate a win, record a metric, or share a blocker."
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <Button type="submit">Publish update</Button>
      </form>
    </Card>
  );
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired
};

export default connect(
  null,
  { addPost }
)(PostForm);
