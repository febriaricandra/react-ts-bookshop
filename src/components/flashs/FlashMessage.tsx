import {useState, useEffect} from 'react'
import { X } from "lucide-react";

interface FlashMessageProps {
    message: string;
    type?: 'success' | 'error' | 'warning' | 'info';
    duration?: number;
    onClose?: () => void;
}

const FlashMessage: React.FC<FlashMessageProps> = ({ message, type = 'success', duration = 5000, onClose }) => {
    const typeClasses: Record<string, string> = {
        success: 'bg-green-500 text-white',
        error: 'bg-red-500 text-white',
        warning: 'bg-yellow-500 text-white',
        info: 'bg-blue-500 text-white',
    }
    const [visible, setVisible] = useState(true);

    useEffect(() => {
        if (duration) {
            const timer = setTimeout(() => {
                setVisible(false);
                if (onClose) {
                    onClose();
                }
            }, duration);

            return () => clearTimeout(timer);
        }
    }, [duration, onClose]);

    if (!visible) {
        return null;
    }

  return (
    <div className={`w-full max-w-sm p-4 rounded-lg shadow-lg transition-transform duration-300 transform ${typeClasses[type]}`}>
        <span>{message}</span>
        <button onClick={() => {
            setVisible(false);
            if (onClose) {
                onClose();
            }
        }} className="ml-4">
            <X size={16} />
        </button>
    </div>
  )
}

export default FlashMessage;