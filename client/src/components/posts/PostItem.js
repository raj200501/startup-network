import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deletePost } from '../../actions/post';

const PostItem = ({ post, auth, deletePost }) => (
  <div className="post">
    <div>
      <p>
        <strong>{post.name}</strong>{' '}
        <span className="text-muted">
          {post.date ? new Date(post.date).toLocaleDateString() : ''}
        </span>
      </p>
      <p>{post.text}</p>
    </div>
    <div className="post-actions">
      {!auth.loading && auth.user && post.user === auth.user._id && (
        <button
          type="button"
          className="btn btn-dark"
          onClick={() => deletePost(post._id)}
        >
          Delete
        </button>
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
