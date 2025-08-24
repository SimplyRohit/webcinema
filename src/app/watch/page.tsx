"use client";
// import nookies from "nookies";
import React, { Suspense, } from "react";
// import { useSearchParams } from "next/navigation";
// import {
//   ChevronDown,
//   ChevronUp,
//   ExternalLink,
//   Monitor,
//   Play,
//   Settings,
//   Users,
//   X,
//   Zap,
// } from "lucide-react";

// interface Content {
//   id: string;
//   type: string;
// }

function EmbedContent() {
  // const searchParams = useSearchParams();
  // const type = searchParams.get("type");
  // const id = searchParams.get("id");
  // const season = searchParams.get("season");
  // const episode = searchParams.get("episode");
  // const [url, setUrl] = useState("");
  // const [defaultServer, setDefaultServer] = useState("videasy");
  // const [showModal, setShowModal] = useState(false); // NEW
  // const randomid = Math.random().toString(36).substring(2, 15);
  // const [customLink, setCustomLink] = useState("");
  // const [expanded, setExpanded] = useState<string | null>(null);

  // // Define all servers
  // const servers: Record<string, string> = {
  //   vidrock: `https://vidrock.net/${
  //     type === "tv" ? `tv/${id}/${season}/${episode}` : `movie/${id}`
  //   }`,
  //   videasy: `https://player.videasy.net/${
  //     type === "tv" ? `tv/${id}/${season}/${episode}` : `movie/${id}`
  //   }`,
  //   vidjoy: `https://vidjoy.pro/embed/${type}/${id}${
  //     type === "tv" ? `/${season}/${episode}` : ""
  //   }?adFree=true`,
  //   modernserver: `https://embed.su/embed/${type}/${id}${
  //     type === "tv" ? `/${season}/${episode}` : ""
  //   }`,
  //   vidsrc: `https://vidsrc.xyz/embed/${type}/${id}${
  //     type === "tv" ? `/${season}/${episode}` : ""
  //   }`,
  // };

  // useEffect(() => {
  //   const cookies = nookies.get();
  //   const savedServer = cookies.defaultServer || "videasy";
  //   setDefaultServer(savedServer);
  //   setUrl(servers[savedServer]);

  //   const ContinueWatching = cookies.ContinueWatching
  //     ? JSON.parse(cookies.ContinueWatching)
  //     : [];
  //   if (!ContinueWatching.some((content: Content) => content.id === id)) {
  //     ContinueWatching.push({ id, type });
  //     nookies.set(null, "ContinueWatching", JSON.stringify(ContinueWatching), {
  //       path: "/",
  //     });
  //   }
  // }, [id, type, servers]);

  // const handleServerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  //   const selectedServer = e.target.value;
  //   setUrl(servers[selectedServer]);
  //   setDefaultServer(selectedServer);
  //   nookies.set(null, "defaultServer", selectedServer, { path: "/" });
  // };

  // const toggleExpand = (key: string) => {
  //   setExpanded(expanded === key ? null : key);
  // };

  // const handlePlay = () => {
  //   if (!customLink) return;
  //   window.open(
  //     `/watchparty/${randomid}?wpurl=${customLink}&method=player`,
  //     "_blank"
  //   );
  // };

  return (
    // <div className="h-screen w-screen bg-black relative">
    //   {/* Top Controls */}
    //   <div className="absolute top-1 left-1/2 -translate-x-1/2 z-50 flex items-center justify-center gap-4">
    //     <select
    //       className="rounded-md bg-[#1B1B1B] p-3 pr-12 text-white text-sm md:text-base hover:bg-[#2B2B2B] transition-colors"
    //       value={defaultServer}
    //       onChange={handleServerChange}
    //     >
    //       <option value="vidrock">Vidrock</option>
    //       <option value="vidjoy">Vidjoy</option>
    //       <option value="modernserver">Modern Server</option>
    //       <option value="vidsrc">Multi</option>
    //       <option value="videasy">Videasy</option>
    //     </select>

    //     <button
    //       onClick={() => setShowModal(true)}
    //       className="rounded-md bg-[#1B1B1B] p-3 px-6 truncate
    //        text-white text-sm md:text-base hover:bg-[#2B2B2B] transition-colors"
    //     >
    //       Start Watch Party
    //     </button>
    //   </div>

    //   {/* Video Player */}
    //   <div className="flex md:h-screen h-[calc(100vh-4rem)] w-screen">
    //     <iframe
    //       src={url}
    //       title="Embedded Content"
    //       className="h-full w-full"
    //       style={{ border: "none" }}
    //       allowFullScreen
    //     />
    //   </div>

    //   {showModal && (
    //     <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
    //       <div className="bg-[#262624] rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-gray-700/30">
    //         {/* Header */}
    //         <div className="sticky top-0 z-10 bg-[#262624] border-b border-gray-700/50 px-6 py-5 rounded-t-3xl">
    //           <div className="flex items-center justify-between">
    //             <div className="flex items-center gap-3">
    //               <div className="p-2 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-xl">
    //                 <Users className="w-6 h-6 text-blue-400" />
    //               </div>
    //               <div>
    //                 <h2 className="text-2xl font-bold text-white">
    //                   Watch Party Setup
    //                 </h2>
    //                 <p className="text-gray-400 text-sm">
    //                   Choose your preferred synchronization mode
    //                 </p>
    //               </div>
    //             </div>
    //             <button
    //               onClick={() => setShowModal(false)}
    //               className="p-2 hover:bg-gray-700/50 rounded-xl transition-all duration-200 group"
    //             >
    //               <X className="w-5 h-5 text-gray-400 group-hover:text-white" />
    //             </button>
    //           </div>
    //         </div>

    //         <div className="p-6 space-y-6">
    //           {/* Option 1: Chat Sync Only */}
    //           <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 hover:border-blue-500/50 transition-all duration-300">
    //             <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    //             <div className="relative p-6">
    //               <div className="flex items-start justify-between mb-4">
    //                 <div className="flex items-center gap-3">
    //                   <div className="p-3 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-xl">
    //                     <Users className="w-6 h-6 text-blue-400" />
    //                   </div>
    //                   <div>
    //                     <h3 className="font-semibold text-xl text-white">
    //                       Chat Sync Only
    //                     </h3>
    //                     <div className="flex items-center gap-2 mt-2">
    //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/20 text-green-400 border border-green-500/30">
    //                         <Zap className="w-3 h-3 mr-1" />
    //                         Quick Start
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <p className="text-gray-300 mb-6 leading-relaxed">
    //                 Perfect for synchronized chatting while watching. Simple
    //                 setup with instant room access and real-time messaging.
    //               </p>

    //               <div className="flex flex-col sm:flex-row gap-3">
    //                 <button
    //                   onClick={() =>
    //                     window.open(
    //                       `/watchparty/${randomid}?wpurl=${url}&method=chat`,
    //                       "_blank"
    //                     )
    //                   }
    //                   className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 px-6 py-3 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg"
    //                 >
    //                   <ExternalLink className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
    //                   Start Room
    //                 </button>
    //               </div>
    //             </div>
    //           </div>

    //           {/* Option 2: Advanced Sync */}
    //           <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800/40 to-gray-900/40 border border-gray-700/40 hover:border-purple-500/50 transition-all duration-300">
    //             <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

    //             <div className="relative p-6">
    //               <div className="flex items-start justify-between mb-4">
    //                 <div className="flex items-center gap-3">
    //                   <div className="p-3 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-xl">
    //                     <Settings className="w-6 h-6 text-purple-400" />
    //                   </div>
    //                   <div>
    //                     <h3 className="font-semibold text-xl text-white">
    //                       Advanced Player Sync
    //                     </h3>
    //                     <div className="flex flex-wrap items-center gap-2 mt-2">
    //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-500/20 text-purple-400 border border-purple-500/30">
    //                         <Monitor className="w-3 h-3 mr-1" />
    //                         Full Control
    //                       </span>
    //                       <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-amber-500/20 text-amber-400 border border-amber-500/30">
    //                         Extension Required
    //                       </span>
    //                     </div>
    //                   </div>
    //                 </div>
    //               </div>

    //               <p className="text-gray-300 mb-4 leading-relaxed">
    //                 Synchronized video playback with chat. Requires browser
    //                 extensions for full functionality and cross-platform
    //                 compatibility.
    //               </p>

    //               {/* Requirements */}
    //               <div className="bg-gray-800/30 border border-gray-700/30 rounded-xl p-4 mb-4">
    //                 <h4 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
    //                   <Settings className="w-4 h-4" />
    //                   Requirements:
    //                 </h4>
    //                 <div className="space-y-2 text-sm text-gray-300">
    //                   <div className="flex items-center gap-3 p-2 bg-blue-500/10 rounded-lg border border-blue-500/20">
    //                     <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
    //                     <span>
    //                       <span className="text-blue-400 font-medium">
    //                         Sniffer
    //                       </span>{" "}
    //                       extension (Required for URL capture)
    //                     </span>
    //                   </div>
    //                   <div className="flex items-center gap-3 p-2 bg-purple-500/10 rounded-lg border border-purple-500/20">
    //                     <div className="w-2 h-2 bg-purple-400 rounded-full flex-shrink-0" />
    //                     <span>
    //                       <span className="text-purple-400 font-medium">
    //                         Cross-Origin
    //                       </span>{" "}
    //                       extension (Optional, enables all servers)
    //                     </span>
    //                   </div>
    //                 </div>
    //               </div>

    //               {/* How to Use Toggle */}
    //               <button
    //                 onClick={() => toggleExpand("syncplayer")}
    //                 className="flex items-center gap-2 text-blue-400 hover:text-blue-300 text-sm font-medium mb-4 transition-colors group"
    //               >
    //                 Setup Instructions
    //                 {expanded === "syncplayer" ? (
    //                   <ChevronUp className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
    //                 ) : (
    //                   <ChevronDown className="w-4 h-4 group-hover:translate-y-0.5 transition-transform" />
    //                 )}
    //               </button>

    //               {/* Expanded Instructions */}
    //               {expanded === "syncplayer" && (
    //                 <div className="mb-6 bg-gray-900/40 border border-gray-700/30 rounded-xl p-5">
    //                   <div className="space-y-6">
    //                     <div>
    //                       <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
    //                         <span className="flex items-center justify-center w-7 h-7 bg-gradient-to-br from-blue-500/20 to-blue-600/20 rounded-lg text-sm text-blue-400 font-bold border border-blue-500/30">
    //                           1
    //                         </span>
    //                         Sniffer Only Method (Videasy Server)
    //                       </h4>
    //                       <ul className="space-y-2 text-sm text-gray-300 ml-9">
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
    //                           Select Videasy server from the dropdown above
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
    //                           Start video playback and let it load completely
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
    //                           Open Sniffer extension to capture the direct video
    //                           URL
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
    //                           Paste the captured URL in the input field below
    //                         </li>
    //                       </ul>
    //                     </div>

    //                     <div className="border-t border-gray-700/30 pt-6">
    //                       <h4 className="font-semibold text-white mb-3 flex items-center gap-2">
    //                         <span className="flex items-center justify-center w-7 h-7 bg-gradient-to-br from-purple-500/20 to-purple-600/20 rounded-lg text-sm text-purple-400 font-bold border border-purple-500/30">
    //                           2
    //                         </span>
    //                         Universal Method (All Servers)
    //                       </h4>
    //                       <ul className="space-y-2 text-sm text-gray-300 ml-9">
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
    //                           Enable Cross-Origin extension on this page first
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
    //                           Select any video server from the dropdown
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
    //                           Use Sniffer extension to capture the video URL
    //                         </li>
    //                         <li className="flex items-start gap-3">
    //                           <div className="w-1.5 h-1.5 bg-purple-400 rounded-full mt-2 flex-shrink-0" />
    //                           Paste URL below and start the synchronized session
    //                         </li>
    //                       </ul>
    //                     </div>
    //                   </div>
    //                 </div>
    //               )}

    //               {/* URL Input */}
    //               <div className="space-y-4">
    //                 <div className="relative">
    //                   <input
    //                     type="text"
    //                     placeholder="Paste your captured Sniffer URL here..."
    //                     value={customLink}
    //                     onChange={(e) => setCustomLink(e.target.value)}
    //                     className="w-full bg-gray-800/40 border border-gray-600/40 focus:border-purple-500/60 focus:ring-2 focus:ring-purple-500/20 rounded-xl px-4 py-4 text-white placeholder-gray-500 transition-all duration-200 pr-12"
    //                   />
    //                   {customLink && (
    //                     <button
    //                       onClick={() => setCustomLink("")}
    //                       className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
    //                     >
    //                       <X className="w-4 h-4" />
    //                     </button>
    //                   )}
    //                 </div>

    //                 <button
    //                   onClick={handlePlay}
    //                   disabled={!customLink.trim()}
    //                   className="w-full bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 disabled:from-gray-700 disabled:to-gray-700 disabled:cursor-not-allowed px-6 py-4 rounded-xl text-white font-medium transition-all duration-200 flex items-center justify-center gap-2 group shadow-lg"
    //                 >
    //                   <Play className="w-5 h-5 group-hover:translate-x-0.5 transition-transform" />
    //                   Start Advanced Sync
    //                 </button>
    //               </div>
    //             </div>
    //           </div>
    //         </div>  );

    //         {/* Footer */}
    //         <div className="sticky bottom-0 bg-[#262624] border-t border-gray-700/50 p-6 rounded-b-3xl">
    //           <button
    //             onClick={() => setShowModal(false)}
    //             className="w-full bg-gray-700/40 hover:bg-gray-600/40 border border-gray-600/30 hover:border-gray-500/50 rounded-xl py-4 text-gray-300 hover:text-white font-medium transition-all duration-200"
    //           >
    //             Cancel
    //           </button>
    //         </div>
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="h-screen w-screen bg-black flex items-center justify-center text-white">
<h1>Unfortunately, this page is temporarily unavailable. Thanks.</h1>
    </div>
  );
}

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EmbedContent />
    </Suspense>
  );
}
