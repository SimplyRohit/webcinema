"use client";
import React from "react";
// import { useParams, useSearchParams } from "next/navigation";
// import { Roboto_Mono } from "next/font/google";
// import { cn } from "@/lib/utils";
// import nookies from "nookies";
// import { io, Socket } from "socket.io-client";
// import { Users2, Check, UserPlus, Monitor, MessageSquare } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";
// import videojs from "video.js";
// import "video.js/dist/video-js.css";
// import "videojs-hls-quality-selector";

// const roboto = Roboto_Mono({ subsets: ["latin"] });

// interface Message {
//   type: string;
//   username: string;
//   message?: string;
//   timestamp: string;
//   time?: number;
// }

export default function WatchParty() {
  // const params = useParams();
  // const roomId = params.id as string;
  // const searchParams = useSearchParams();
  // const wpurl = searchParams.get("wpurl");
  // const method = searchParams.get("method") || "chat";

  // const [username, setUsername] = useState("");
  // const [tempName, setTempName] = useState("");
  // const [messages, setMessages] = useState<Message[]>([]);
  // const [newMessage, setNewMessage] = useState("");
  // const [participants, setParticipants] = useState<string[]>([]);
  // const [showParticipants, setShowParticipants] = useState(true);
  // const [isPlaying, setIsPlaying] = useState(false);
  // const [isPlayerReady, setIsPlayerReady] = useState(false);

  // const socketRef = useRef<Socket | null>(null);
  // const chatContainerRef = useRef<HTMLDivElement>(null);
  // const videoRef = useRef<HTMLDivElement>(null);
  // const playerRef = useRef<any>(null);

  // // Track last emitted to prevent loop
  // const lastEmitted = useRef<{ playing: boolean; currentTime: number } | null>(
  //   null
  // );

  // // ---------------- Video.js Initialization ----------------
  // useEffect(() => {
  //   if (method !== "player" || !videoRef.current || !wpurl) return;

  //   const videoElement = document.createElement("video-js");
  //   videoElement.style.width = "100%";
  //   videoElement.style.height = "100%";
  //   videoElement.classList.add("vjs-big-play-centered");
  //   videoRef.current.appendChild(videoElement);

  //   const player = (playerRef.current = videojs(videoElement, {
  //     autoplay: false,
  //     controls: true,
  //     responsive: true,
  //     fluid: true,
  //     preload: "auto",
  //     playbackRates: [0.5, 1, 1.5, 2],
  //     sources: [{ src: wpurl, type: "application/x-mpegURL" }],
  //   }));

  //   // HLS quality selector
  //   // @ts-ignore
  //   if (player.hlsQualitySelector)
  //     // @ts-ignore
  //     player.hlsQualitySelector({ displayCurrentQuality: true });

  //   // Wait for metadata before allowing play/pause/seek
  //   player.on("loadedmetadata", () => setIsPlayerReady(true));

  //   // Emit play/pause/seek
  //   const emitVideoControl = (playing: boolean) => {
  //     if (!isPlayerReady) return;
  //     const data = { playing, currentTime: player.currentTime() };
  //     // @ts-ignore
  //     lastEmitted.current = data; // save to prevent loop
  //     socketRef.current?.emit("video-control", data);
  //     setIsPlaying(playing);
  //   };

  //   player.on("play", () => emitVideoControl(true));
  //   player.on("pause", () => emitVideoControl(false));
  //   player.on("seeked", () => {
  //     if (!isPlayerReady) return;
  //     const data = {
  //       playing: !player.paused(),
  //       currentTime: player.currentTime(),
  //     };
  //     // @ts-ignore
  //     lastEmitted.current = data;
  //     socketRef.current?.emit("video-control", data);
  //   });

  //   player.on("dispose", () => (playerRef.current = null));

  //   return () => {
  //     if (playerRef.current && !playerRef.current.isDisposed())
  //       playerRef.current.dispose();
  //   };
  // }, [wpurl, method, isPlayerReady]);

  // // ---------------- Auto-scroll chat ----------------
  // useEffect(() => {
  //   if (chatContainerRef.current)
  //     chatContainerRef.current.scrollTop =
  //       chatContainerRef.current.scrollHeight;
  // }, [messages]);

  // // ---------------- Username handling ----------------
  // useEffect(() => {
  //   const cookies = nookies.get();
  //   const storedUsername =
  //     cookies.username || `Guest${Math.floor(Math.random() * 10000)}`;
  //   setUsername(storedUsername);
  //   setTempName(storedUsername);
  //   nookies.set(null, "username", storedUsername, {
  //     maxAge: 60 * 60 * 24 * 7,
  //     path: "/",
  //   });
  // }, []);

  // const updateUsername = () => {
  //   setUsername(tempName);
  //   nookies.set(null, "username", tempName, {
  //     maxAge: 60 * 60 * 24 * 7,
  //     path: "/",
  //   });
  // };

  // // ---------------- Socket Setup ----------------
  // // @ts-ignore
  // useEffect(() => {
  //   if (!username) return;

  //   const socket = io(process.env.NEXT_PUBLIC_SOCKET_URL as string, {
  //     query: { id: roomId, username },
  //   });
  //   socketRef.current = socket;

  //   socket.on("message", (msg: Message) =>
  //     setMessages((prev) => [...prev, msg])
  //   );
  //   socket.on("participants", (data: any) => setParticipants(data.list));

  //   // ---------------- Sync on Join ----------------
  //   socket.on(
  //     "sync-on-join",
  //     (data: { playing: boolean; currentTime: number }) => {
  //       const waitForReady = setInterval(() => {
  //         if (playerRef.current && isPlayerReady) {
  //           clearInterval(waitForReady);
  //           const player = playerRef.current;
  //           player.currentTime(data.currentTime);
  //           if (data.playing) player.play().catch(() => {});
  //           else player.pause();
  //           setIsPlaying(data.playing);
  //         }
  //       }, 50);
  //     }
  //   );

  //   // ---------------- Video-Control Updates ----------------
  //   socket.on(
  //     "video-control",
  //     (data: { playing: boolean; currentTime: number }) => {
  //       if (!playerRef.current || !isPlayerReady) return;

  //       // Prevent applying own event
  //       if (
  //         lastEmitted.current &&
  //         Math.abs(lastEmitted.current.currentTime - data.currentTime) < 0.5 &&
  //         lastEmitted.current.playing === data.playing
  //       )
  //         return;

  //       const player = playerRef.current;
  //       if (Math.abs(player.currentTime() - data.currentTime) > 0.5)
  //         player.currentTime(data.currentTime);

  //       if (data.playing && player.paused()) player.play().catch(() => {});
  //       else if (!data.playing && !player.paused()) player.pause();

  //       setIsPlaying(data.playing);
  //     }
  //   );

  //   return () => socket.disconnect();
  // }, [username, roomId, method, isPlayerReady]);

  // // ---------------- Send chat ----------------
  // const sendMessage = () => {
  //   if (!newMessage.trim()) return;
  //   socketRef.current?.emit("message", {
  //     type: "chat",
  //     username,
  //     message: newMessage,
  //   });
  //   setNewMessage("");
  // };

  // ---------------- Render ----------------
  return (
      <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
<h1>Unfortunately, this page is temporarily unavailable. Thanks.</h1>
    </div>
    // <div className="flex h-screen w-screen flex-col bg-black md:flex-row md:overflow-hidden">
    //   {/* Video Section */}
    //   <div className="relative h-[40vh] w-full md:h-full md:w-[calc(100%-350px)]">
    //     <div className="absolute top-4 left-4 z-10 flex items-center gap-2 bg-black/80 backdrop-blur-md rounded-lg px-3 py-2 border border-gray-600/30">
    //       {method === "chat" ? (
    //         <>
    //           <MessageSquare className="w-4 h-4 text-blue-400" />
    //           <span className="text-sm font-medium text-white">Chat Sync</span>
    //         </>
    //       ) : (
    //         <>
    //           <Monitor className="w-4 h-4 text-purple-400" />
    //           <span className="text-sm font-medium text-white">
    //             Player Sync
    //           </span>
    //         </>
    //       )}
    //     </div>
    //     {method === "chat" ? (
    //       <iframe
    //         src={wpurl as string}
    //         title="Embedded Content"
    //         className="h-full w-full"
    //         style={{ border: "none" }}
    //         allow="autoplay; encrypted-media"
    //         allowFullScreen
    //       />
    //     ) : (
    //       <div className="h-full w-full">
    //         <div ref={videoRef} className="h-full w-full" />
    //       </div>
    //     )}
    //   </div>

    //   {/* Sidebar and Chat */}
    //   <div className="flex h-[60vh] w-full flex-col overflow-hidden bg-[#1B1B1B] p-2 md:h-full md:w-[350px] md:p-4">
    //     {/* Username input and toggle */}
    //     <div className="mb-2 flex w-full items-center justify-between text-white md:mb-4">
    //       <div className="flex flex-1 items-center gap-1.5 md:gap-2">
    //         <div className="relative max-w-[150px] flex-1 md:max-w-[200px]">
    //           <input
    //             value={tempName}
    //             onChange={(e) => setTempName(e.target.value)}
    //             placeholder="Enter your name"
    //             className="w-full rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-2 py-1 text-xs text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50 md:px-3 md:py-2 md:text-sm"
    //           />
    //           {tempName !== username && (
    //             <button
    //               onClick={updateUsername}
    //               className="absolute right-1 top-1/2 -translate-y-1/2 rounded-md bg-[#ffc31e] p-1"
    //             >
    //               <Check className="h-3 w-3 text-black md:h-4 md:w-4" />
    //             </button>
    //           )}
    //         </div>
    //       </div>
    //       <button
    //         onClick={() => setShowParticipants(!showParticipants)}
    //         className={cn(
    //           "ml-2 flex items-center gap-1.5 rounded-lg p-1.5 md:ml-4 md:gap-2 md:p-2",
    //           showParticipants
    //             ? "bg-[#ffc31e]/20 text-[#ffc31e]"
    //             : "text-gray-400 hover:bg-gray-800/50 hover:text-[#ffc31e]"
    //         )}
    //       >
    //         <Users2 className="h-4 w-4 md:h-5 md:w-5" />
    //         <span className="text-xs font-medium md:text-sm">
    //           {participants.length}
    //         </span>
    //       </button>
    //     </div>

    //     {/* Sync Status for Player Method */}
    //     {method === "player" && (
    //       <div className="mb-2 shrink-0 rounded-lg border border-purple-500/20 bg-purple-500/10 p-2 md:mb-4 md:p-3">
    //         <div className="flex items-center gap-2 text-purple-400">
    //           <Monitor className="h-4 w-4" />
    //           <span className="text-sm font-medium">
    //             Player Sync: {isPlaying ? "Playing" : "Paused"}
    //           </span>
    //         </div>
    //       </div>
    //     )}

    //     {/* Participants */}
    //     {showParticipants && (
    //       <div className="mb-2 shrink-0 rounded-lg border border-[#ffc31e]/10 bg-gray-800/30 p-2 md:mb-4 md:p-3">
    //         <div className="mb-2 flex items-center gap-1.5 md:mb-3 md:gap-2">
    //           <UserPlus className="h-3.5 w-3.5 text-[#ffc31e] md:h-4 md:w-4" />
    //           <h2
    //             className={cn(
    //               roboto.className,
    //               "text-xs font-medium text-white md:text-sm"
    //             )}
    //           >
    //             Participants
    //           </h2>
    //           <span className="rounded-full bg-[#ffc31e]/10 px-1.5 py-0.5 text-[10px] text-[#ffc31e]/70 md:px-2 md:text-xs">
    //             {participants.length}
    //           </span>
    //         </div>
    //         <div className="scrollbar-hide max-h-[150px] overflow-y-auto pr-1 space-y-2">
    //           {participants.map((p) => (
    //             <div
    //               key={p}
    //               className={cn(
    //                 "flex items-center gap-1.5 rounded-md px-2 py-1 text-xs md:gap-2 md:px-2 md:py-1.5 md:text-sm",
    //                 p === username
    //                   ? "bg-[#ffc31e]/20 text-[#ffc31e]"
    //                   : "text-gray-300 hover:bg-[#ffc31e]/10"
    //               )}
    //             >
    //               <div className="flex h-5 w-5 items-center justify-center rounded-full bg-[#ffc31e] text-[10px] font-medium text-black md:h-6 md:w-6 md:text-xs">
    //                 {p.charAt(0).toUpperCase()}
    //               </div>
    //               <span className="truncate font-medium">{p}</span>
    //               {p === username && (
    //                 <span className="ml-auto text-[10px] text-[#ffc31e] md:text-xs">
    //                   (You)
    //                 </span>
    //               )}
    //             </div>
    //           ))}
    //         </div>
    //       </div>
    //     )}

    //     {/* Chat */}
    //     <div
    //       ref={chatContainerRef}
    //       className="flex-1  space-y-2 overflow-y-auto pr-1 scrollbar-hide md:space-y-3"
    //     >
    //       <AnimatePresence initial={false}>
    //         {messages.map((msg, i) => (
    //           <motion.div
    //             key={i}
    //             initial={{ opacity: 0, y: 10 }}
    //             animate={{ opacity: 1, y: 0 }}
    //             transition={{ duration: 0.3, ease: "easeOut" }}
    //           >
    //             {msg.type !== "system" && (
    //               <div className="flex items-start gap-1.5 md:gap-2">
    //                 <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#ffc31e] text-xs font-medium text-black md:h-8 md:w-8 md:text-sm">
    //                   {msg.username.charAt(0).toUpperCase()}
    //                 </div>
    //                 <div className="min-w-0 flex-1 rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-2 py-1.5 md:px-3 md:py-2">
    //                   <div className="mb-0.5 flex items-center gap-1.5 md:gap-2">
    //                     <span className="truncate text-xs font-medium text-white md:text-sm">
    //                       {msg.username}
    //                     </span>
    //                     <span className="shrink-0 text-[10px] text-[#ffc31e]/70 md:text-xs">
    //                       {new Date(msg.timestamp).toLocaleTimeString([], {
    //                         hour: "2-digit",
    //                         minute: "2-digit",
    //                       })}
    //                     </span>
    //                   </div>
    //                   <div className="break-words text-xs md:text-sm text-gray-200">
    //                     {msg.message}
    //                   </div>
    //                 </div>
    //               </div>
    //             )}
    //           </motion.div>
    //         ))}
    //       </AnimatePresence>
    //     </div>

    //     {/* Chat input */}
    //     <div className="mt-2 md:mb-0 mb-[60px] flex gap-2 md:gap-2">
    //       <input
    //         type="text"
    //         value={newMessage}
    //         onChange={(e) => setNewMessage(e.target.value)}
    //         onKeyDown={(e) => e.key === "Enter" && sendMessage()}
    //         placeholder="Type your message..."
    //         className="flex w-full rounded-lg border border-[#ffc31e]/10 bg-gray-800/50 px-3 py-2 text-xs text-white md:text-sm focus:outline-none focus:ring-2 focus:ring-[#ffc31e]/50"
    //       />
    //       <button
    //         onClick={sendMessage}
    //         className="rounded-lg bg-[#ffc31e] px-4 py-2 text-xs font-medium text-black md:text-sm hover:opacity-90"
    //       >
    //         Send
    //       </button>
    //     </div>
    //   </div>
    // </div>
  );
}
