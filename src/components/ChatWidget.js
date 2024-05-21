// src/components/ChatWidget.js
import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import styles from './ChatWidget.module.css';

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const socket = io('http://localhost:5000');
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket.on('connect', () => {
      console.log('Connected to server');
    });

    socket.on('chat message', (msg) => {
      console.log('Message received: ', msg);
      setMessages((prevMessages) => [...prevMessages, { text: msg, sent: false }]);
    });

    socket.on('disconnect', () => {
      console.log('Disconnected from server');
    });

    return () => {
      socket.disconnect();
    };
  }, [socket]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSend = () => {
    if (input.trim()) {
      console.log('Sending message: ', input);
      socket.emit('chat message', input);
      setMessages((prevMessages) => [...prevMessages, { text: input, sent: true }]);
      setInput('');
    }
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Enter') {
      event.preventDefault();
      handleSend();
    }
  };

  return (
    <div className={styles.chatWidget}>
      <button onClick={() => setIsOpen(!isOpen)} className={styles.chatButton}>
        {isOpen ? 'Close Chat' : 'Open Chat'}
      </button>
      {isOpen && (
        <div className={styles.chatBox}>
          <div className={styles.messages}>
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`${styles.message} ${msg.sent ? styles.sentMessage : styles.receivedMessage}`}
              >
                {msg.text}
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className={styles.inputBox}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className={styles.input}
              placeholder="Type a message..."
            />
            <button onClick={handleSend} className={styles.sendButton}>Send</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatWidget;
