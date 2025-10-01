import React from 'react';

type ChatResponse = {
  answer: string;
  sources: string[];
};

type ChatConversationProps = {
  chatHistory: Array<{ q: string; a: string }>;
  chatResp: ChatResponse | null;
  chatError: string | null;
};

export default function ChatConversation({
  chatHistory,
  chatResp,
  chatError
}: ChatConversationProps) {
  return (
    <div style={{ 
      maxHeight: "500px", 
      minHeight: "300px",
      overflowY: "auto", 
      padding: "16px",
      display: "flex",
      flexDirection: "column",
      gap: "12px"
    }}>
      {chatHistory.map((item, idx) => (
        <div key={idx} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
          <div style={{
            background: "#e3f2fd",
            padding: "10px 14px",
            borderRadius: "12px 12px 0 12px",
            maxWidth: "80%",
            alignSelf: "flex-end",
            textAlign: "right",
            wordBreak: "break-word",
            fontSize: "14px"
          }}>
            {item.q}
          </div>
          <div style={{
            background: "#f5f5f5",
            padding: "10px 14px",
            borderRadius: "12px 12px 12px 0",
            maxWidth: "80%",
            alignSelf: "flex-start",
            textAlign: "left",
            wordBreak: "break-word",
            fontSize: "14px"
          }}>
            {item.a}
          </div>
        </div>
      ))}

      {chatError && (
        <div style={{ 
          color: "#d32f2f", 
          padding: "10px", 
          background: "#ffebee", 
          borderRadius: "8px",
          wordBreak: "break-word"
        }}>
         {chatError}
        </div>
      )}
    </div>
  );
}