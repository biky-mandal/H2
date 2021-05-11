import { profileConstants } from "../store/constant";

const initState = {
    // branch: null,
    // currentAddress: null,
    // email: null,
    // entryYear: null,
    // facebookLink: null,
    // fullName: null,
    // homeAddress: null,
    // instagramLink: null,
    // linkedinLink: null,
    // occupation: null,
    // passOutYear: null,
    // phoneNumber: null,
    // roomNo: null,
    // twitterLink: null,
    userDetails: null,
    loading: false,
    uploading: false,
    message: null
}

export default (state = initState, action) => {
    switch (action.type) {
        case profileConstants.GET_USER_PROFILE_REQUEST:
            state = {
                ...state,
                loading: true,
                message: "Fetching..."
            }
            break;
        case profileConstants.GET_USER_PROFILE_SUCCESS:
            state = {
                ...state,
                userDetails: action.payload.userDetails,
                loading: false,
                message: "Updated!"
            }
            break;
        case profileConstants.GET_USER_PROFILE_FAILURE:
            state={
                ...state,
                loading: false,
                message: "Failed!"
            }
            break;

        case profileConstants.UPLOAD_DATA_REQUEST:
            state={
                ...state,
                uploading: true,
                loading: true,
                message: "Uploading.."
            }
            break;
        case profileConstants.UPLOAD_DATA_SUCCESS:
            state={
                ...state,
                uploading: false,
                loading: false,
                message: "Uploaded!"
            }
            break;
        case profileConstants.UPLOAD_DATA_FAILURE:
            state={
                ...state,
                uploading: false,
                loading: false,
                message: "Failed!"
            }
            break;
    }
    return state;
}