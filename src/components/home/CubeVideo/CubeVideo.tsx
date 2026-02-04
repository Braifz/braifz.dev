"use client";

import { useTheme } from "next-themes";
import { useEffect, useRef } from "react";

const CubeVideo = () => {
  const { theme } = useTheme();
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current) {
      const wasPlaying = !videoRef.current.paused;

      videoRef.current.load();

      if (wasPlaying) {
        videoRef.current.play().catch(console.error);
      }
    }
  }, [theme]);

  return (
    <video
      ref={videoRef}
      width="400"
      height="240"
      autoPlay
      loop
      muted
      playsInline
      className="lg:hidden mt-10 h-[250px] w-full"
    >
      <source
        src={
          theme === "light"
            ? "/video/video-cube-light.mp4"
            : "/video/cube-dark.mp4"
        }
        type="video/mp4"
      />
    </video>
  );
};

export default CubeVideo;
