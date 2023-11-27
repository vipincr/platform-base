import { gql } from '@apollo/client';

// GraphQL Queries and Mutations
const GET_CHAT_MESSAGES = gql`
  query GetChatMessages {
    chatMessages {
      username
      message
      createdAt
    }
  }
`;

const CREATE_CHAT_MESSAGE = gql`
  mutation CreateChatMessage($username: String!, $message: String!) {
    createChatMessage(username: $username, message: $message) {
      chatMessage {
        username
        message
        createdAt
      }
    }
  }
`;

// Redux Action Types
export const FETCH_CHAT_MESSAGES = 'FETCH_CHAT_MESSAGES';
export const ADD_CHAT_MESSAGE = 'ADD_CHAT_MESSAGE';

// Redux Action Creators
export const fetchChatMessages = () => {
  return async (dispatch, getState, { client }) => {
    const response = await client.query({
      query: GET_CHAT_MESSAGES
    });
    dispatch({
      type: FETCH_CHAT_MESSAGES,
      payload: response.data.chatMessages
    });
  };
};

export const addChatMessage = (username, message) => {
  return async (dispatch, getState, { client }) => {
    const response = await client.mutate({
      mutation: CREATE_CHAT_MESSAGE,
      variables: { username, message }
    });
    dispatch({
      type: ADD_CHAT_MESSAGE,
      payload: response.data.createChatMessage.chatMessage
    });
  };
};
