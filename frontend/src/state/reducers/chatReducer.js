import { FETCH_CHAT_MESSAGES, ADD_CHAT_MESSAGE } from '../actions/chatActions';

const initialState = {
  messages: []
};

const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_CHAT_MESSAGES:
      return {
        ...state,
        messages: action.payload
      };
    case ADD_CHAT_MESSAGE:
      // Ensuring that the new message is appended to the existing messages
      return {
        ...state,
        messages: [...state.messages, action.payload]
      };
    default:
      return state;
  }
};

export default chatReducer;
