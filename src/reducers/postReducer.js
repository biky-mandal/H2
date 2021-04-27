import { postConstants } from "../store/constant";

const initState = {
  loading: false,
  posts: null,
};

export default (state = initState, action) => {
  switch (action.type) {
    case postConstants.GET_POST_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case postConstants.GET_POST_SUCCESS:
      state = {
          ...state,
          loading: false,
          posts: action.payload.posts
      }
      break;
    case postConstants.GET_POST_FAILURE:
        state = {
            ...state,
            loading: false
        }
        break;
  }
  return state
};
