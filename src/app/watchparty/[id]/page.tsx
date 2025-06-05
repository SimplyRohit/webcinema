"use client";
import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Roboto_Mono } from "next/font/google";
import { cn } from "@/lib/utils";

const roboto = Roboto_Mono({ subsets: ["latin"] });

interface Message {
  type: string;
  username: string;
  message?: string;
  timestamp: string;
  time?: number;
}

export default function WatchParty() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");
  const id = searchParams.get("id");
  const season = searchParams.get("season");
  const episode = searchParams.get("episode");

  const [username, setUsername] = useState("");
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [participants, setParticipants] = useState<string[]>([]);
  const [isHost, setIsHost] = useState(false);

  const wsRef = useRef<WebSocket | null>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const watchPartyId = `${type}-${id}${
    type === "tv" ? `-${season}-${episode}` : ""
  }`;
  const videoUrl = `https://embed.su/embed/${type}/${id}${
    type === "tv" ? `/${season}/${episode}` : ""
  }`;

  useEffect(() => {
    // Scroll chat to bottom when new messages arrive
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const connectWebSocket = () => {
    const ws = new WebSocket(`ws://localhost:3001`);
    wsRef.current = ws;

    ws.onopen = () => {
      // Join the watch party
      ws.send(
        JSON.stringify({
          type: "join",
          watchPartyId,
          username,
        })
      );
      setIsJoined(true);
      setIsHost(participants.length === 0);
    };

    ws.onmessage = (event) => {
      const data: Message = JSON.parse(event.data);

      switch (data.type) {
        case "userJoined":
          setParticipants((prev) => [...prev, data.username]);
          setMessages((prev) => [
            ...prev,
            {
              type: "system",
              username: "System",
              message: `${data.username} joined the party`,
              timestamp: data.timestamp,
            },
          ]);
          break;

        case "userLeft":
          setParticipants((prev) => prev.filter((p) => p !== data.username));
          setMessages((prev) => [
            ...prev,
            {
              type: "system",
              username: "System",
              message: `${data.username} left the party`,
              timestamp: data.timestamp,
            },
          ]);
          break;

        case "chat":
          setMessages((prev) => [...prev, data]);
          break;

        case "play":
        case "pause":
        case "seek":
          if (iframeRef.current && !isHost) {
            const iframe = iframeRef.current;
            iframe.contentWindow?.postMessage(
              {
                type: data.type,
                time: data.time,
              },
              "*"
            );
          }
          break;
      }
    };

    ws.onclose = () => {
      setIsJoined(false);
      setParticipants([]);
      setMessages([]);
    };

    return () => {
      ws.close();
    };
  };

  const handleJoin = (e: React.FormEvent) => {
    e.preventDefault();
    if (username.trim()) {
      connectWebSocket();
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && wsRef.current) {
      wsRef.current.send(
        JSON.stringify({
          type: "chat",
          message: newMessage,
          watchPartyId,
        })
      );
      setNewMessage("");
    }
  };

  const handleVideoControl = (type: string, time?: number) => {
    if (wsRef.current && isHost) {
      wsRef.current.send(
        JSON.stringify({
          type,
          time,
          watchPartyId,
        })
      );
    }
  };

  if (!isJoined) {
    return (
      <div className="flex h-screen w-screen items-center justify-center bg-black">
        <form
          onSubmit={handleJoin}
          className="flex flex-col items-center space-y-4"
        >
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Enter your username"
            className="rounded bg-[#1B1B1B] p-2 text-white"
            required
          />
          <button
            type="submit"
            className="rounded bg-[#FFD700] px-4 py-2 text-black hover:bg-[#FFE44D]"
          >
            Join Watch Party
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen bg-black">
      {/* Video Player */}
      <div className="relative h-full w-[75%]">
        <iframe
          ref={iframeRef}
          src={videoUrl}
          title="Watch Party Video"
          className="h-full w-full"
          style={{ border: "none" }}
          allowFullScreen
          onLoad={() => {
            // Add event listeners for video controls
            window.addEventListener("message", (event) => {
              if (
                event.data.type === "play" ||
                event.data.type === "pause" ||
                event.data.type === "seek"
              ) {
                handleVideoControl(event.data.type, event.data.time);
              }
            });
          }}
        />
      </div>

      {/* Chat and Participants */}
      <div className="flex h-full w-[25%] flex-col bg-[#1B1B1B] p-4">
        <div className="mb-4">
          <h2
            className={cn(
              roboto.className,
              "mb-2 text-lg font-bold text-white"
            )}
          >
            Participants ({participants.length})
          </h2>
          <div className="space-y-1">
            {participants.map((participant) => (
              <div key={participant} className="text-sm text-gray-300">
                {participant} {participant === username && "(You)"}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-1 flex-col">
          <h2
            className={cn(
              roboto.className,
              "mb-2 text-lg font-bold text-white"
            )}
          >
            Chat
          </h2>
          <div
            ref={chatContainerRef}
            className="mb-4 flex-1 overflow-y-auto space-y-2"
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={cn(
                  "rounded p-2",
                  msg.type === "system"
                    ? "bg-gray-700 text-gray-300"
                    : "bg-[#2B2B2B] text-white"
                )}
              >
                {msg.type !== "system" && (
                  <span className="font-bold text-[#FFD700]">
                    {msg.username}:{" "}
                  </span>
                )}
                {msg.message}
                <div className="mt-1 text-xs text-gray-400">
                  {new Date(msg.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
          </div>

          <form onSubmit={handleSendMessage} className="flex space-x-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded bg-[#2B2B2B] p-2 text-white"
            />
            <button
              type="submit"
              className="rounded bg-[#FFD700] px-4 py-2 text-black hover:bg-[#FFE44D]"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}