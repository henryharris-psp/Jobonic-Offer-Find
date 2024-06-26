import React, { useEffect, useState } from "react";

const frames: string[] = [];

const startIndex = 1226;
const endIndex = 1306;
const excludedNumbers = new Set([1249, 1256, 1257, 1263]);

for (let i = startIndex; i <= endIndex; i++) {
  if (!excludedNumbers.has(i)) {
    frames.push(`/jome3/IMG_${i}.PNG`);
  }
}

const SCROLL_MULTIPLIER = 1; // Adjust this value to control scroll speed
// higher = faster, lower = slower

const CanvasComponent: React.FC = () => {
  const [currentFrame, setCurrentFrame] = useState<number>(0);

  useEffect(() => {
    const scrollHandler = () => {
      const scrollTop = window.scrollY;
      const maxScrollTop =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollFraction = (scrollTop / maxScrollTop) * SCROLL_MULTIPLIER;
      const frameIndex = Math.min(
        frames.length - 1,
        Math.ceil(scrollFraction * frames.length)
      );
      setCurrentFrame(frameIndex);
    };

    window.addEventListener("scroll", scrollHandler);

    return () => {
      window.removeEventListener("scroll", scrollHandler);
    };
  }, []);

  return (
    <div className="canvas-container">
      <img
        src={frames[currentFrame]}
        alt={`Frame ${currentFrame + 1}`}
        className="canvas"
      />
    </div>
  );
};

export default CanvasComponent;
