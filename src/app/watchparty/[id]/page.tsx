"use client";
import React, { useEffect, useRef, useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";
import nookies from "nookies";
import { io, Socket } from "socket.io-client";
import { Users2, Check, UserPlus } from "lucide-react";
import { motion, AnimatePresence, color } from "framer-motion";

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
    <div className="flex flex-col md:flex-row h-screen w-screen bg-black md:overflow-hidden">
      {/* Video Section */}
      <div className="relative h-[60vh] md:h-full w-full md:w-[calc(100%-350px)]">
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
      <div className="flex h-[50vh] md:h-full w-full md:w-[350px] flex-col bg-[#1B1B1B] p-2 md:p-4 overflow-hidden">
        {/* Username Input and Toggle Button */}
        <div className="shrink-0 mb-2 md:mb-4 flex w-full items-center justify-between text-white">
          <div className="flex items-center gap-1.5 md:gap-2 flex-1">
            <div className="relative flex-1 max-w-[150px] md:max-w-[200px]">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="bg-gray-800/50 backdrop-blur-sm px-2 md:px-3 py-1.5 md:py-2.5 rounded-lg text-white text-xs md:text-sm w-full focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50 transition-all placeholder-gray-400 border border-[#ffc31e]/10"
                placeholder="Enter your name"
              />
              {tempName !== username && (
                <button
                  onClick={updateUsername}
                  className="absolute right-1.5 md:right-2 top-1/2 -translate-y-1/2 bg-[#ffc31e] p-0.5 md:p-1 rounded-md transition-all"
                >
                  <Check className="w-3 h-3 md:w-4 md:h-4 text-black" />
                </button>
              )}
            </div>
          </div>
          <button
            onClick={() => setShowParticipants(!showParticipants)}
            className={cn(
              "ml-2 md:ml-4 p-1.5 md:p-2 rounded-lg transition-all flex items-center gap-1.5 md:gap-2",
              showParticipants
                ? "bg-[#ffc31e]/20 text-[#ffc31e] hover:bg-[#ffc31e]/30"
                : "hover:bg-gray-800/50 text-gray-400 hover:text-[#ffc31e]"
            )}
          >
            <Users2 className="w-4 h-4 md:w-5 md:h-5" />
            <span className="text-xs md:text-sm font-medium">
              {participants.length}
            </span>
          </button>
        </div>

        {/* Participants */}
        {showParticipants && (
          <div className="shrink-0 mb-2 md:mb-4 bg-gray-800/30 backdrop-blur-sm rounded-lg p-2 md:p-3 border border-[#ffc31e]/10">
            <div className="flex items-center gap-1.5 md:gap-2 mb-2 md:mb-3">
              <UserPlus className="w-3.5 h-3.5 md:w-4 md:h-4 text-[#ffc31e]" />
              <h2
                className={cn(
                  roboto.className,
                  "text-xs md:text-sm font-medium text-white"
                )}
              >
                Participants
              </h2>
              <span className="text-[10px] md:text-xs text-[#ffc31e]/70 bg-[#ffc31e]/10 px-1.5 md:px-2 py-0.5 rounded-full">
                {participants.length}
              </span>
            </div>
            <div className="space-y-1 md:space-y-2 max-h-[100px] md:max-h-[150px] overflow-y-auto pr-1 scrollbar-hide">
              {participants.map((participant) => (
                <div
                  key={participant}
                  className={cn(
                    "flex items-center gap-1.5 md:gap-2 text-xs md:text-sm px-1.5 md:px-2 py-1 md:py-1.5 rounded-md transition-colors",
                    participant === username
                      ? "bg-[#ffc31e]/20 text-[#ffc31e]"
                      : "text-gray-300 hover:bg-[#ffc31e]/10"
                  )}
                >
                  <div className="w-5 h-5 md:w-6 md:h-6 rounded-full bg-[#ffc31e] text-black flex items-center justify-center font-medium text-[10px] md:text-xs shadow-sm">
                    {participant.charAt(0).toUpperCase()}
                  </div>
                  <span className="font-medium truncate">{participant}</span>
                  {participant === username && (
                    <span className="text-[10px] md:text-xs text-[#ffc31e] ml-auto shrink-0">
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
          className="flex-1 overflow-y-auto space-y-2 md:space-y-3 pr-1 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
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
                    ? "justify-center text-white text-xs md:text-sm opacity-50 font-sans"
                    : ""
                )}
              >
                {msg.type !== "system" && (
                  <div className="bg-[#ffc31e] w-6 h-6 md:w-8 md:h-8 rounded-full text-black flex items-center justify-center font-medium text-xs md:text-sm shadow-sm shrink-0">
                    {msg.username.charAt(0).toUpperCase()}
                  </div>
                )}
                <div
                  className={cn(
                    "flex-1 min-w-0",
                    msg.type !== "system" &&
                      "bg-gray-800/50 rounded-lg px-2 md:px-3 py-1.5 md:py-2 backdrop-blur-sm border border-[#ffc31e]/10"
                  )}
                >
                  {msg.type !== "system" && (
                    <div className="flex items-center gap-1.5 md:gap-2 mb-0.5 md:mb-1">
                      <span className="font-medium text-white text-xs md:text-sm truncate">
                        {msg.username}
                      </span>
                      <span className="text-[10px] md:text-xs text-[#ffc31e]/70 shrink-0">
                        {new Date(msg.timestamp).toLocaleTimeString([], {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                    </div>
                  )}
                  <div
                    className={cn(
                      "text-xs md:text-sm break-words",
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
        <div className="shrink-0 mt-2 flex md:mb-0 mb-14 gap-1.5 md:gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex w-full rounded-lg bg-gray-800/50 backdrop-blur-sm px-2 md:px-3 py-1.5 md:py-2.5 text-white text-xs md:text-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50 transition-all border border-[#ffc31e]/10"
            placeholder="Type your message..."
          />
          <button
            onClick={sendMessage}
            className="rounded-lg flex bg-[#ffc31e] px-2.5 md:px-4 py-1.5 md:py-2.5 text-xs md:text-sm font-medium text-black hover:opacity-90 transition-all shadow-sm shrink-0"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
