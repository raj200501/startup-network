import {
  GET_POSTS,
  POST_ERROR,
  ADD_POST,
  DELETE_POST,
  ADD_COMMENT,
  REMOVE_COMMENT
} from '../actions/types';

const initialState = {
  posts: [],
  post: null,
  loading: true,
  error: {}
};

export default function (state = initialState, action) {
  const { type, payload } = action;

  switch (type) {
    case GET_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      };
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      };
    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      };
    case POST_ERROR:
      return {
        ...state,
        error: payload,
        loading: false
      };
    case ADD_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? { ...post, comments: payload.comments }
            : post
        ),
        loading: false
      };
    case REMOVE_COMMENT:
      return {
        ...state,
        posts: state.posts.map(post =>
          post._id === payload.postId
            ? {
                ...post,
                comments: post.comments.filter(
                  comment => comment._id !== payload.commentId
                )
              }
            : post
        ),
        loading: false
      };
    default:
      return state;
  }
}
