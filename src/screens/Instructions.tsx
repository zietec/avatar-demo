import { createConversation } from "@/api";
import {
  DialogWrapper,
  AnimatedTextBlockWrapper,
} from "@/components/DialogWrapper";
import { screenAtom } from "@/store/screens";
import { conversationAtom } from "@/store/conversation";
import React, { useCallback, useMemo, useState } from "react";
import { useAtom, useAtomValue } from "jotai";
import { AlertTriangle, Mic, Video } from "lucide-react";
import { useDaily, useDailyEvent, useDevices } from "@daily-co/daily-react";
import { ConversationLoading } from "./ConversationLoading";
import { ConversationError } from "./ConversationError";
import buttonBell from "@/assets/sounds/button_bell.mp3";
import { Button } from "@/components/ui/button";
import { apiTokenAtom } from "@/store/tokens";

const useCreateConversationMutation = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [, setScreenState] = useAtom(screenAtom);
  const [, setConversation] = useAtom(conversationAtom);
  const token = useAtomValue(apiTokenAtom);

  const createConversationRequest = async () => {
    try {
      if (!token) {
        throw new Error("Token is required");
      }
      const conversation = await createConversation(token);
      setConversation(conversation);
      setScreenState({ currentScreen: "conversation" });
    } catch (error) {
      setError(error as string);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    createConversationRequest,
  };
};

export const Instructions: React.FC = () => {
  const daily = useDaily();
  const { currentMic, setMicrophone, setSpeaker } = useDevices();
  const { createConversationRequest } = useCreateConversationMutation();
  const [getUserMediaError, setGetUserMediaError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingConversation, setIsLoadingConversation] = useState(false);
  const [error, setError] = useState(false);
  // const audio = useMemo(() => {
  //   const audioObj = new Audio(buttonBell);
  //   audioObj.volume = 0.7;
  //   return audioObj;
  // }, []);
  useDailyEvent(
    "camera-error",
    useCallback(() => {
      setGetUserMediaError(true);
    }, []),
  );

  const handleClick = async () => {
    try {
      setIsLoading(true);
      // audio.currentTime = 0;
      // audio.play().catch(() => {
      //   console.warn("Audio playback failed:");
      // });
      let micDeviceId = currentMic?.device?.deviceId;
      if (!micDeviceId) {
        const res = await daily?.startCamera({
          startVideoOff: false,
          startAudioOff: false,
          audioSource: "default",
        });
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultMic = res?.mic?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        const isDefaultSpeaker = res?.speaker?.deviceId === "default";
        // @ts-expect-error deviceId exists in the MediaDeviceInfo
        micDeviceId = res?.mic?.deviceId;

        if (isDefaultMic) {
          if (!isDefaultMic) {
            setMicrophone("default");
          }
          if (!isDefaultSpeaker) {
            setSpeaker("default");
          }
        }
      }
      if (micDeviceId) {
        setIsLoadingConversation(true);
        await createConversationRequest();
      } else {
        setGetUserMediaError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    } finally {
      setIsLoading(false);
      setIsLoadingConversation(false);
    }
  };

  if (isLoadingConversation) {
    return <ConversationLoading />;
  }
  if (error) {
    return <ConversationError onClick={handleClick} />;
  }

  return (
    <DialogWrapper>
      <AnimatedTextBlockWrapper>
        <h1 className="mb-6 bg-text-primary bg-clip-text pt-1 text-center font-inter text-4.5xl text-transparent sm:text-5xl lg:text-6xl">
          Intelligent Virtual Assistant
        </h1>
        <p className="max-w-[650px] text-center text-base sm:text-lg">
          Engage with our AI-powered virtual assistant to streamline your workflow. 
          Ask questions, request information, schedule meetings, and receive 
          personalized support for your business needs.
        </p>
        <Button
          onClick={handleClick}
          className="relative my-8 sm:my-10"
          disabled={isLoading}
        >
          Start Conversation
          {getUserMediaError && (
            <div className="absolute -top-1 left-0 right-0 flex items-center gap-1 text-wrap rounded-lg border bg-red-100 p-2 text-red-700 backdrop-blur-sm">
              <AlertTriangle className="size-4" />
              <p>
                To connect with the assistant, please allow microphone access in your browser settings.
              </p>
            </div>
          )}
        </Button>
        <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:gap-6">
          <div className="flex items-center gap-2">
            <Mic className="size-6 text-primary" />
            Microphone access required
          </div>
          <div className="flex items-center gap-2">
            <Video className="size-6 text-primary" />
            Camera access required
          </div>
        </div>
        <span className="absolute bottom-6 px-4 text-sm opacity-60 sm:bottom-8 sm:px-8">
          By starting a conversation, you accept the Terms of Service and acknowledge
          the Privacy Policy.
        </span>
      </AnimatedTextBlockWrapper>
    </DialogWrapper>
  );
};
