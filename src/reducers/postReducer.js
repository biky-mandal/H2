import { postConstants } from "../store/constant";

const initState = {
  loading: false,
  posts: null,
  message: null
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
    
      // For Like Craetion
    case postConstants.CREATE_OK_REQUEST:
      state = {
        ...state,
        loading: true
      }
      break;
    case postConstants.CREATE_OK_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: action.payload.message
      }
      break;
    case postConstants.CREATE_OK_FAILURE:
      state = {
        ...state,
        loading: false
      }
      break;
    
      // For comment creation

      case postConstants.CREATE_COMMENT_REQUEST:
        state = {
          ...state,
          loading: true
        }
        break;
      case postConstants.CREATE_POST_SUCCESS:
        state = {
          ...state,
          loading: false,
          message: action.payload.message
        }
        break;
      case postConstants.CREATE_COMMENT_FAILURE:
        state = {
          ...state,
          loading: false
        }

  }
  return state
};
