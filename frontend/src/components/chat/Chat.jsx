import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchChatMessages, addChatMessage } from '../state/actions/chatActions';

function Chat() {
  const [newMessage, setNewMessage] = useState('');
  const messages = useSelector((state) => state.chat.messages);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchChatMessages());
  }, [dispatch]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      // Replace 'username' with actual user data
      dispatch(addChatMessage('username', newMessage)); 
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className="message">
            <strong>{message.username}: </strong>{message.message}
          </div>
        ))}
      </div>
      <div className="input-container">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
    </div>
  );
}

export default Chat;
