import { authConstants } from '../store/constant';

const initState = {
    token: null,
    email: null,
    displayName: null,
    emailVerified: false,
    authenticate: false,
    authenticating: false,
    errorMessage: null,
    message: '',
    loading: false,
    toLoginPage: false
}

export default (state = initState, action) => {
    switch(action.type){
        // For Login Action
        case authConstants.LOGIN_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.LOGIN_SUCCESS:
            state = {
                ...state,
                token: action.payload.token,
                email: action.payload.email,
                displayName: action.payload.displayName,
                emailVerified: action.payload.emailVerified,
                authenticating: false,
                authenticate: true,
                loading: false
            }
            break;
        case authConstants.LOGIN_FAILURE:
            state = {
                ...state,
                authenticating: false,
                loading: false
            }
            break;

        // For Register action
        case authConstants.REGISTER_REQUEST:
            state = {
                ...state,
                authenticating: true,
                loading: true
            }
            break;
        case authConstants.REGISTER_SUCCESS:
            state = {
                ...state,
                email: action.payload.email,
                displayName: action.payload.displayName,
                emailVerified: action.payload.emailVerified,
                token: action.payload.token,
                authenticating: false,
                authenticate: true,
                loading: false
            }
            break;
        case authConstants.REGISTER_FAILURE:
            state = {
                ...state,
                authenticating: false,
                loading: false
            }
            break;

        // For Logout Action
        case authConstants.LOGOUT_REQUEST:
            state = {
                ...state,
                loading: true
            }
            break;
        case authConstants.LOGOUT_SUCCESS:
            state = {
                ...state,
                loading: false
            }
            break;
        case authConstants.LOGOUT_FAILURE:
            state = {
                ...state,
                loading: false
            }
    }
    return state;
}

