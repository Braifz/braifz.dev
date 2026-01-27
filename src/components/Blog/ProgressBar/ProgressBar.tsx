"use client";

import { useEffect, useState } from "react";
import { Progress } from "../../ui/progress";

const ProgressBar = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const contentElement: HTMLElement = document.querySelector(
        ".content",
      ) as HTMLElement;
      if (!contentElement) return;

      const contentTop = contentElement.offsetTop;
      const contentHeight = contentElement.offsetHeight;
      const windowHeight = window.innerHeight;
      const scrollTop = window.scrollY;

      const relativeScrollTop = scrollTop - contentTop;
      const scrollableContentHeight = contentHeight - windowHeight;

      let currentProgress = 0;
      if (scrollableContentHeight > 0) {
        currentProgress = (relativeScrollTop / scrollableContentHeight) * 100;
      }

      setProgress(Math.min(Math.max(currentProgress, 0), 100));
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full z-50 bg-background/80 backdrop-blur-sm">
      {progress === 0 ? <></> : <Progress value={progress} className="h-1" />}
    </div>
  );
};

export default ProgressBar;
