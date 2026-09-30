"use client";

import { useEffect, useState } from "react";

export function LiveTime() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const lagosTime = now.toLocaleTimeString("en-US", {
        timeZone: "Africa/Lagos",
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
      });
      setTime(lagosTime);
    };
    update();
    const interval = setInterval(update, 1000 * 30); // update every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <span className="live-time">
      <span className="live-time-dot" />
      {time} WAT · Lagos, Nigeria
    </span>
  );
}
