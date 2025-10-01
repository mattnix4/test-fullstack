import React, { useState } from 'react';
import ChatConversation from './ChatConversation';

type ChatResponse = {
    answer: string;
    sources: string[];
  };
  
  type ChatWidgetProps = {
    onSendMessage: (msg: string) => Promise<void>;
    chatHistory: Array<{ q: string; a: string }>;
    chatResp: ChatResponse | null;
    chatError: string | null;
    chatLoading: boolean;
  };
  
  export default function ChatWidget({
    onSendMessage,
    chatHistory,
    chatResp,
    chatError,
    chatLoading,
  }: ChatWidgetProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [message, setMessage] = useState("");
  
    const handleSend = async () => {
      if (!message.trim()) return;
      await onSendMessage(message);
      setMessage("");
    };
  
    const handleKeyPress = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" && !e.shiftKey) {
        e.preventDefault();
        handleSend();
      }
    };
  

  return (
    <>
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          style={{
            position: "fixed",
            bottom: "24px",
            right: "24px",
            width: "60px",
            height: "60px",
            borderRadius: "50%",
            background: "#667eea",
            color: "white",
            border: "none",
            fontSize: "24px",
            cursor: "pointer",
            boxShadow: "0 4px 12px rgba(0,0,0,0.2)",
            zIndex: 1000
          }}
        >
          Chat
        </button>
      )}

      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "24px",
            width: "360px",
            maxHeight: "600px",
            background: "white",
            borderRadius: "16px",
            boxShadow: "0 8px 32px rgba(0,0,0,0.2)",
            display: "flex",
            flexDirection: "column",
            zIndex: 1000
          }}
        >
          <div style={{
            padding: "16px",
            background: "#667eea",
            color: "white",
            borderRadius: "16px 16px 0 0",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center"
          }}>
            <strong>Assistant IA</strong>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "rgba(255,255,255,0.3)",
                border: "none",
                color: "white",
                width: "24px",
                height: "24px",
                borderRadius: "50%",
                cursor: "pointer"
              }}
            >
              Close
            </button>
          </div>

          <ChatConversation
            chatHistory={chatHistory}
            chatResp={chatResp}
            chatError={chatError}
          />

          <div style={{ padding: "12px", borderTop: "1px solid #eee" }}>
            <div style={{ display: "flex", gap: "8px" }}>
              <textarea
                placeholder="Posez une question..."
                value={message}
                onChange={e => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                rows={2}
                style={{
                  flex: 1,
                  padding: "8px 12px",
                  border: "1px solid #ddd",
                  borderRadius: "8px",
                  fontSize: "14px",
                  resize: "none"
                }}
              />
              <button
                onClick={handleSend}
                disabled={chatLoading || !message.trim()}
                style={{
                  padding: "8px 16px",
                  background: chatLoading ? "#ccc" : "#667eea",
                  color: "white",
                  border: "none",
                  borderRadius: "8px",
                  cursor: chatLoading ? "not-allowed" : "pointer",
                  fontWeight: "600"
                }}
              >
                {chatLoading ? "..." : "Envoyer"}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}