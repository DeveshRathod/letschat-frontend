import React, { useEffect, useState } from "react";
import MessageIcon from "@mui/icons-material/Message";

const icons = [MessageIcon];

const ChatBackground = () => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const spacing = 48;

  useEffect(() => {
    const updateSize = () => {
      setDimensions({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateSize();
    window.addEventListener("resize", updateSize);

    return () => window.removeEventListener("resize", updateSize);
  }, []);

  const totalCols = Math.ceil(dimensions.width / spacing);
  const totalRows = Math.ceil(dimensions.height / spacing);

  return (
    <div className="absolute inset-0 z-0 w-full h-full opacity-5 pointer-events-none bg-base-100 overflow-hidden">
      <div className="relative w-full h-full">
        {Array.from({ length: totalRows }).map((_, rowIndex) =>
          Array.from({ length: totalCols }).map((_, colIndex) => {
            if ((rowIndex + colIndex) % 4 === 0) {
              const Icon = icons[(rowIndex + colIndex) % icons.length];
              return (
                <div
                  key={`${rowIndex}-${colIndex}`}
                  className="absolute "
                  style={{
                    top: `${rowIndex * spacing}px`,
                    left: `${colIndex * spacing}px`,
                  }}
                >
                  <Icon fontSize="small" />
                </div>
              );
            }
            return null;
          })
        )}
      </div>
    </div>
  );
};

export default ChatBackground;
