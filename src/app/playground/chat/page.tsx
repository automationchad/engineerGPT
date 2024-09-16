"use client";

import { FC, useState, useEffect, useRef, ReactNode } from "react";
import { Box, TextField, Button, Typography, CircularProgress } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { ArrowUp } from "lucide-react";
import { TypingDot } from "../TypingDot/TypingDot";

type MessageType = "user" | "server";

interface Message {
  text: string | ReactNode;
  type: MessageType;
}

export default function Chat() {
  const [question, setQuestion] = useState<string>("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  const scrollToBottom = (): void => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (): Promise<void> => {
    if (!question.trim()) return;

    const newMessages: Message[] = [...messages, { text: question, type: "user" }];
    setIsLoading(true);
    setMessages(newMessages);
    setQuestion("");
    setMessages([...newMessages, { text: <TypingDot />, type: "server" }]);

    const response = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ query: question }),
    });

    const reader = response.body?.getReader();
    const decoder = new TextDecoder();
    let serverAnswer = "";
    setIsStreaming(true);

    if (reader) {
      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        serverAnswer += decoder.decode(value, { stream: true });
        // Add the streaming text to the UI in real-time
        setMessages([...newMessages, { text: serverAnswer, type: "server" }]);
      }
    }

    setIsStreaming(false);
    setIsLoading(false);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        height: "90vh",
        padding: 2,
      }}>
      <Box
        sx={{
          flex: 1,
          width: "100%",
          maxWidth: "600px",
          overflowY: "auto",
          padding: 2,
          borderRadius: 2,
          marginBottom: 2,
          position: "relative",
        }}>
        {messages.map((msg, index) => {
          const isLastMessage = index === messages.length - 1;
          return (
            <Box
              key={index}
              sx={{
                display: "flex",
                justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                marginY: 1,
              }}>
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  padding: "8px 16px",
                  borderRadius: 3,
                  backgroundColor: msg.type === "user" ? "#0079FF" : "#E9E9EA",
                  color: msg.type === "user" ? "#fff" : "#161617",
                  maxWidth: "80%",
                  wordBreak: "break-word",
                }}>
                <Typography component="span" sx={{ fontFamily: "Inter, sans-serif" }}>
                  {msg.text}
                  {isLastMessage && isStreaming && msg.type === "server" && <TypingDot />}
                </Typography>
              </Box>
            </Box>
          );
        })}
        <div ref={messagesEndRef} />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          maxWidth: "635px",
          position: "relative", // Add this
        }}>
        <TextField
          variant="outlined"
          placeholder="Type your question..."
          value={question}
          sx={{
            m: 0,
            flexGrow: 1,
            "& .MuiOutlinedInput-root": {
              paddingRight: "48px", // Add space for the button
            },
          }}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSend();
            }
          }}
          disabled={isStreaming}
        />
        {question && !isLoading && !isStreaming && (
          <Button
            variant="contained"
            color="primary"
            onClick={handleSend}
            sx={{
              position: "absolute",
              right: "8px",
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "40px",
              width: "40px",
              height: "40px",
              borderRadius: "50%",
              boxShadow: "none",
            }}
            disabled={!question || isLoading || isStreaming}>
            {isLoading || isStreaming ? (
              <CircularProgress color="inherit" size={20} />
            ) : (
              <ArrowUp style={{ color: "white", height: "24px" }} />
            )}
          </Button>
        )}
      </Box>
    </Box>
  );
}
