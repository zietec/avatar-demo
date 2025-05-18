import React from "react";
import { DialogWrapper } from "./DialogWrapper";

export const ConversationSkeletonLoader: React.FC = () => {
  return (
    <DialogWrapper>
      <div className="absolute inset-0 size-full bg-gray-800/20 backdrop-blur-sm">
        {/* Skeleton for the timer */}
        <div className="absolute right-4 top-4 h-8 w-20 animate-pulse rounded-md bg-gray-300/20"></div>
        
        {/* Skeleton for the main video area */}
        <div className="absolute inset-0 m-auto flex h-[80%] w-[90%] animate-pulse items-center justify-center rounded-xl bg-gray-700/30">
          <div className="h-24 w-24 rounded-full bg-gray-600/40"></div>
        </div>
        
        {/* Skeleton for the local video */}
        <div className="absolute bottom-20 right-4 aspect-video h-40 w-24 animate-pulse overflow-hidden rounded-lg border-2 border-gray-500/40 bg-gray-700/30 sm:bottom-12 lg:h-auto lg:w-52"></div>
        
        {/* Skeleton for the controls */}
        <div className="absolute bottom-8 right-1/2 z-10 flex translate-x-1/2 justify-center gap-4">
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/40"></div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/40"></div>
          <div className="h-10 w-10 animate-pulse rounded-full bg-gray-600/40"></div>
        </div>
        
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-center">
          <div className="mb-4 h-5 w-36 animate-pulse rounded-md bg-gray-300/20"></div>
          <p className="text-lg font-medium text-gray-400">Connecting...</p>
        </div>
      </div>
    </DialogWrapper>
  );
}; 