import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';
import { Badge, Button } from '../../ui';

const PostItem = ({ post, auth, deletePost }) => (
  <div className="post-card">
    <div className="post-card__meta">
      <span>
        <strong>{post.name}</strong>
      </span>
      <span>{post.date ? new Date(post.date).toLocaleDateString() : 'Today'}</span>
    </div>
    <p>{post.text}</p>
    <div className="post-actions">
      <Badge variant="neutral">Team update</Badge>
      {!auth.loading && auth.user && post.user === auth.user._id && (
        <Button variant="ghost" size="sm" onClick={() => deletePost(post._id)}>
          Delete
        </Button>
      )}
    </div>
  </div>
);

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth
});

export default connect(mapStateToProps, { deletePost })(PostItem);
