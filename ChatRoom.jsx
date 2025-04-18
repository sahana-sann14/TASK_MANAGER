import React, { useState } from "react";

export default function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [attachedFiles, setAttachedFiles] = useState([]);

  const sendMessage = () => {
    if (inputMessage.trim() || attachedFiles.length > 0) {
      setMessages([...messages, { text: inputMessage, files: attachedFiles }]);
      setInputMessage("");
      setAttachedFiles([]);
    }
  };

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files);
    setAttachedFiles([...attachedFiles, ...files]);
  };

  return (
    <div style={styles.chatContainer}>
      <h2>💬 Chat Room</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, index) => (
          <div key={index} style={styles.message}>
            <p>{msg.text}</p>
            {msg.files &&
              msg.files.map((file, i) => (
                <a
                  key={i}
                  href={URL.createObjectURL(file)}
                  download={file.name}
                  style={styles.fileLink}
                >
                  📎 {file.name}
                </a>
              ))}
          </div>
        ))}
      </div>

      {/* Message Input */}
      <input
        type="text"
        placeholder="Type a message..."
        value={inputMessage}
        onChange={(e) => setInputMessage(e.target.value)}
        style={styles.input}
      />

      {/* File Attachment */}
      <input type="file" multiple onChange={handleFileUpload} style={styles.fileInput} />

      {/* Send Button */}
      <button onClick={sendMessage} style={styles.sendButton}>Send</button>
    </div>
  );
}

const styles = {
  chatContainer: {
    display: "flex",
    flexDirection: "column",
    width: "80%",
    height: "80vh",
    padding: "10px",
    backgroundColor: "#f9f9f9",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    padding: "10px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    backgroundColor: "#fff",
  },
  message: {
    padding: "8px",
    margin: "5px 0",
    borderRadius: "5px",
    backgroundColor: "#e3f2fd",
  },
  fileLink: {
    display: "block",
    color: "#007bff",
    textDecoration: "none",
    marginTop: "5px",
  },
  input: {
    width: "80%",
    padding: "8px",
    marginTop: "10px",
  },
  fileInput: {
    marginTop: "10px",
  },
  sendButton: {
    padding: "8px",
    backgroundColor: "#007bff",
    color: "white",
    border: "none",
    cursor: "pointer",
    marginTop: "10px",
  },
};
