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
        message: "Fetching..."
      };
      break;
    case postConstants.GET_POST_SUCCESS:
      state = {
          ...state,
          loading: false,
          posts: action.payload.posts,
          message: "Fetching Done..."
      }
      break;
    case postConstants.GET_POST_FAILURE:
      state = {
          ...state,
          loading: false,
          message: "Fetching Failed!"
      }
      break;
    
      // For Like Craetion
    case postConstants.CREATE_OK_REQUEST:
      state = {
        ...state,
        loading: true,
        message: "Wait a Second!"
      }
      break;
    case postConstants.CREATE_OK_SUCCESS:
      state = {
        ...state,
        loading: false,
        message: "Done!"
      }
      break;
    case postConstants.CREATE_OK_FAILURE:
      state = {
        ...state,
        loading: false,
        message: "Failed!"
      }
      break;
    
      // For comment creation

      case postConstants.CREATE_COMMENT_REQUEST:
        state = {
          ...state,
          loading: true,
          message:"Posting Your Comment..."
        }
        break;
      case postConstants.CREATE_COMMENT_SUCCESS:
        state = {
          ...state,
          loading: false,
          message: "Comment Posted!"
        }
        break;
      case postConstants.CREATE_COMMENT_FAILURE:
        state = {
          ...state,
          loading: false,
          message: "Failed!"
        }
        break;

      // Creating Posts
      case postConstants.CREATE_POST_REQUEST:
        state = {
          ...state,
          loading: true,
          message:"Posting Your Comment..."
        }
        break;
      case postConstants.CREATE_POST_SUCCESS:
        state = {
          ...state,
          loading: false,
          message: "Posted!"
        }
        break;
      case postConstants.CREATE_POST_FAILURE:
        state = {
          ...state,
          loading: false,
          message: "Failed!"
        }

  }
  return state
};
