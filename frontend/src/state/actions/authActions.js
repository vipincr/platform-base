// Action to set the JWT token in the Redux store
export const setJWTToken = (token) => {
    return {
        type: 'SET_JWT_TOKEN',
        payload: token
    };
};

// Additional actions for authentication can be defined here
// For example, actions for logging out, updating user information, etc.
