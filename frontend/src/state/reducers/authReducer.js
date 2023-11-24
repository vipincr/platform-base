const initialState = {
    jwtToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_JWT_TOKEN':
            return {
                ...state,
                jwtToken: action.payload
            };
        // Additional actions can be handled here
        default:
            return state;
    }
};

export default authReducer;
