import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { io } from 'socket.io-client';  // Assuming Socket.IO client library is used

const socket = io('ws://localhost:6789');  // Adjust the URL to match the backend WebSocket server

function OpenAIPlayground() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const dispatch = useDispatch();

  // Function to handle sending the prompt via WebSocket
  const handleSendPrompt = () => {
    if (prompt.trim()) {
      socket.emit('send_prompt', { prompt });
    }
  };

  // WebSocket listeners for receiving responses
  useEffect(() => {
    socket.on('ai_response', (data) => {
      setResponse(data.response);
    });

    // Cleanup on component unmount
    return () => {
      socket.off('ai_response');
    };
  }, []);

  return (
    <div className='container mx-auto p-4'>
      <textarea
        className='textarea textarea-bordered w-full'
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder='Enter your prompt here'
      ></textarea>
      <button
        className='btn btn-primary mt-2'
        onClick={handleSendPrompt}
      >
        Send Prompt
      </button>
      <div className='mt-4 p-4 bg-base-200 rounded-box'>
        {response}
      </div>
    </div>
  );
}

export default OpenAIPlayground;
