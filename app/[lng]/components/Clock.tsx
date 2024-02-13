import { useState, useEffect } from 'react';

export default function Clock() {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <div className="text-2xl lg:text-3xl xl:text-4xl lg:mb-3">
      {time.toLocaleTimeString('en-US', { hour12: false })}
    </div>
  );
}
