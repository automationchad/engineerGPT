import { keyframes } from "@emotion/react";
import Box from "@mui/material/Box/Box";

const bounceAnimation = keyframes`
  0%, 80%, 100% { transform: translateY(0); }
  40% { transform: translateY(-10px); }
`;

export const TypingDot = () => (
  <Box
    sx={{
      display: "inline-flex",
      alignItems: "center",
      mx: 1,
    }}>
    {[0, 1, 2].map((index) => (
      <Box
        key={index}
        sx={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          backgroundColor: "black",
          mx: 0.5,
          animation: `${bounceAnimation} 1.4s infinite ease-in-out`,
          animationDelay: `${index * 0.16}s`,
        }}
      />
    ))}
  </Box>
);
