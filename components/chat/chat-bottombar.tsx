import {
  useRef,
  useState,
} from "https://esm.sh/v128/preact@10.19.6/hooks/src/index.js";
import { FileImage, Paperclip } from "npm:lucide-react";
interface Message {
  id: number;
  message: string;
}

interface ChatBottombarProps {
  sendMessage: (newMessage: Message) => void;
  isMobile: boolean;
}

export const BottombarIcons = [
  { icon: FileImage },
  { icon: Paperclip },
];

export default function ChatBottombar({
  sendMessage,
  isMobile,
}: ChatBottombarProps) {
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLTextAreaElement>(null);
}
