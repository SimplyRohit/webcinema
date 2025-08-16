"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import nookies from "nookies";
import { io, Socket } from "socket.io-client";
import { Users2, Check, UserPlus } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const roboto = Roboto_Mono({ subsets: ["latin"] });

interface Message {
  type: string;
  username: string;
  message?: string;
  timestamp: string;
  time?: number;
}

export default function WatchParty() {
  const params = useParams();
  const roomId = params.id as string;
  const [username, setUsername] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const socketRef = useRef<Socket | null>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  const searchParams = useSearchParams();
  const wpurl = searchParams.get("wpurl");
  const [showParticipants, setShowParticipants] = useState(true);
  const [tempName, setTempName] = useState("");

  // Auto scroll
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  // Get/set username
  useEffect(() => {
    const cookies = nookies.get();
    const storedUsername = cookies.username || null;
    if (!storedUsername) {
      const generatedUsername = "Guest" + Math.floor(Math.random() * 10000);
      nookies.set(null, "username", generatedUsername, {
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
      });
      setUsername(generatedUsername);
      setTempName(generatedUsername);
    } else {
      setUsername(storedUsername);
      setTempName(storedUsername);
    }
  }, []);

  const updateUsername = () => {
    setUsername(tempName);
    nookies.set(null, "username", tempName, {
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });
  };

  // Setup socket
  useEffect(() => {
    if (!username) return;
    const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
      query: { id: roomId, username },
    });
    socketRef.current = socket;
    socket.on("message", (msg: Message) => {
      if (msg.type === "participants") return;
      if (["chat", "system"].includes(msg.type)) {
        setMessages((prev) => [...prev, msg]);
      }
    });
    socket.on("participants", (data: any) => {
      setParticipants(data.list);
    });
    return () => {
      socket.disconnect();
    };
  }, [roomId, username]);

  const sendMessage = () => {
    if (socketRef.current && newMessage.trim() !== "") {
      const payload = {
        type: "chat",
        username,
        message: newMessage,
      };
      socketRef.current.emit("message", payload);
      setNewMessage("");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col bg-black md:flex-row md:overflow-hidden">
      {/* Video Section */}
      <div className="relative h-[60vh] w-full md:h-full md:w-[calc(100%-350px)]">
        <iframe
          src={wpurl as string}
          title="Embedded Content"
          className="h-full w-full"
          style={{ border: "none" }}
          allow="autoplay; encrypted-media"
          allowFullScreen
        />
      </div>

      {/* Sidebar */}
      <div className="flex h-[50vh] w-full flex-col overflow-hidden bg-[#1B1B1B] p-2 md:h-full md:w-[350px] md:p-4">
        {/* Username Input and Toggle Button */}
        <div className="mb-2 flex w-full shrink-0 items-center justify-between text-white md:mb-4">
          <div className="flex flex-1 items-center gap-1.5 md:gap-2">
            <div className="relative max-w-[150px] flex-1 md:max-w-[200px]">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="w-full rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-2 py-1.5 text-xs text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50 md:px-3 md:py-2.5 md:text-sm"
                placeholder="Enter your name"
              />
              {tempName !== username && (
                <button
                  onClick={updateUsername}
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 rounded-md bg-[#ffc31e] p-0.5 transition-all md:right-2 md:p-1"
                >
                  <Check className="h-3 w-3 text-black md:h-4 md:w-4" />
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className={cn(
              "ml-2 flex items-center gap-1.5 rounded-lg p-1.5 transition-all md:ml-4 md:gap-2 md:p-2",
              showParticipants
                ? "bg-[#ffc31e]/20 text-[#ffc31e] hover:bg-[#ffc31e]/30"
                : "text-gray-400 hover:bg-gray-800/50 hover:text-[#ffc31e]"
            )}
          >
            <Users2 className="h-4 w-4 md:h-5 md:w-5" />
            <span className="text-xs font-medium md:text-sm">
              {participants.length}
            </span>
          </button>
        </div>

        {/* Participants */}
        {showParticipants && (
          <div className="mb-2 shrink-0 rounded-lg border border-[#ffc31e]/10 bg-gray-800/30 p-2 backdrop-blur-sm md:mb-4 md:p-3">
            <div className="mb-2 flex items-center gap-1.5 md:mb-3 md:gap-2">
              <UserPlus className="h-3.5 w-3.5 text-[#ffc31e] md:h-4 md:w-4" />
              <h2
                className={cn(
                  roboto.className,
                  "text-xs font-medium text-white md:text-sm"
                )}
              >
                Participants
              </h2>
              <span className="rounded-full bg-[#ffc31e]/10 px-1.5 py-0.5 text-[10px] text-[#ffc31e]/70 md:px-2 md:text-xs">
                {participants.length}
              </span>
            </div>
            <div className="scrollbar-hide max-h-[100px] space-y-1 overflow-y-auto pr-1 md:max-h-[150px] md:space-y-2">
              {participants.map((participant) => (
                <div
                  key={participant}
                  className={cn(
                    "flex items-center gap-1.5 rounded-md px-1.5 py-1 text-xs transition-colors md:gap-2 md:px-2 md:py-1.5 md:text-sm",
                    participant === username
                      ? "bg-[#ffc31e]/20 text-[#ffc31e]"
                      : "text-gray-300 hover:bg-[#ffc31e]/10"
                  )}
                >
                  <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffc31e] text-[10px] font-medium text-black shadow-sm md:h-6 md:w-6 md:text-xs">
                    {participant.charAt(0).toUpperCase()}
                  </div>
                  <span className="truncate font-medium">{participant}</span>
                  {participant === username && (
                    <span className="ml-auto shrink-0 text-[10px] text-[#ffc31e] md:text-xs">
                      (You)
                    </span>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Chat Messages */}
        <div
          ref={chatContainerRef}
          className="flex-1 space-y-2 overflow-y-auto pr-1 [-ms-overflow-style:none] [scrollbar-width:none] md:space-y-3 [&::-webkit-scrollbar]:hidden"
        >
          <AnimatePresence initial={false}>
            {messages.map((msg, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className={cn(
                  "flex items-start gap-1.5 md:gap-2",
                  msg.type === "system"
                    ? "justify-center font-sans text-xs text-white opacity-50 md:text-sm"
                    : ""
                )}
              >
                {msg.type !== "system" && (
                  <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#ffc31e] text-xs font-medium text-black shadow-sm md:h-8 md:w-8 md:text-sm">
                    {msg.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  className={cn(
                    "min-w-0 flex-1",
                    msg.type !== "system" &&
                      "rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-2 py-1.5 backdrop-blur-sm md:px-3 md:py-2"
                  )}
                >
                  {msg.type !== "system" && (
                    <div className="mb-0.5 flex items-center gap-1.5 md:mb-1 md:gap-2">
                      <span className="truncate text-xs font-medium text-white md:text-sm">
                        {msg.username}
                      </span>
                      <span className="shrink-0 text-[10px] text-[#ffc31e]/70 md:text-xs">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "break-words text-xs md:text-sm",
                      msg.type === "system"
                        ? "text-[#ffc31e]/70"
                        : "text-gray-200"
                    )}
                  >
                    {msg.message}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Message Input */}
        <div className="mb-14 mt-2 flex shrink-0 gap-1.5 md:mb-0 md:gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex w-full rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-2 py-1.5 text-xs text-white placeholder-gray-400 backdrop-blur-sm transition-all focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50 md:px-3 md:py-2.5 md:text-sm"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="flex shrink-0 rounded-lg bg-[#ffc31e] px-2.5 py-1.5 text-xs font-medium text-black shadow-sm transition-all hover:opacity-90 md:px-4 md:py-2.5 md:text-sm"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
