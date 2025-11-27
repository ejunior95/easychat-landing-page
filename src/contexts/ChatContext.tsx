import React, { createContext, useContext, useState } from 'react';

interface ChatContextType {
  isPlaygroundVisible: boolean;
  setPlaygroundVisible: (visible: boolean) => void;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export const ChatProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isPlaygroundVisible, setPlaygroundVisible] = useState(false);

  return (
    <ChatContext.Provider value={{ isPlaygroundVisible, setPlaygroundVisible }}>
      {children}
    </ChatContext.Provider>
  );
};

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error('useChatContext must be used within a ChatProvider');
  }
  return context;
};