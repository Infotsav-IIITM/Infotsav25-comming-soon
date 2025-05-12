"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Howl } from "howler";

type SoundEffects = {
  hover: Howl | null;
  click: Howl | null;
  success: Howl | null;
};

type AudioContextType = {
  isMuted: boolean;
  toggleMute: () => void;
  playSound: (sound: keyof SoundEffects) => void;
};

const AudioContext = createContext<AudioContextType>({
  isMuted: true,
  toggleMute: () => {},
  playSound: () => {},
});

export const useAudio = () => useContext(AudioContext);

export const AudioProvider = ({ children }: { children: ReactNode }) => {
  const [isMuted, setIsMuted] = useState(true);
  const [sounds, setSounds] = useState<SoundEffects>({
    hover: null,
    click: null,
    success: null,
  });

  useEffect(() => {
    // Initialize sounds
    const hoverSound = new Howl({
      src: ["/sounds/hover.mp3"],
      volume: 0.2,
    });

    const clickSound = new Howl({
      src: ["/sounds/click.mp3"],
      volume: 0.3,
    });

    const successSound = new Howl({
      src: ["/sounds/success.mp3"],
      volume: 0.4,
    });

    setSounds({
      hover: hoverSound,
      click: clickSound,
      success: successSound,
    });

    // Initialize sound preference from localStorage if available
    const savedMuteState = localStorage.getItem("infotsav-sound-muted");
    if (savedMuteState !== null) {
      setIsMuted(savedMuteState === "true");
    }
  }, []);

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    localStorage.setItem("infotsav-sound-muted", newMutedState.toString());
  };

  const playSound = (sound: keyof SoundEffects) => {
    if (!isMuted && sounds[sound]) {
      sounds[sound]?.play();
    }
  };

  return (
    <AudioContext.Provider
      value={{
        isMuted,
        toggleMute,
        playSound,
      }}
    >
      {children}
    </AudioContext.Provider>
  );
};