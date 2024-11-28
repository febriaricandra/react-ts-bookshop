import { createContext, ReactNode, useContext, useState } from 'react';
import FlashMessage from '../components/flashs/FlashMessage';

// Tipe untuk FlashMessageContext
type FlashMessageType = 'success' | 'error' | 'warning' | 'info';

const FlashMessageContext = createContext<{
  message: string | null;
  setMessage: (message: string | null) => void;
  showMessage: (message: string, type: FlashMessageType, duration?: number) => void;
} | undefined>(undefined);

export const FlashMessageProvider = ({ children }: { children: ReactNode }) => {
  const [message, setMessage] = useState<string | null>(null);
  const [type, setType] = useState<FlashMessageType | null>(null);

  const showMessage = (message: string, type: FlashMessageType, duration = 3000): void => {
    setMessage(message);
    setType(type);

    setTimeout(() => {
      setMessage(null);
      setType(null);
    }, duration);
  };

  return (
    <FlashMessageContext.Provider value={{ message, setMessage, showMessage }}>
      {children}
      {message && (
        <div className="fixed bottom-4 right-4 flex flex-col space-y-4 z-50">
          <FlashMessage message={message} type={type!} onClose={() => setMessage(null)} />
        </div>
      )}
    </FlashMessageContext.Provider>
  );
};

export const useFlashMessage = () => {
  const context = useContext(FlashMessageContext);
  if (!context) {
    throw new Error('useFlashMessage must be used within a FlashMessageProvider');
  }
  return context;
};
