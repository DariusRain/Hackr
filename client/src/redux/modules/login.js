import axios from "axios";

export const OAUTH_UPDATE = "HACKR/LOGIN/OAUTH_UPDATE";

const INITIAL_STATE = {
    token:"",
    errors: {},
    loading: false
}

export default loginReducer = (state = INITIAL_STATE, action) => {
    switch(action.type)
    {
        case OAUTH_UPDATE:
            return {
                ...state,
                [action.payload.field]: action.payload.value
            }

        default:
            return state;
    }
}


export const sendLogin = (field, password) => async (dispatch) => {
    try {

    } catch () {
        
    }
}